<template>
  <div class="min-vh-100 pb-16">


    <SeoHeader :directoryLast="directoryLast" :commandKey="commandKey"></SeoHeader>

    <!-- Main Content Area -->
    <v-container class="position-relative z-index-1">

      <TextInput
          :loading="loading"
          v-model="inputText"
          :outputText="outputText"
          :commandKey="commandKey"
          @convert="processTextData"
      ></TextInput>

      <!-- Ошибки -->
      <v-snackbar v-model="hasError" color="error" location="top" timeout="5000">
        <v-icon start icon="mdi-alert-circle"/>
        {{ errorMessage }}
        <template v-slot:actions>
          <v-btn variant="text" @click="hasError = false">{{t('io.web.file_to_file.close')}}</v-btn>
        </template>
      </v-snackbar>

      <!-- SEO Контент -->
      <SeoSection
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
    h1: t('io.web.file_to_file.directory.command.seo.h1', {directory: in_, command: out}),
    intro_title: t('io.web.file_to_file.directory.command.seo.intro_title', {directory: in_, command: out}),
    intro: t('io.web.file_to_file.directory.command.seo.intro_text', {directory: in_, command: out}),
    steps: [
      {
        title: t('io.web.text_to_text.directory.command.steps.paste', {directory: in_}),
        icon: 'mdi-clipboard-text-outline',
        text: t('io.web.text_to_text.directory.command.steps.paste_desc', {s: in_})
      },
      {
        title: t('io.web.text_to_text.directory.command.steps.process', {func: out}),
        icon: 'mdi-cog-transfer-outline',
        text: t('io.web.text_to_text.directory.command.steps.process_desc', {func: out})
      },
      {
        title: t('io.web.text_to_text.directory.command.steps.copy', {command: out}),
        icon: 'mdi-content-copy',
        text: t('io.web.text_to_text.directory.command.steps.copy_desc', {tgt: out})
      },
    ],
    faq: [
      {q: t('io.web.file_to_file.directory.command.faq.q1', {s: in_, t: out}), a: t('io.web.file_to_file.directory.command.faq.a1')},
      {q: t('io.web.file_to_file.directory.command.faq.q2', {s: in_}), a: t('io.web.file_to_file.directory.command.faq.a2')},
      {q: t('io.web.file_to_file.directory.command.faq.q3', {s: in_, t: out}), a: t('io.web.file_to_file.directory.command.faq.a3')},
    ]
  }
}

const seoContent = computed(() => generateSeoContent());

useSeoMeta({
  title: () => t('io.web.file_to_file.directory.command.seo.title', {directory: directoryLast.toUpperCase(), command: commandKey.toUpperCase()}),
  description: () => t('io.web.file_to_file.directory.command.seo.description', {
    directory: directoryLast.toUpperCase(),
    command: commandKey.toUpperCase()
  }),
  ogTitle: () => t('io.web.file_to_file.directory.command.seo.title', {directory: directoryLast.toUpperCase(), command: commandKey.toUpperCase()}),
  ogDescription: () => t('io.web.file_to_file.directory.command.seo.description', {
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
</script>

<style scoped>
.z-index-1 {
  z-index: 1;
}

.gap-4 {
  gap: 1rem;
}
</style>