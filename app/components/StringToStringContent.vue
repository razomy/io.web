<template>
  <div class="bg-surface-light min-vh-100 pb-16">

    <!-- Hero Background -->
    <div class="hero-bg pt-12 pb-32 px-4 text-center">
      <v-container>
        <!-- SEO Breadcrumb/Badge -->
        <v-chip
            color="primary"
            variant="tonal"
            class="mb-4 font-weight-bold"
            size="small"
        >
          {{
            t('nuxt.file_to_file.directory.command.seo.title', {
              directory: directoryLast.toUpperCase(),
              command: commandKey.toUpperCase()
            }).split('|')[0]
          }}
        </v-chip>

        <h1 class="text-h3 text-md-h2 font-weight-black mb-4 text-darken-4">
          {{ directoryLast.toUpperCase() }} <span class="text-primary">to</span> {{ commandKey.toUpperCase() }}
        </h1>

        <p class="text-medium-emphasis text-body-1 text-md-h6 mx-auto" style="max-width: 700px; line-height: 1.6;">
          {{ t('nuxt.file_to_file.directory.command.hero_sub', {s: directoryLast.toUpperCase(), t: commandKey.toUpperCase()}) }}
        </p>

        <!-- Trust Badges (Преимущества) -->
        <div class="d-flex justify-center gap-4 mt-6 flex-wrap">
          <div class="d-flex align-center px-3 py-1 text-caption text-darken-2">
            <v-icon icon="mdi-shield-check" color="success" class="mr-2" size="small"/>
            {{ t('nuxt.file_to_file.directory.command.features.secure') }}
          </div>
          <div class="d-flex align-center px-3 py-1 text-caption text-darken-2">
            <v-icon icon="mdi-flash" color="warning" class="mr-2" size="small"/>
            {{ t('nuxt.file_to_file.directory.command.features.fast') }}
          </div>
          <div class="d-flex align-center px-3 py-1 text-caption text-darken-2">
            <v-icon icon="mdi-text-box-check" color="info" class="mr-2" size="small"/>
            {{ t('nuxt.file_to_file.directory.command.features.accurate') }}
          </div>
        </div>

      </v-container>
    </div>

    <!-- Main Content Area -->
    <v-container class="mt-n16 position-relative z-index-1">

      <!-- Блок обработки текста -->
      <v-card class="elevation-4 rounded-xl pa-4 pa-md-6 mb-8">
        <v-row>
          <!-- Input Area -->
          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-text-box-edit-outline" color="primary" class="mr-2" />
              <span class="font-weight-bold text-subtitle-1">Input Text</span>
            </div>
            <v-textarea
                v-model="inputText"
                variant="outlined"
                color="primary"
                placeholder="Paste your text here..."
                auto-grow
                rows="8"
                hide-details
                :disabled="loading"
            ></v-textarea>
          </v-col>

          <!-- Output Area -->
          <v-col cols="12" md="6">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center">
                <v-icon icon="mdi-code-braces" color="secondary" class="mr-2" />
                <span class="font-weight-bold text-subtitle-1">{{ commandKey.toUpperCase() }} Result</span>
              </div>
              <v-btn
                  v-if="outputText"
                  size="small"
                  variant="text"
                  color="primary"
                  icon="mdi-content-copy"
                  @click="copyToClipboard"
                  title="Copy to clipboard"
              />
            </div>
            <v-textarea
                v-model="outputText"
                variant="outlined"
                bg-color="lighten-4"
                placeholder="Result will appear here..."
                auto-grow
                rows="8"
                readonly
                hide-details
                :loading="loading"
            ></v-textarea>
          </v-col>
        </v-row>

        <!-- Action Button -->
        <div class="d-flex justify-center mt-6">
          <v-btn
              color="primary"
              size="x-large"
              prepend-icon="mdi-auto-fix"
              :loading="loading"
              :disabled="!inputText.trim()"
              @click="processTextData"
              elevation="2"
              class="px-8 rounded-pill"
          >
            Convert to {{ commandKey.toUpperCase() }}
          </v-btn>
        </div>
      </v-card>

      <!-- Ошибки -->
      <v-snackbar v-model="hasError" color="error" location="top" timeout="5000">
        <v-icon start icon="mdi-alert-circle"/>
        {{ errorMessage }}
        <template v-slot:actions>
          <v-btn variant="text" @click="hasError = false">Close</v-btn>
        </template>
      </v-snackbar>

      <!-- Уведомление об успешном копировании -->
      <v-snackbar v-model="copied" color="success" location="bottom" timeout="2000">
        <v-icon start icon="mdi-check-circle"/>
        Copied to clipboard!
      </v-snackbar>

      <!-- SEO Контент -->
      <SeoSection
          class="mt-16"
          :content="seoContent"
          :directory="directoryLast"
          :command="commandKey"
      />
    </v-container>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SeoSection from '~/components/SeoSection.vue';
