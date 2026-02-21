<template>
  <v-navigation-drawer
      v-model="model"
      :floating="isMobile"
      :permanent="!isMobile"
      app
      border="1"
      class="bordere-1 bg-surface-light sidebar"
      width="180"
  >
    <!-- Search Input -->
    <div class="pa-1 sticky-top z-index-10 border-b">
      <v-text-field
          v-model="search"
          :label="t('nuxt.sidebar.search')"
          :placeholder="t('nuxt.sidebar.search')"
          class="bg-surface-light"
          clearable
          prepend-inner-icon="mdi-magnify"
          rounded="lg"
          variant="plain"
      />
    </div>

    <v-list
        density="compact"
        nav
        v-model:opened="openedGroups"
        open-strategy="multiple"
    >
      <!-- Optional: Show search count / No results -->
      <div v-if="search" class="text-caption text-medium-emphasis mb-2">
        <span v-if="searchResultsGroups.length === 0">
          {{ t('nuxt.sidebar.no_results') }}
        </span>
        <span v-else>
          {{ t('nuxt.sidebar.results_for') }} "{{ search }}"
        </span>
      </div>

      <!-- Unified Tree View (Reduces automatically on search) -->
      <div
          v-for="directory0 in searchResultsGroups"
          :key="directory0.key"
      >
        <!-- Level 1: Group Title -->
        <div class="my-1 text-caption font-weight-bold text-uppercase text-darken-1">
          {{ t(directory0.label.fullText) }}
        </div>

        <v-list-item
            v-for="command0 in directory0.commands"
            :key="command0.commandKey"
            :active="command0.commandKey === currentCategories[1]"
            class="pa-0 pl-2"
            :to="localePath(`/${directory0.key}/${command0.commandKey}`)"
            color="secondary"
            density="compact"
        >
          <!-- Show swap icon when actively searching for a conversion -->
          <template v-slot:title>
            <v-icon v-if="search" icon="mdi-swap-horizontal" size="small" class="mr-2"/>
            {{ command0.commandKey }}
          </template>
        </v-list-item>

        <!-- Level 2: Categories -->
        <v-list-group
            v-for="directory1 in directory0.directories"
            :key="directory1.key"
            :active="directory1.key === currentCategories[1]"
            :value="directory1.key"
            class="pa-0 pl-2"
            density="compact"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
                :active="directory1.key === currentCategories[1]"
                color="secondary"
                density="compact"
                class="pa-0"
                v-bind="props"
            >
              <template v-slot:title>
                <v-btn density="compact" class="pl-0 text-left" spaced="end"
                       :to="localePath(`/${directory0.key}/${directory1.key}`)">
                  {{ directory1.key }}
                </v-btn>
              </template>
            </v-list-item>
          </template>

          <!-- Level 3: Target Formats / Commands -->
          <v-list-item
              v-for="command1 in directory1.commands"
              :key="command1.commandKey"
              :active="directory1.key === currentCategories[1] && command1.commandKey === currentCategories[2]"
              :to="localePath(`/${directory0.key}/${directory1.key}/${command1.commandKey}`)"
              class="pa-0"
              color="secondary"
              density="compact"
          >
            <!-- Show swap icon when actively searching for a conversion -->
            <template v-slot:title>
              <v-icon v-if="search" icon="mdi-swap-horizontal" size="small" class="mr-2"/>
              {{ command1.commandKey }}
            </template>
          </v-list-item>
        </v-list-group>
      </div>

    </v-list>
  </v-navigation-drawer>

  <v-fab
      v-if="!model"
      app
      class="z-index-10 border-1"
      fixed
      icon="mdi-magnify"
      @click="model = !model"
  ></v-fab>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {useDisplay} from 'vuetify';
import {directoriesTree} from '~~/razomy/db';
import {type IoDirectory} from '~~/razomy/io/command';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const {xs: isMobile} = useDisplay();
const {t} = useI18n();
const localePath = useLocalePath();
const route = useRoute();

if (isMobile.value) {
  model.value = false;
}

const currentCategories = ref<string[]>([]);
watch(() => route.path, (path) => {
  // Grab standard path parameters (e.g., audio, mp3, wav)
  currentCategories.value = path.split('/').filter(Boolean);
}, {immediate: true, deep: true});

const search = ref('');

// --- Unified Search & Tree Logic ---

/**
 * Recursively filters the directory tree. Returns a pruned copy of the directory
 * if it matches, or null if neither it nor its children match.
 */
function filterDirectoryRecursive(dir: IoDirectory, queryParts: string[]): IoDirectory | null {
  // 1. Text related to current directory
  const dirSearchText = `${dir.key} ${t(dir.label.fullText)}`.toLowerCase();

  // 2. Filter Sub-Directories (Level 2+)
  const prunedDirectories = (dir.directories || [])
      .map(child => filterDirectoryRecursive(child, queryParts))
      .filter((child): child is IoDirectory => child !== null);

  // 3. Filter Commands (Level 3)
  const prunedCommands = (dir.commands || []).filter(cmd => {
    // Combine directory info and command info for cross-searching (e.g. "mp3 to wav")
    const cmdSearchText = `${cmd.commandKey} ${dirSearchText} ${cmd.directoryPath?.join(' ') || ''}`.toLowerCase();
    // Ensures all words typed in the search exist somewhere in the path/command
    return queryParts.every(part => cmdSearchText.includes(part));
  });

  // Check if the directory itself perfectly matched the search
  const isExactMatch = queryParts.every(part => dirSearchText.includes(part));

  // 4. If nothing matched, prune this branch entirely
  if (!isExactMatch && prunedDirectories.length === 0 && prunedCommands.length === 0) {
    return null;
  }

  // 5. If there's a match, return a cloned & reduced version of the directory
  return {
    ...dir,
    // Show matching children. If the parent matched directly and had no matching children,
    // keep the original children so the user can see what's inside.
    directories: prunedDirectories.length > 0 ? prunedDirectories : (isExactMatch ? dir.directories : []),
    commands: prunedCommands.length > 0 ? prunedCommands : (isExactMatch ? dir.commands : [])
  };
}

// Automatically processes the search and reduces the group visually
const searchResultsGroups = computed(() => {
  if (!search.value) {
    return directoriesTree; // Return unmodified full tree when there is no search query
  }

  // Split query cleanly (e.g., "mp3 to wav" => ["mp3", "wav"])
  const q = search.value.toLowerCase().trim();
  const parts = q.split(/[\s\-\/>]+|\sto\s+/).filter(Boolean);

  // Map over top level, filter out branches that returned null
  const directories = directoriesTree
      .map(group => filterDirectoryRecursive(group, parts))
      .filter((group): group is IoDirectory => group !== null);
  return directories;
});

watch(searchResultsGroups, (directories) => {
  openedGroups.value = directories.map(d => d.directories.map(d => d.key)).flat(1);
});

const openedGroups = ref<string[]>([]);
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