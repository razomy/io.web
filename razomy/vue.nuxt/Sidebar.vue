<template>
  <v-navigation-drawer
      v-model="isOpen"
      :width="300"
      class="bg-surface"
      elevation="2"
  >
    <!-- Шапка с поиском -->
    <div class="pa-4 sticky-top bg-surface z-index-10 border-b">
      <div class="d-flex align-center mb-4">
        <v-icon icon="mdi-transcribe" color="primary" size="32" class="mr-2"/>
        <span class="text-h6 font-weight-bold">Converter App</span>
      </div>

      <v-text-field
          v-model="search"
          :placeholder="t('sidebar.search')"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          rounded="lg"
          bg-color="grey-lighten-5"
          clearable
      />
    </div>

    <v-list class="pa-2" nav>

      <!-- РЕЖИМ 1: Результаты поиска (Плоский список) -->
      <template v-if="search">
        <div class="text-caption text-medium-emphasis mb-2 ml-2">
          {{ t('sidebar.results_for') }} "{{ search }}"
        </div>

        <v-list-item
            v-for="item in searchResults"
            :key="`${item.from}-${item.to}`"
            :to="localePath(`/${item.category}/${item.from}/${item.to}`)"
            color="primary"
            rounded="lg"
            class="mb-1"
        >
          <template v-slot:prepend>
            <v-icon size="small" icon="mdi-swap-horizontal" color="grey"/>
          </template>
          <v-list-item-title class="font-weight-medium">
            <span class="text-uppercase">{{ item.from }}</span>
            <span class="text-grey mx-1">→</span>
            <span class="text-uppercase">{{ item.to }}</span>
          </v-list-item-title>
        </v-list-item>

        <div v-if="searchResults.length === 0" class="text-center py-4 text-grey">
          {{ t('sidebar.no_results') }}
        </div>
      </template>

      <!-- РЕЖИМ 2: Категории (Аккордеон) -->
      <template v-else>
        <v-list-group
            v-for="(group, catKey) in groupedFormats"
            :key="catKey"
            :value="catKey"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                :prepend-icon="CATEGORY_CONFIG[catKey]?.icon || 'mdi-folder'"
                :title="t(CATEGORY_CONFIG[catKey]?.labelKey || catKey)"
                rounded="lg"
            />
          </template>

          <!-- Список исходных форматов внутри категории -->
          <v-list-group
              v-for="source in group"
              :key="source"
              :value="source"
              sub-group
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                  v-bind="props"
                  :title="`.${source.toUpperCase()}`"
              />
            </template>

            <!-- Целевые форматы -->
            <v-list-item
                v-for="target in ALLOWED_CONVERSIONS[source as keyof typeof ALLOWED_CONVERSIONS]"
                :key="target"
                :title="`${source.toUpperCase()} → ${target.toUpperCase()}`"
                :to="localePath(`/${CATEGORY_MAP[source]}/${source}/${target}`)"
                density="compact"
                prepend-icon="mdi-arrow-right-bottom"
            />
          </v-list-group>

        </v-list-group>
      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {ALLOWED_CONVERSIONS, CATEGORY_CONFIG, CATEGORY_MAP} from '../../content/context';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const {t} = useI18n();

const localePath = useLocalePath();
const search = ref('');

// Двусторонняя привязка для drawer
const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// Логика группировки
const groupedFormats = computed(() => {
  const groups: Record<string, string[]> = {};

  for (const format in ALLOWED_CONVERSIONS) {
    const category = CATEGORY_MAP[format] || 'other';
    if (!groups[category]) groups[category] = [];
    groups[category].push(format);
  }
  return groups;
});

// Логика умного поиска
const searchResults = computed(() => {
  if (!search.value) return [];
  const q = search.value.toLowerCase();
  const results: { from: string, to: string, category: string }[] = [];

  Object.entries(ALLOWED_CONVERSIONS).forEach(([source, targets]) => {
    // Если совпал источник (например ввели "pdf")
    if (source.includes(q)) {
      targets.forEach(t => results.push({from: source, to: t, category: CATEGORY_MAP[source]!}));
    }
    // Если совпала цель, но не источник
    else {
      targets.forEach(t => {
        if (t.includes(q)) results.push({from: source, to: t, category: CATEGORY_MAP[source]!});
      });
    }
  });

  return results;
});
</script>

<style scoped>
.sticky-top {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
