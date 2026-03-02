<template>
  <div class="min-vh-100 pb-16">


    <SeoHeader :sourceTkp="sourceTkp!"
               :targetTkp="targetTkp!">
      {{
        t('io.web.text_to_text.directory.command.hero_sub', {
          sourceTkp: sourceTkp,
          targetTkp: targetTkp
        })
      }}
    </SeoHeader>

    <!-- Main Content Area -->
    <v-container class="position-relative z-index-1">

      <TextInput
          :loading="loading"
          v-model="inputText"
          :outputText="outputText"
          :targetTkp="commandKey"
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
          :sourceTkp="sourceTkp!"
          :targetTkp="targetTkp!"
      />
      <v-container class="pb-16 px-0">
        <CodeBlock
            :directoryPath="directoryPath"
            :commandId="props.commandId"
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
import {Debounce, type SeoContent} from '~~/razomy/functions';
import {commands, getCommandById, getDirectoryBy} from '~~/razomy/db';

const {t} = useI18n();
const props = defineProps<{
  commandId: string,
}>()

const command = computed(() => getCommandById(props.commandId));
const directory = computed(() => command.value && getDirectoryBy(command.value.directoryPath));
const sourceTkp = computed(() => directory.value && t(directory.value.meta.nameTk));
const targetTkp = computed(() => command.value && t(command.value.meta.nameTk));

const directoryPath = computed(() => directory.value!.directoryPath);
const directoryLast = computed(() => directoryPath.value!.at(-1)!);
const commandKey = computed(() => command.value!.commandKey); // Название применяемой функции

// --- SEO LOGIC ---
const generateSeoContent = () => {
  const in_ = sourceTkp.value;
  const out = targetTkp.value;

  return {
    h1: t('io.web.text_to_text.directory.command.seo.h1', {sourceTkp: in_, targetTkp: out}),
    intro_title: t('io.web.text_to_text.directory.command.seo.intro_title', {sourceTkp: in_, targetTkp: out}),
    intro: t('io.web.text_to_text.directory.command.seo.intro_text', {sourceTkp: in_, targetTkp: out}),
    steps: [
      {
        title: t('io.web.text_to_text.directory.command.steps.paste', {sourceTkp: in_}),
        icon: 'mdi-clipboard-text-outline',
        text: t('io.web.text_to_text.directory.command.steps.paste_desc', {sourceTkp: in_})
      },
      {
        title: t('io.web.text_to_text.directory.command.steps.process', {targetTkp: out}),
        icon: 'mdi-cog-transfer-outline',
        text: t('io.web.text_to_text.directory.command.steps.process_desc', {targetTkp: out})
      },
      {
        title: t('io.web.text_to_text.directory.command.steps.copy', {targetTkp: out}),
        icon: 'mdi-content-copy',
        text: t('io.web.text_to_text.directory.command.steps.copy_desc', {targetTkp: out})
      },
    ],
    faq: [
      {
        q: t('io.web.text_to_text.directory.command.faq.q1', {sourceTkp: in_, targetTkp: out}),
        a: t('io.web.text_to_text.directory.command.faq.a1')
      },
      {
        q: t('io.web.text_to_text.directory.command.faq.q2', {sourceTkp: in_}),
        a: t('io.web.text_to_text.directory.command.faq.a2')
      },
      {
        q: t('io.web.text_to_text.directory.command.faq.q3', {sourceTkp: in_, targetTkp: out}),
        a: t('io.web.text_to_text.directory.command.faq.a3')
      },
    ]
  } satisfies SeoContent;
}

const seoContent = computed(() => generateSeoContent());

useSeoMeta({
  title: () => t('io.web.text_to_text.directory.command.seo.title', {
    sourceTkp: sourceTkp.value,
    targetTkp: targetTkp.value
  }),
  description: () => t('io.web.text_to_text.directory.command.seo.description', {
    sourceTkp: sourceTkp.value,
    targetTkp: targetTkp.value
  }),
  ogTitle: () => t('io.web.text_to_text.directory.command.seo.title', {
    sourceTkp: sourceTkp.value,
    targetTkp: targetTkp.value
  }),
  ogDescription: () => t('io.web.text_to_text.directory.command.seo.description', {
    sourceTkp: sourceTkp.value,
    targetTkp: targetTkp.value
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
  if (command.value!.spec.performance.memoryDataSizeComplexityFn === 'O(n)') {
    debouncer.debounce(processTextData, 350)
  }
});

async function request() {
  try {
    // Отправляем текст на бэкенд для обработки конкретной функцией
    const result = await processText(
        directoryPath.value,
        commandKey.value,
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