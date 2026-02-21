<template>
  <div class="bg-surface-light min-vh-100">

    <!-- Hero Section with Search -->
    <div class="hero-bg bg-surface pt-8 pb-8 px-4 text-center">
      <v-container max-width="900">
        <h1 class="text-h2 font-weight-black mb-4">
          {{ t('nuxt.file_to_file.title') }}
        </h1>
        <p class="text-70 text-h6 mb-8 font-weight-regular">
          {{ t('nuxt.file_to_file.subtitle') }}
        </p>

        <!-- Поисковая строка -->
        <v-text-field
            v-model="search"
            :placeholder="t('nuxt.file_to_file.search_placeholder')"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            rounded="xl"
            bg-color="surface"
            height="64"
            hide-details
            class="search-input rounded-xl"
            clearable
        />
      </v-container>
    </div>

    <!-- Список карточек -->
    <v-container class="mt-8 position-relative z-index-1" max-width="1200">

      <!-- Если ничего не найдено -->
      <div v-if="filteredList.length === 0" class="text-center py-10">
        <v-icon icon="mdi-file-remove-outline" size="64" color="grey"/>
        <h3 class="text-h5 text-darken mt-4">{{ t('nuxt.file_to_file.no_results') }}</h3>
      </div>

      <!-- Сетка форматов -->
      <v-row>
        <v-col
            v-for="item in filteredList"
            :key="item.key"
            cols="12"
            sm="6"
            md="4"
        >
          <v-card class="rounded-xl"
                  :href="localePath(`/${item.directoryPath.join('/')}`)"
                  hover
                  border>
            <v-card-item>
              <template v-slot:prepend>
                <v-avatar color="primary-lighten-5" size="48" variant="flat">
                  <v-icon :icon="item.iconName"/>
                </v-avatar>
              </template>
              <v-card-subtitle>
                {{ t('nuxt.file_to_file.convert_from') }}:
              </v-card-subtitle>
              <v-card-title class="font-weight-bold text-uppercase">
                <v-chip
                    v-for="idx in Array.from({ length: item.directoryPath.length }, (_, i) => i)"
                    :key="idx"
                    :to="localePath('/'+item.directoryPath.slice(0, idx+1).join('/'))"
                    color="d"
                    variant="text"
                    size="large"
                    label
                    class="font-weight-bold text-uppercase cursor-pointer"
                >
                  {{ item.directoryPath[idx] }}
                </v-chip>
              </v-card-title>

            </v-card-item>

            <v-divider class="my-0"/>

            <v-card-text>
              <p class="text-caption text-medium-emphasis mb-2 font-weight-bold text-uppercase">
                {{ t('nuxt.file_to_file.convert_to') }}:
              </p>

              <div class="d-flex flex-wrap gap-2">
                <v-chip
                    v-for="target in item.commands"
                    :key="target.commandKey"
                    :to="localePath(`/${item.directoryPath.join('/')}/${target.commandKey}`)"
                    color="primary"
                    variant="text"
                    size="small"
                    label
                    class="font-weight-bold text-uppercase cursor-pointer px-3"
                >
                  {{ target.commandKey }}
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
import {getDirectoryByFilter} from '~~/razomy/db';

const localePath = useLocalePath();
const {t} = useI18n();
const search = ref('');

// Преобразуем объект в массив и фильтруем
const filteredList = computed(() => {
  return getDirectoryByFilter(search.value).filter(d => d.commands.length);
});

useSeoMeta({
  title: t('nuxt.file_to_file.seo_title'),
  description: t('nuxt.file_to_file.seo_desc')
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