// Заменили sendFile на функцию для отправки текста, предполагается, что она принимает (text, functionName, url)
import { processText } from '~/functions/processText';

const { t } = useI18n();
const props = defineProps<{
  directoryPath: string[],
  commandKey: string, // Здесь передается название функции (например: 'base64', 'md5')
}>()

const directoryPath = props.directoryPath;
const directoryLast = directoryPath.at(-1)!;
const commandKey = props.commandKey; // Название применяемой функции

// --- SEO LOGIC ---
// Ключи локализации изменены с file_to_file на text_tool для семантики
const generateSeoContent = () => {
  const in_ = directoryLast.toUpperCase();
  const out = commandKey.toUpperCase();

  return {
    h1: t('nuxt.file_to_file.directory.command.seo.h1', {directory: in_, command: out}),
    intro_title: t('nuxt.file_to_file.directory.command.seo.intro_title', {directory: in_, command: out}),
    intro: t('nuxt.file_to_file.directory.command.seo.intro_text', {directory: in_, command: out}),
    steps: [
      {
        title: t('nuxt.text_to_text.directory.command.steps.paste', {directory: in_}),
        icon: 'mdi-clipboard-text-outline',
        text: t('nuxt.text_to_text.directory.command.steps.paste_desc', {s: in_})
      },
      {
        title: t('nuxt.text_to_text.directory.command.steps.process', {func: out}),
        icon: 'mdi-cog-transfer-outline',
        text: t('nuxt.text_to_text.directory.command.steps.process_desc', {func: out})
      },
      {
        title: t('nuxt.text_to_text.directory.command.steps.copy', {command: out}),
        icon: 'mdi-content-copy',
        text: t('nuxt.text_to_text.directory.command.steps.copy_desc', {tgt: out})
      },
    ],
    faq: [
      {q: t('nuxt.file_to_file.directory.command.faq.q1', {s: in_, t: out}), a: t('nuxt.file_to_file.directory.command.faq.a1')},
      {q: t('nuxt.file_to_file.directory.command.faq.q2', {s: in_}), a: t('nuxt.file_to_file.directory.command.faq.a2')},
      {q: t('nuxt.file_to_file.directory.command.faq.q3', {s: in_, t: out}), a: t('nuxt.file_to_file.directory.command.faq.a3')},
    ]
  }
}

const seoContent = computed(() => generateSeoContent());

useSeoMeta({
  title: () => t('nuxt.file_to_file.directory.command.seo.title', {directory: directoryLast.toUpperCase(), command: commandKey.toUpperCase()}),
  description: () => t('nuxt.file_to_file.directory.command.seo.description', {
    directory: directoryLast.toUpperCase(),
    command: commandKey.toUpperCase()
  }),
  ogTitle: () => t('nuxt.file_to_file.directory.command.seo.title', {directory: directoryLast.toUpperCase(), command: commandKey.toUpperCase()}),
  ogDescription: () => t('nuxt.file_to_file.directory.command.seo.description', {
    directory: directoryLast.toUpperCase(),
    command: commandKey.toUpperCase()
  }),
  robots: 'index, follow'
});

// --- PROCESSING LOGIC ---
const inputText = ref<string>('');
const outputText = ref<string>('');
const loading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');
const copied = ref(false);

const processTextData = async () => {
  if (!inputText.value.trim()) return;

  loading.value = true;
  hasError.value = false;
  outputText.value = '';

  try {
    // Отправляем текст на бэкенд для обработки конкретной функцией
    const result = await processText(
        directoryPath,
        commandKey,
        [inputText.value],
    );

    outputText.value = result;
  } catch (e: any) {
    console.error(`Error processing text:`, e);
    hasError.value = true;
    errorMessage.value = e.message || String(e);
  } finally {
    loading.value = false;
  }
}

// Утилита для копирования результата
const copyToClipboard = async () => {
  if (!outputText.value) return;
  try {
    await navigator.clipboard.writeText(outputText.value);
    copied.value = true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}
</script>

<style scoped>
.hero-bg {
  background-color: rgb(var(--v-theme-surface-light));
  background-image: radial-gradient(rgb(var(--v-theme-primary), 0.08) 1px, transparent 1px);
  background-size: 20px 20px;
}

.z-index-1 {
  z-index: 1;
}

.gap-4 {
  gap: 1rem;
}
</style>