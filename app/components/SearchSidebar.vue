<template>
  <v-navigation-drawer
      v-model="isOpen"
      :floating="isMobile"
      :permanent="!isMobile"
      app
      border="0"
      color=""
      class="content-0 mx-2"
      width="180"
  >
    <template v-slot:prepend>
      <!-- Search Input -->
      <div class="px-2 sticky-top z-index-10 pt-1 pb-1">
        <v-text-field
            v-model="searchInputValue"
            :label="t('io.web.sidebar.search')"
            :placeholder="t('io.web.sidebar.search')"
            clearable
            prepend-inner-icon="mdi-magnify"
            rounded="lg"
            variant="plain"
            @update:model-value="handleSearchInput"
        >
          <!-- Show a tiny loader while waiting for debounce -->
          <template v-if="isCalculating" v-slot:append-inner>
            <v-progress-circular indeterminate size="20" width="2" color="primary"/>
          </template>
        </v-text-field>
      </div>
      <v-divider class="mx-2"></v-divider>
    </template>

    <v-list
        density="compact"
        nav
        v-model:opened="openedGroups"
        open-strategy="multiple"
    >
      <!-- Search Status -->
      <div v-if="activeSearchQuery" class="text-caption text-medium-emphasis mb-2">
        <span v-if="searchResultsGroups.length === 0">
          {{ t('io.web.sidebar.no_results') }}
        </span>
        <span v-else>
          {{ t('io.web.sidebar.results_for') }} "{{ activeSearchQuery }}"
        </span>
      </div>

      <!-- Recursive Tree Rendering -->
      <div
          v-for="directory0 in searchResultsGroups"
          :key="directory0.id"
      >
        <!-- Level 1: Group Title -->
        <div class="my-1 text-body-medium text-medium-emphasis">
          {{ t(directory0.meta.nameTk) }}
        </div>

        <!-- Direct Commands in Level 1 -->
        <v-list-item
            v-for="command0 in directory0.commands"
            :key="command0.id"
            :active="command0.commandKey === currentCategories[1]"
            class="pa-0 pl-2"
            :to="localePath(command0.meta.url)"
            color="secondary"
            density="compact"
        >
          <template v-slot:title>
            <v-icon v-if="activeSearchQuery" icon="mdi-swap-horizontal" size="small" class="mr-2"/>
            <span class="text-body-medium">{{ t(command0.meta.nameTk) }}</span>
          </template>
        </v-list-item>

        <!-- Level 2: Categories -->
        <v-list-group
            v-for="directory1 in directory0.directories"
            :key="directory1.id"
            :active="directory1.directoryKey === currentCategories[1]"
            :value="directory1.id"
            class="pa-0 pl-2"
            density="compact"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
                :active="directory1.directoryKey === currentCategories[1]"
                color="secondary"
                density="compact"
                class="pa-0"
                v-bind="props"
            >
              <template v-slot:title>
                <v-btn density="compact" class="pl-0 text-left w-100" variant="plain" spaced="end"
                       :to="localePath(directory1.meta.url)">
                  <span class="text-body-medium">{{ t(directory1.meta.nameTk) }}</span>
                </v-btn>
              </template>
            </v-list-item>
          </template>

          <!-- Level 3: Target Formats / Commands -->
          <v-list-item
              v-for="command1 in directory1.commands"
              :key="command1.id"
              :active="directory1.directoryKey === currentCategories[1] && command1.commandKey === currentCategories[2]"
              :to="localePath(command1.meta.url)"
              class="pa-0"
              color="secondary"
              density="compact"
          >
            <template v-slot:title>
              <v-icon v-if="activeSearchQuery" icon="mdi-swap-horizontal" size="small" class="mr-2"/>
              {{ t(command1.meta.nameTk) }}
            </template>
          </v-list-item>
        </v-list-group>
      </div>

    </v-list>
  </v-navigation-drawer>

  <v-fab
      v-if="isMobile && !isOpen"
      app
      class="z-index-10"
      fixed
      icon="mdi-magnify"
      @click="isOpen = !isOpen"
  ></v-fab>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {useDisplay} from 'vuetify';
