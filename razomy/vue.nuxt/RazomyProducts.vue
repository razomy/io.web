<template>
  <v-menu location="bottom center" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-list v-bind="props" class="pa-0">
        <v-list-item append-icon="mdi-chevron-down">
          <template v-slot:prepend>
            <RazomyIcon class="mr-4"></RazomyIcon>
          </template>
          {{ currentCategoryLabel }}
        </v-list-item>
      </v-list>
    </template>

    <v-list nav class="rounded-lg">
      <!--      <v-list-subheader class="text-uppercase font-weight-bold text-caption">-->
      <!--        {{ $t('breadcrumb.select_category') }}-->
      <!--      </v-list-subheader>-->

      <!-- Loop through the computed menuList -->
      <v-list-item
          v-for="item in menuList"
          :key="item.key"
          :title="item.name"
          :prepend-icon="item.icon"
          :href="item.url"
          :active="item.key === currentCategory"
          color="primary"
          :value="item.key"
      />
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import RazomyIcon from '~~/razomy/vue.nuxt/RazomyIcon.vue'; // Assuming you use vue-i18n

// ~~/content/context.ts

interface CategoryItem {
  labelKey: string; // The translation key (e.g., 'nav.dashboard')
  icon: string;     // The MDI icon class
  url: string;      // The destination path
}

const CATEGORY_CONFIG: Record<string, CategoryItem> = {
  razomy: {
    labelKey: 'Razomy',
    icon: 'razomy',
    url: 'https://razomy.org'
  },
  function: {
    labelKey: 'Function',
    icon: 'function',
    url: 'https://io.razomy.org'
  },
  ['monster-match']: {
    labelKey: 'Monster-match',
    icon: 'monster-match',
    url: 'https://monster-match.razomy.org'
  },
};

const router = useRouter();
const {t} = useI18n();

// 1. Get the keys from the config
const categories = Object.keys(CATEGORY_CONFIG);

// 2. Create the computed list with Name, URL, and Icon
const menuList = computed(() => {
  return categories.map((key) => {
    const config = CATEGORY_CONFIG[key] as any;
    return {
      key: key,
      name: t(config.labelKey), // Translates the label
      icon: config.icon,
      url: config.url
    };
  });
});

// Mock current category for display purposes
const currentCategory = 'function';
const currentCategoryLabel = computed(() => {
  return t(CATEGORY_CONFIG[currentCategory]?.labelKey || 'Select');
});
</script>
