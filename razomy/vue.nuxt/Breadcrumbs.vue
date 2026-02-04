<template>
  <div class="d-flex align-center flex-wrap justify-start gap-1">
    <slot></slot>
    <!-- 1. HOME -->
    <v-btn
        :to="localePath('/')"
        variant="text"
        class="text-capitalize px-2"
        density="comfortable"
    >
      <v-icon icon="mdi-home" start size="small"/>
      {{ $t('breadcrumb.title') }}
    </v-btn>

    <v-icon icon="mdi-chevron-right" opacity="50" size="small"/>

    <!-- 2. CATEGORY DROPDOWN -->
    <v-menu location="bottom center" transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn
            v-if="groupSlug"
            v-bind="props"
            variant="text"
            class="text-capitalize px-2 font-weight-bold"
            append-icon="mdi-chevron-down"
        >
          {{ groups[groupSlug]?.labelKey }}
        </v-btn>
        <v-icon-btn v-bind="props" v-else icon="mdi-plus"></v-icon-btn>
      </template>
      <v-list density="compact" nav class="rounded-lg" elevation="4">
        <v-list-subheader class="text-uppercase font-weight-bold text-caption">
          {{ $t('breadcrumb.select_category') }}
        </v-list-subheader>
        <v-list-item
            v-for="groupKey in categories"
            :key="groupKey"
            :title="$t(groups[groupKey]?.labelKey || groupKey)"
            :prepend-icon="groups[groupKey]?.icon"
            :to="localePath(`/${groupKey}`)"
            :active="groupKey === groupSlug"
            color="primary"
        />
      </v-list>
    </v-menu>

    <!-- 3. SOURCE DROPDOWN (If category selected) -->
    <template v-if="groupSlug">
      <v-icon icon="mdi-chevron-right" opacity="50" size="small"/>

      <v-menu location="bottom center" transition="slide-y-transition" max-height="300">
        <template v-slot:activator="{ props }">
          <v-btn
              v-if="inputSlug"
              v-bind="props"
              variant="text"
              class="text-uppercase px-2 font-weight-bold"
              append-icon="mdi-chevron-down"
          >
            .{{ inputSlug }}
          </v-btn>
          <v-icon-btn v-bind="props" v-else icon="mdi-plus"></v-icon-btn>

        </template>
        <v-list density="compact" nav class="rounded-lg elevation-4">
          <v-list-subheader class="text-uppercase font-weight-bold text-caption">
            {{ $t('breadcrumb.select_source') }}
          </v-list-subheader>

          <v-list-item
              v-for="inputKey in formatsInCategory"
              :key="inputKey"
              :title="`.${inputKey.toUpperCase()}`"
              :to="localePath(`/${groupSlug}/${inputSlug}/${inputKey}`)"
              :active="inputKey === inputSlug"
              color="primary"
          />
        </v-list>
      </v-menu>
    </template>

    <!-- 4. TARGET DROPDOWN (If source selected) -->
    <template v-if="inputSlug && currentTarget">
      <v-icon icon="mdi-chevron-right" opacity="50" size="small"/>

      <v-menu location="bottom center" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn
              v-if="currentTarget"
              v-bind="props"
              variant="text"
              class="text-uppercase px-2 font-weight-bold"
              append-icon="mdi-chevron-down"
          >
            {{ currentTarget }}
          </v-btn>
          <v-icon-btn v-bind="props" v-else icon="mdi-plus"></v-icon-btn>

        </template>
        <v-list density="compact" nav class="rounded-lg elevation-4">
          <v-list-subheader class="text-uppercase font-weight-bold text-caption">
            {{ $t('breadcrumb.select_target') }}
          </v-list-subheader>

          <v-list-item
              v-for="outputKey in availableTargets"
              :key="outputKey"
              :title="`To ${outputKey.toUpperCase()}`"
              :to="localePath(`/${groupSlug}/${inputSlug}/${outputKey}`)"
              :active="outputKey === currentTarget"
              prepend-icon="mdi-arrow-right"
              color="primary"
          />
        </v-list>
      </v-menu>
    </template>

  </div>
</template>

<script setup lang="ts">
import {EXT_TO_EXTS_MAP, groups, EXT_TO_GROUP_MAP} from '~~/content/context';

const route = useRoute();
const localePath = useLocalePath();
const {t} = useI18n();

// 1. Текущие параметры из URL
const groupSlug = computed(() => (route.params.group as string)?.toLowerCase());
const inputSlug = computed(() => (route.params.input as string)?.toLowerCase());
const currentTarget = computed(() => (route.params.output as string)?.toLowerCase());

// 3. Списки для меню
const categories = computed(() => Object.keys(groups));

const formatsInCategory = computed(() => {
  // Фильтруем все форматы, которые принадлежат текущей категории
  return Object.keys(EXT_TO_EXTS_MAP).filter(fmt =>
      (EXT_TO_GROUP_MAP[fmt] || 'other') === groupSlug.value
  );
});

const availableTargets = computed(() => {
  if (!inputSlug.value) return [];
  return EXT_TO_EXTS_MAP[inputSlug.value as keyof typeof EXT_TO_EXTS_MAP] || [];
});

</script>

<style scoped>
.gap-1 {
  gap: 4px;
}
</style>