import {directoriesTree} from '~~/razomy/db';
import {type IoDirectory} from '~~/razomy/io/command';
import {Debounce} from '~~/razomy/functions';

const {t, availableLocales} = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const {xs} = useDisplay();

const isMobile = computed(() => xs.value);
const isOpen = ref<boolean>(!isMobile.value);
const openedGroups = ref<string[]>([]);

function useUnlocalePath(): string {
  const path = route.path;
  for (const locale of availableLocales) {
    const prefix = '/' + locale;
    if (path.startsWith(prefix) && (path.length === prefix.length || path.startsWith(prefix + '/'))) {
      return path.slice(prefix.length) || '/';
    }
  }
  return path;
}

const currentCategories = computed(() => {
  const path = useUnlocalePath();
  return path.split('/').filter(Boolean);
});

// --- OPTIMIZATION START ---

// 1. Separate Input Value from Search Query
const searchInputValue = ref(''); // What the user sees in input
const activeSearchQuery = ref(''); // What triggers the filter
const isCalculating = ref(false);
let debouncer = new Debounce();

/**
 * Debounce Function:
 * Only updates 'activeSearchQuery' 350ms after the user STOPS typing.
 */
function handleSearchInput(newValue: string | null) {
  const val = newValue || '';
  isCalculating.value = true;

  debouncer.debounce(() => {
    activeSearchQuery.value = val;
    isCalculating.value = false;
  }, 350); // 350ms delay
}

// ... (Keep filterDirectoryRecursive logic exactly as is) ...
function filterDirectoryRecursive(directory: IoDirectory, queryParts: string[]): IoDirectory | null {
  const dirSearchText = `${directory.directoryPath.join(' ')} ${t(directory.meta.nameTk)}`.toLowerCase();

  const prunedDirectories = (directory.directories || [])
      .map(child => filterDirectoryRecursive(child, queryParts))
      .filter((child): child is IoDirectory => child !== null);

  const prunedCommands = (directory.commands || []).filter(cmd => {
    const cmdSearchText = `${cmd.commandKey} ${dirSearchText} ${cmd.directoryPath?.join(' ') || ''}`.toLowerCase();
    return queryParts.every(part => cmdSearchText.includes(part));
  });

  const isExactMatch = queryParts.every(part => dirSearchText.includes(part));

  if (!isExactMatch && prunedDirectories.length === 0 && prunedCommands.length === 0) {
    return null;
  }

  return {
    ...directory,
    directories: prunedDirectories.length > 0 ? prunedDirectories : (isExactMatch ? directory.directories : []),
    commands: prunedCommands.length > 0 ? prunedCommands : (isExactMatch ? directory.commands : [])
  };
}

// Computed property now listens to activeSearchQuery instead of search directly
const searchResultsGroups = computed(() => {
  // Use activeSearchQuery here
  if (!activeSearchQuery.value) {
    if (!currentCategories.value.length) {
      return directoriesTree;
    }
    return directoriesTree.filter(d => d.directoryKey === currentCategories.value[0]!);
  }

  const q = activeSearchQuery.value.toLowerCase().trim();
  const parts = q.split(/[\s\-\/>]+|\sto\s+/).filter(Boolean);

  // Performance Note: This is the heavy part
  return directoriesTree
      .map(group => filterDirectoryRecursive(group, parts))
      .filter((group): group is IoDirectory => group !== null);
});

// Watcher Optimization
watch(searchResultsGroups, (directories) => {
  // Only auto-expand if we have search results
  if (!activeSearchQuery.value) return;

  const allKeys = directories.map(d => d.directories.map(child => child.directoryKey)).flat(1);

  // SAFETY: If search matches > 20 groups, do not expand all of them automatically.
  // This prevents the UI from freezing due to massive layout shifts.
  if (allKeys.length < 20) {
    openedGroups.value = allKeys;
  } else {
    // Optionally collapse everything or keep current state if too many results
    // openedGroups.value = [];
  }
});
</script>

<style scoped>
.v-list-item--density-compact.v-list-item--one-line {
  min-height: 24px;
  max-height: 24px;
  padding: 0;
  margin: 0;
}

.v-list-group__items .v-list-item {
  padding-inline-start: 12px !important;
}
</style>