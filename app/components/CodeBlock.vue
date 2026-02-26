<template>
  <h2 class="text-h5 font-weight-bold mb-4">
    {{ t('io.web.code.title') }}
  </h2>

  <!-- Docs View based on JSON -->
  <v-card
      v-if="command && command.spec"
      class="rounded-xl mb-4 pa-5"
      border="0"
      elevation="0"
      color="surface"
  >
    <h3 class="text-h5 font-weight-bold text-accent mb-2">
      {{ command.spec.name }}
    </h3>
    <p class="text-body-1 mb-5">{{ command.spec.description }}</p>

    <div v-if="command.spec.parameters && command.spec.parameters.length" class="mb-5">
      <h4 class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-2">
        {{ t('io.web.code.parameters') }}
      </h4>
      <v-table density="compact" class="bg-transparent">
        <thead>
        <tr>
          <th class="text-left">{{ t('io.web.code.name') }}</th>
          <th class="text-left">{{ t('io.web.code.type') }}</th>
          <th class="text-left">{{ t('io.web.code.description') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="param in command.spec.parameters" :key="param.name">
          <td class="font-weight-medium">{{ param.name }}</td>
          <td class="text-accent"><code>{{ param.type }}</code></td>
          <td>{{ param.description }}</td>
        </tr>
        </tbody>
      </v-table>
    </div>

    <div v-if="command.spec.returns">
      <h4 class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-2">
        {{ t('io.web.code.returns') }}
      </h4>
      <div class="d-flex align-center">
        <code class="text-accent mr-2">{{ command.spec.returns.type }}</code>
        <span class="text-body-2">{{ command.spec.returns.description }}</span>
      </div>
    </div>
  </v-card>

  <!-- Code Blocks Area -->
  <v-card class="rounded-xl" border="0" elevation="0">
    <!-- Header with Tabs -->
    <v-toolbar color="surface" height="48">
      <v-tabs
          v-model="activeTab"
          color="primary"
          density="compact"
      >
        <v-tab
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            class="text-none font-weight-regular"
        >
          <v-icon start size="small" :color="tab.color">{{ tab.icon }}</v-icon>
          {{ tab.label }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <!-- Code Display Area -->
    <v-window v-model="activeTab">
      <v-window-item
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          class="pa-3"
      >
        <!-- Install Code Block -->
        <div class="code-wrapper position-relative mb-4">
          <v-btn
              icon
              variant="flat"
              size="small"
              class="copy-btn position-absolute"
              @click="copyCode(tab.codeInstall, tab.value + '-install')"
          >
            <v-icon :color="copiedId === tab.value + '-install' ? 'success' : 'primary'">
              {{ copiedId === tab.value + '-install' ? 'mdi-check' : 'mdi-content-copy' }}
            </v-icon>
          </v-btn>
          <pre><code class="hljs rounded-xl pa-4" v-html="highlightCode(tab.codeInstall, 'sh')"></code></pre>
        </div>

        <!-- Run/Example Code Block -->
        <div class="code-wrapper position-relative">
          <v-btn
              icon
              variant="flat"
              size="small"
              class="copy-btn position-absolute"
              @click="copyCode(tab.codeRun, tab.value + '-run')"
          >
            <v-icon :color="copiedId === tab.value + '-run' ? 'success' : 'primary'">
              {{ copiedId === tab.value + '-run' ? 'mdi-check' : 'mdi-content-copy' }}
            </v-icon>
          </v-btn>
          <v-chip :href="`https://www.npmjs.com/package/@razomy/${tab.directoryPath.join('-')}`">Npm</v-chip>
          <v-chip :href="`https://github.com/razomy/js/tree/main/razomy/${tab.directoryPath.join('-')}`">GitHub</v-chip>
<!--          <v-chip :href="`https://io.razomy.org/${tab.directoryPath.join('/')}`">Io</v-chip>-->
          <pre><code class="hljs rounded-xl pa-4" v-html="highlightCode(tab.codeRun, tab.language)"></code></pre>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getCommandBy } from '~~/razomy/db';
import hljs from 'highlight.js'

const { t } = useI18n();
const isDark = usePreferredDark()

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: computed(() =>
          !isDark.value
              ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css'
              : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css'
      )
    }
  ]
})

const props = defineProps<{
  directoryPath: string[],
  commandKey: string,
}>()

const command = computed(() => {
  return getCommandBy(props.directoryPath, props.commandKey)
})

const tabs = computed(() => {
  if (!command.value) {
    return [];
  }
  const p = '@razomy/' + command.value.directoryPath.join('-')
  return ([
    {
      label: 'Npm Ts/Js',
      value: 'ts',
      language: 'typescript',
      icon: 'mdi-language-javascript',
      color: 'blue',
      directoryPath: command.value.directoryPath,
      codeInstall: `npm i ${p}`,
      codeRun: `import {${command.value.spec.name}} from '${p}';\n\n` + command.value.spec.examples.map((i: any) => i.code + '\n// => ' + i.expected).join('\n\n')
    }
  ])
})

const highlightCode = (code: string, language: string) => {
  if (!code) return ''
  return hljs.highlight(code, { language }).value
}

// State
const activeTab = ref('ts')
const copiedId = ref<string | null>(null) // Tracks WHICH block was copied

// Copy to Clipboard Logic
const copyCode = async (text: string, blockId: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = blockId // Set current block as copied
    setTimeout(() => {
      // Clear the checkmark only if it's still the active one
      if (copiedId.value === blockId) {
        copiedId.value = null
      }
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<style scoped>
.code-wrapper {
  position: relative;
}

.copy-btn {
  top: 8px;
  right: 8px;
  z-index: 10;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
  /* Match highlight.js background so it blends well */
  background-color: var(--v-surface-lighten-1);
}

.code-wrapper:hover .copy-btn {
  opacity: 1;
}

pre {
  margin: 0;
}
</style>