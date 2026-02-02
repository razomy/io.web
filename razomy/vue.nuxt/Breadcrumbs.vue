<template>
  <div class="d-flex align-center flex-wrap justify-center gap-1 py-4">

    <!-- 1. HOME -->
    <v-btn
        :to="localePath('/')"
        variant="text"
        color="white"
        class="text-capitalize px-2"
        density="comfortable"
    >
      <v-icon icon="mdi-home" start size="small" />
      {{ $t('breadcrumb.title') }}
    </v-btn>

    <v-icon icon="mdi-chevron-right" color="white-50" size="small" />

    <!-- 2. CATEGORY DROPDOWN -->
    <v-menu location="bottom center" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn
            v-bind="props"
            variant="text"
            color="white"
            class="text-capitalize px-2 font-weight-bold"
            append-icon="mdi-chevron-down"
        >
          {{ currentCategoryLabel }}
        </v-btn>
      </template>
      <v-list density="compact" nav class="rounded-lg elevation-4">
        <v-list-subheader class="text-uppercase font-weight-bold text-caption">
          {{ $t('breadcrumb.select_category') }}
        </v-list-subheader>
        <v-list-item
            v-for="catKey in categories"
            :key="catKey"
            :title="$t(CATEGORY_CONFIG[catKey]?.labelKey || catKey)"
            :prepend-icon="CATEGORY_CONFIG[catKey]?.icon"
            @click="navigateToCategory(catKey)"
            :active="catKey === currentCategory"
            color="primary"
        />
      </v-list>
    </v-menu>

    <!-- 3. SOURCE DROPDOWN (If category selected) -->
    <template v-if="currentCategory">
      <v-icon icon="mdi-chevron-right" color="white-50" size="small" />

      <v-menu location="bottom center" transition="slide-y-transition" max-height="300">
        <template v-slot:activator="{ props }">
          <v-btn
              v-bind="props"
              variant="text"
              color="white"
              class="text-uppercase px-2 font-weight-bold"
              append-icon="mdi-chevron-down"
          >
            .{{ currentSource || '???' }}
          </v-btn>
        </template>
        <v-list density="compact" nav class="rounded-lg elevation-4">
          <v-list-subheader class="text-uppercase font-weight-bold text-caption">
            {{ $t('breadcrumb.select_source') }}
          </v-list-subheader>

          <v-list-item
              v-for="src in formatsInCategory"
              :key="src"
              :title="`.${src.toUpperCase()}`"
              :to="localePath(`/${src}`)"
              :active="src === currentSource"
              color="primary"
          />
        </v-list>
      </v-menu>
    </template>

    <!-- 4. TARGET DROPDOWN (If source selected) -->
    <template v-if="currentSource && currentTarget">
      <v-icon icon="mdi-chevron-right" color="white-50" size="small" />

      <v-menu location="bottom center" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
              v-bind="props"
              variant="text"
              color="white"
              class="text-uppercase px-2 font-weight-bold"
              append-icon="mdi-chevron-down"
          >
            To {{ currentTarget }}
          </v-btn>
        </template>
        <v-list density="compact" nav class="rounded-lg elevation-4">
          <v-list-subheader class="text-uppercase font-weight-bold text-caption">
            {{ $t('breadcrumb.select_target') }}
          </v-list-subheader>

          <v-list-item
              v-for="tgt in availableTargets"
              :key="tgt"
              :title="`To ${tgt.toUpperCase()}`"
              :to="localePath(`/${currentSource}/${tgt}`)"
              :active="tgt === currentTarget"
              prepend-icon="mdi-arrow-right"
              color="primary"
          />
        </v-list>
      </v-menu>
    </template>

  </div>
</template>

<script setup lang="ts">
import {
  CATEGORY_MAP,
  CATEGORY_CONFIG,
  ALLOWED_CONVERSIONS
} from '~~/content/context';

const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();

// 1. Текущие параметры из URL
const currentSource = computed(() => (route.params.source as string)?.toLowerCase());
const currentTarget = computed(() => (route.params.target as string)?.toLowerCase());

// 2. Текущая категория
const currentCategory = computed(() => {
  if (currentSource.value) {
    return CATEGORY_MAP[currentSource.value] || 'other';
  }
  return 'image'; // Дефолт или логика для страницы /fs
});

const currentCategoryLabel = computed(() => {
  const key = CATEGORY_CONFIG[currentCategory.value]?.labelKey || currentCategory.value;
  return t(key);
});

// 3. Списки для меню
const categories = computed(() => Object.keys(CATEGORY_CONFIG));

const formatsInCategory = computed(() => {
  // Фильтруем все форматы, которые принадлежат текущей категории
  return Object.keys(ALLOWED_CONVERSIONS).filter(fmt =>
      (CATEGORY_MAP[fmt] || 'other') === currentCategory.value
  );
});

const availableTargets = computed(() => {
  if (!currentSource.value) return [];
  return ALLOWED_CONVERSIONS[currentSource.value as keyof typeof ALLOWED_CONVERSIONS] || [];
});

// Навигация при смене категории (выбираем первый попавшийся формат из этой категории)
const navigateToCategory = (catKey: string) => {
  const firstFormat = Object.keys(ALLOWED_CONVERSIONS).find(fmt =>
      (CATEGORY_MAP[fmt] || 'other') === catKey
  );

  if (firstFormat) {
    navigateTo(localePath(`/fs/${firstFormat}`));
  } else {
    // Если форматов нет, ведем в каталог с фильтром (если реализовано) или просто в fs
    navigateTo(localePath('/fs'));
  }
};
</script>

<style scoped>
.white-50 { color: rgba(255, 255, 255, 0.5); }
.gap-1 { gap: 4px; }
</style>
