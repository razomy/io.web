<template>
  <v-navigation-drawer
      v-model="isOpen"
      app
      permanent
      expand-on-hover
      border="1"
      class="bordere-1"
      :rail="railGroups"
  >
    <template v-slot:prepend>
      <RazomyProducts/>
      <v-divider></v-divider>
    </template>
    <template v-slot:default>
      <v-list nav>
        <v-list-item
            v-for="(group, groupKey) in groupedFormats"
            :key="groupKey"
            density="compact"
            :value="groupKey"
            :prepend-icon="groups[groupKey]?.icon || 'mdi-folder'"
            :title="t(groups[groupKey]?.labelKey || groupKey)"
            :to="localePath(`/${groupKey}`)"
            :active="groupKey === groupSlug"
            color="primary"
        />
      </v-list>
    </template>

    <template v-slot:append>
      <div class="pa-2">
        <v-icon-btn v-if="railGroups"
                    icon="mdi-chevron-right"
                    @click.stop="railGroups = !railGroups"
        ></v-icon-btn>
        <v-btn v-if="!railGroups"
               block
               density="compact"
               @click.stop="railGroups = !railGroups"
        >
          <v-icon icon="mdi-chevron-left"></v-icon>
          Collapse
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-navigation-drawer
      v-model="isOpen"
      permanent
      app
      border="1"
      class="bordere-1"
  >
    <!-- Search Input -->
    <div class="pa-1 sticky-top bg-surface z-index-10 border-b">
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

    <v-list
        class="pa-2"
        nav
        open-strategy="single"
        density="compact"
    >

      <!-- MODE 1: Search Results -->
      <template v-if="search">
        <div class="text-caption text-medium-emphasis mb-2 ml-2">
          {{ t('sidebar.results_for') }} "{{ search }}"
        </div>

        <!-- Added density="compact" -->
        <v-list-item
            v-for="item in searchResults"
            :key="`${item.from}-${item.to}`"
            :to="localePath(`/${item.category}/${item.from}/${item.to}`)"
            color="primary"
            rounded="lg"
            class="mb-1"
            density="compact"
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

      <!-- MODE 2: Categories -->
      <template v-else>
        <!-- Level 2: Source Formats -->
        <!-- Removed 'sub-group' prop to fix the huge indentation issue -->
        <v-list-group
            v-for="input in groupedFormats[groupSlug]"
            :key="input"
            :value="input"
        >
          <template v-slot:activator="{ props }">
            <!-- Added density="compact" and pl-4 for visual hierarchy -->
            <v-list-item
                v-bind="props"
                :title="`.${input.toUpperCase()}`"
                :to="localePath(`/${EXT_TO_GROUP_MAP[input]}/${input}`)"
                color="primary"
                density="compact"
                :active="input === inputSlug"
            />
          </template>

          <!-- Level 3: Target Formats -->
          <!-- Added density="compact" and pl-6 for correct indentation -->
          <v-list-item
              v-for="output in EXT_TO_EXTS_MAP[input as keyof typeof EXT_TO_EXTS_MAP]"
              :key="output"
              class="pa-0"
              :title="`${input.toUpperCase()} → ${output.toUpperCase()}`"
              :to="localePath(`/${EXT_TO_GROUP_MAP[input]}/${input}/${output}`)"
              density="compact"
              color="primary"
              :active="output === outputSlug"
          />
        </v-list-group>

      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import RazomyProducts from './RazomyProducts.vue';
import {EXT_TO_EXTS_MAP, groups, EXT_TO_GROUP_MAP} from '../../content/context';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const {t} = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const railGroups = ref(true); // Default to open
const search = ref('');
const groupSlug = ref<string>('');
const inputSlug = ref<string>('');
const outputSlug = ref<string>('');

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const groupedFormats = computed(() => {
  const groups: Record<string, string[]> = {};
  for (const format in EXT_TO_EXTS_MAP) {
    const category = EXT_TO_GROUP_MAP[format] || 'other';
    if (!groups[category]) groups[category] = [];
    groups[category].push(format);
  }
  return groups;
});

// --- Logic to keep menu open after redirect ---
watch(() => route.params, (newParams) => {
  groupSlug.value = newParams.group as string;
  inputSlug.value = newParams.input as string;
  outputSlug.value = newParams.output as string;
}, {immediate: true, deep: true});


// --- Search Logic ---
const searchResults = computed(() => {
  if (!search.value) return [];
  const q = search.value.toLowerCase().trim();
  const parts = q.split(/[\s\-\/>]+|\sto\s+/).filter(Boolean);
  const results: { from: string, to: string, category: string }[] = [];

  Object.entries(EXT_TO_EXTS_MAP).forEach(([input, outputs]:any) => {
    if (parts.length >= 2) {
      const fromPart = parts[0];
      const toPart = parts[1];
      if (input.includes(fromPart as any)) {
        outputs.forEach((t:any) => {
          if (t.includes(toPart)) results.push({from: input, to: t, category: EXT_TO_GROUP_MAP[input]!});
        });
      }
    } else {
      if (input.includes(q)) {
        outputs.forEach((t:any) => results.push({from: input, to: t, category: EXT_TO_GROUP_MAP[input]!}));
      } else {
        outputs.forEach((t:any) => {
          if (t.includes(q)) results.push({from: input, to: t, category: EXT_TO_GROUP_MAP[input]!});
        });
      }
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