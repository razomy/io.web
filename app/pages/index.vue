<template>
  <div class="bg-surface-light min-vh-100 pb-16">

    <!-- Hero Section with Search -->
    <div class="hero-bg bg-primary pt-16 pb-32 px-4 text-center">
      <v-container max-width="900">
        <h1 class="text-h2 font-weight-black text-white mb-4">
          {{ $t('group.title') }}
        </h1>
        <p class="text-white-70 text-h6 mb-8 font-weight-regular">
          {{ $t('group.subtitle') }}
        </p>

        <!-- Поисковая строка -->
        <v-text-field
            v-model="search"
            :placeholder="$t('group.search_placeholder')"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            rounded="xl"
            bg-color="surface"
            height="64"
            hide-details
            class="search-input global-soft-card rounded-xl"
            clearable
        />
      </v-container>
    </div>

    <!-- Список карточек -->
    <v-container class="mt-n16 position-relative z-index-1" max-width="1200">

      <!-- Если ничего не найдено -->
      <div v-if="filteredList.length === 0" class="text-center py-10">
        <v-icon icon="mdi-file-remove-outline" size="64" color="grey"/>
        <h3 class="text-h5 text-grey mt-4">{{ $t('group.no_results') }}</h3>
      </div>

      <!-- Сетка форматов -->
      <v-row>
        <v-col
            v-for="item in filteredList"
            :key="item.source"
            cols="12"
            sm="6"
            md="4"
        >
          <v-card class="rounded-xl h-100 transition-swing global-soft-card"
                  :href="localePath(`/${item.group}/${item.source}`)"
                  hover
                  border>
            <v-card-item>
              <template v-slot:prepend>
                <v-avatar color="primary-lighten-5" size="48" variant="flat">
                  <v-icon :icon="getFileIcon(item.source)" color="primary"/>
                </v-avatar>
              </template>
              <v-card-title class="font-weight-bold text-uppercase">
                {{ item.source }}
              </v-card-title>
              <v-card-subtitle>
                {{ $t('group.convert_from') }}
              </v-card-subtitle>
            </v-card-item>

            <v-divider class="my-2"/>

            <v-card-text>
              <p class="text-caption text-medium-emphasis mb-2 font-weight-bold text-uppercase">
                {{ $t('group.convert_to') }}:
              </p>

              <div class="d-flex flex-wrap gap-2">
                <v-chip
                    v-for="target in item.targets"
                    :key="target"
                    :to="localePath(`/${item.group}/${item.source}/${target}`)"
                    color="primary"
                    variant="tonal"
                    size="small"
                    label
                    class="font-weight-bold text-uppercase cursor-pointer px-3"
                >
                  {{ target }}
                  <v-icon end icon="mdi-arrow-right" size="14"/>
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script setup lang="ts">
import {EXT_TO_EXTS_MAP, EXT_TO_GROUP_MAP, getFileIcon} from '~~/content/context';

const localePath = useLocalePath();
const {t} = useI18n();

const search = ref('');

// Преобразуем объект в массив и фильтруем
const filteredList = computed(() => {
  const query = search.value.toLowerCase().trim();
  const list = Object.entries(EXT_TO_EXTS_MAP).map(([source, targets]) => ({
    group: EXT_TO_GROUP_MAP[source],
    source,
    targets: targets as readonly string[] // readonly из-за const assertion
  }));

  if (!query) return list;

  return list.filter(item => {
    // Ищем совпадение в имени источника (jpg) или в любом из целевых форматов (png)
    const sourceMatch = item.source.includes(query);
    const targetMatch = item.targets.some(t => t.includes(query));
    return sourceMatch || targetMatch;
  });
});

useSeoMeta({
  title: t('group.seo_title'),
  description: t('group.seo_desc')
});
</script>

<style scoped>
.hero-bg {
  background: rgb(var(--v-theme-primary));
  padding-bottom: 100px;
}

.search-input :deep(.v-field__input) {
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 1.1rem;
}

.z-index-1 {
  z-index: 1;
}

.text-white-70 {
  color: rgba(255, 255, 255, 0.7);
}

.gap-2 {
  gap: 8px;
}

/* Анимация при наведении на карточку */
.transition-swing {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease;
}

.transition-swing:hover {
  transform: translateY(-4px);
}
</style>
