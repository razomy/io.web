<template>
  <div class="min-vh-100 pb-16">


    <SeoHeader :directoryLast="directoryLast" :commandKey="commandKey">
      {{
        t('io.web.text_to_text.directory.command.hero_sub', {
          source: directoryLast.toUpperCase(),
          target: commandKey.toUpperCase()
        })
      }}
    </SeoHeader>

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
          <v-btn variant="text" @click="hasError = false">{{ t('io.web.file_to_file.close') }}</v-btn>
        </template>
      </v-snackbar>

      <!-- SEO Контент -->
      <SeoSection
          :content="seoContent"
          :directory="directoryLast"
          :command="commandKey"
      />
      <v-container class="pb-16 px-0">
        <CodeBlock
            :directoryPath="directoryPath"
            :commandKey="commandKey"
        ></CodeBlock>
      </v-container>
    </v-container>

  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import SeoSection from '~/components/SeoSection.vue';
// Заменили sendFile на функцию для отправки текста, предполагается, что она принимает (text, functionName, url)
import {processText} from '~/functions/processText';
import CodeBlock from '~/components/CodeBlock.vue';
import {Debounce} from '~~/razomy/functions';
import {commands} from '~~/razomy/db';

const {t} = useI18n();
const props = defineProps<{
  directoryPath: string[],
  commandKey: string, // Здесь передается название функции (например: 'base64', 'md5')
}>()

const directoryPath = props.directoryPath;
const directoryLast = directoryPath.at(-1)!;
const commandKey = props.commandKey; // Название применяемой функции

// --- SEO LOGIC ---
const generateSeoContent = () => {
  const in_ = directoryLast.toUpperCase();
  const out = commandKey.toUpperCase();

  return {
    h1: t('io.web.text_to_text.directory.command.seo.h1', {source: in_, target: out}),
    intro_title: t('io.web.text_to_text.directory.command.seo.intro_title', {source: in_, target: out}),
    intro: t('io.web.text_to_text.directory.command.seo.intro_text', {source: in_, target: out}),
    steps: [
      {
        title: t('io.web.text_to_text.directory.command.steps.paste', {source: in_}),
        icon: 'mdi-clipboard-text-outline',
        text: t('io.web.text_to_text.directory.command.steps.paste_desc', {source: in_})
      },
      {
        title: t('io.web.text_to_text.directory.command.steps.process', {target: out}),
        icon: 'mdi-cog-transfer-outline',
        text: t('io.web.text_to_text.directory.command.steps.process_desc', {target: out})
      },
      {
        title: t('io.web.text_to_text.directory.command.steps.copy', {target: out}),
        icon: 'mdi-content-copy',
        text: t('io.web.text_to_text.directory.command.steps.copy_desc', {target: out})
      },
    ],
    faq: [
      {
        q: t('io.web.text_to_text.directory.command.faq.q1', {source: in_, target: out}),
        a: t('io.web.text_to_text.directory.command.faq.a1')
      },
      {
        q: t('io.web.text_to_text.directory.command.faq.q2', {source: in_}),
        a: t('io.web.text_to_text.directory.command.faq.a2')
      },
      {
        q: t('io.web.text_to_text.directory.command.faq.q3', {source: in_, target: out}),
        a: t('io.web.text_to_text.directory.command.faq.a3')
      },
    ]
  }
}

const seoContent = computed(() => generateSeoContent());

useSeoMeta({
  title: () => t('io.web.text_to_text.directory.command.seo.title', {
    source: directoryLast.toUpperCase(),
    target: commandKey.toUpperCase()
  }),
  description: () => t('io.web.text_to_text.directory.command.seo.description', {
    source: directoryLast.toUpperCase(),
    target: commandKey.toUpperCase()
  }),
  ogTitle: () => t('io.web.text_to_text.directory.command.seo.title', {
    source: directoryLast.toUpperCase(),
    target: commandKey.toUpperCase()
  }),
  ogDescription: () => t('io.web.text_to_text.directory.command.seo.description', {
    source: directoryLast.toUpperCase(),
    target: commandKey.toUpperCase()
  }),
  robots: 'index, follow'
});

// --- PROCESSING LOGIC ---
const inputText = ref<string>('');
const outputText = ref<string>('');
const loading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

let debouncer = new Debounce();

watch(inputText, () => {
  const command = commands.find(c => c.directoryPath.join('/') === directoryPath.join('/') && c.commandKey === commandKey)!;

  if (command.spec.performance.memoryDataSizeComplexityFn === 'O(n)') {
    debouncer.debounce(processTextData, 350)
  }
});

async function request() {
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

const processTextData = async () => {
  if (!inputText.value.trim()) return;

  loading.value = true;
  hasError.value = false;
  outputText.value = '';

  debouncer.debounce(request, 350)
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