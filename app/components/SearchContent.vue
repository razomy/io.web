<template>
  <div class="min-vh-100">

    <!-- Hero Section with Search -->
    <v-container>
      <div class="content-1 mt-4 pt-8 pb-8 px-4 text-center">
        <h1 class="text-h2 font-weight-black mb-4">
          {{ t('io.web.file_to_file.title') }}
        </h1>
        <p class="text-70 text-h6 mb-8 font-weight-regular">
          {{ t('io.web.file_to_file.subtitle') }}
        </p>

        <!-- Поисковая строка -->
        <v-text-field
            v-model="search"
            :placeholder="t('io.web.file_to_file.search_placeholder')"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            rounded="xl"
            height="64"
            hide-details
            class="search-input rounded-xl"
            clearable
        />
      </div>
    </v-container>

    <!-- Список карточек -->
    <v-container class="mt-8 position-relative z-index-1">

      <!-- Если ничего не найдено -->
      <div v-if="currentDirectories.length === 0" class="text-center py-10">
        <v-icon icon="mdi-file-remove-outline" size="64" color="grey"/>
        <h3 class="text-h5 text-darken mt-4">{{ t('io.web.file_to_file.no_results') }}</h3>
      </div>

      <!-- Сетка форматов -->
      <v-row>
        <v-col
            v-for="directory in currentDirectories"
            :key="'SearchContent.'+directory.id"
            cols="12"
            xs="12"
            sm="12"
            md="4"
        >
          <v-card class="content-1"
                  :href="localePath(directory.meta.url)"
                  hover
                  border="1">
            <v-card-item>
              <template v-slot:prepend>
                <v-avatar size="48" variant="flat">
                  <v-icon :icon="directory.meta.iconName"/>
                </v-avatar>
              </template>
              <v-card-subtitle>
                {{ t('io.web.file_to_file.convert_from') }}:
              </v-card-subtitle>
              <v-card-title class="font-weight-bold text-uppercase">
                <template
                    v-for="idx in Array.from({ length: directory.directoryPath.length }, (_, i) => i)"
                    :key="idx"
                >
                  <v-chip
                      v-if="directory.directoryPath[idx] !== defaultSearch"
                      :key="idx"
                      :to="localePath('/'+directory.directoryPath.slice(0, idx+1).join('/'))"
                      color="primary"
                      variant="text"
                      size="small"
                      label
                      class="font-weight-bold mr-2 text-uppercase cursor-pointer"
                  >
                    {{ directory.directoryPath[idx] }}
                  </v-chip>
                </template>
              </v-card-title>

            </v-card-item>

            <v-divider class="my-0 mx-2"/>

            <v-card-text>
              <p class="text-caption text-medium-emphasis mb-2 font-weight-bold text-uppercase">
                {{ t('io.web.file_to_file.convert_to') }}:
              </p>

              <div class="d-flex flex-wrap gap-2">
                <v-chip
                    v-for="command in directory.commands"
                    :key="command.id"
                    :to="localePath(command.meta.url)"
                    color="primary"
                    variant="text"
                    size="small"
                    label
                    class="font-weight-bold text-uppercase cursor-pointer px-3"
                >
                  {{ t(command.meta.nameTk) }}
                  <!--                  <v-icon end icon="mdi-arrow-right" size="14"/>-->
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

const {
  defaultSearch,
} = defineProps<{
  defaultSearch: string,
}>();

const localePath = useLocalePath();
const {t} = useI18n();
const search = ref(defaultSearch);


// Преобразуем объект в массив и фильтруем
const currentDirectories = computed(() => {
  return getDirectoryByFilter(search.value).filter(d => d.commands.length);
});

useSeoMeta({
  title: t('io.web.file_to_file.seo_title'),
  description: t('io.web.file_to_file.seo_desc')
});
</script>

<style scoped>
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
