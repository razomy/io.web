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
            t('ui.file_to_file.input.output.seo.title', {input: input1.toUpperCase(), output: output.toUpperCase()}).split('|')[0]
          }}
        </v-chip>

        <h1 class="text-h3 text-md-h2 font-weight-black mb-4 text-grey-darken-4">
          {{ input1.toUpperCase() }} <span class="text-primary">to</span> {{ output.toUpperCase() }}
        </h1>

        <p class="text-medium-emphasis text-body-1 text-md-h6 mx-auto" style="max-width: 700px; line-height: 1.6;">
          {{ t('ui.file_to_file.input.output.hero_sub', {s: input1.toUpperCase(), t: output.toUpperCase()}) }}
        </p>

        <!-- UI Tweak: Trust Badges (Преимущества) -->
        <div class="d-flex justify-center gap-4 mt-6 flex-wrap">
          <div class="d-flex align-center px-3 py-1 text-caption text-grey-darken-2">
            <v-icon icon="mdi-shield-check" color="success" class="mr-2" size="small"/>
            {{ t('ui.file_to_file.input.output.features.secure') }}
          </div>
          <div class="d-flex align-center px-3 py-1 text-caption text-grey-darken-2">
            <v-icon icon="mdi-flash" color="warning" class="mr-2" size="small"/>
            {{ t('ui.file_to_file.input.output.features.fast') }}
          </div>
          <div class="d-flex align-center px-3 py-1 text-caption text-grey-darken-2">
            <v-icon icon="mdi-cloud" color="info" class="mr-2" size="small"/>
            {{ t('ui.file_to_file.input.output.features.cloud') }}
          </div>
        </div>

      </v-container>
    </div>

    <!-- Main Content Area -->
    <v-container class="mt-n16 position-relative z-index-1">

      <!-- Карточка конвертера -->
      <rzm-modern-dropzone
          v-model="files"
          :accept="`.${input1}`"
          :is-processing="loading"
          @convert="startConversion"
      />

      <!-- Ошибки -->
      <v-snackbar v-model="hasError" color="error" location="top" timeout="5000">
        <v-icon start icon="mdi-alert-circle"/>
        {{ errorMessage }}
        <template v-slot:actions>
          <v-btn variant="text" @click="hasError = false">Close</v-btn>
        </template>
      </v-snackbar>

      <!-- SEO Контент -->
      <!-- Передаем больше данных для генерации богатого сниппета -->
      <SeoSection
          class="mt-16"
          :content="seoContent"
          :input="input1"
          :output="output"
      />
    </v-container>

  </div>
</template>

<script setup lang="ts">
import SeoSection from '~/components/SeoSection.vue';
import {sendFile} from '~/functions/sendFile';

const {t} = useI18n();
const props = defineProps<{
  inputs: string[],
  output: string,
}>()

const inputs = props.inputs;
const input1 = inputs[1]!;
const input0 = inputs[0]!;
const output = props.output;

// --- SEO LOGIC ---
const generateSeoContent = () => {
  const in_ = input1.toUpperCase();
  const out = output.toUpperCase();

  return {
    h1: t('ui.file_to_file.input.output.seo.h1', {input: in_, output: out}),
    intro_title: t('ui.file_to_file.input.output.seo.intro_title', {input: in_, output: out}),
    intro: t('ui.file_to_file.input.output.seo.intro_text', {input: in_, output: out}), // Более длинный текст
    steps: [
      {
        title: t('ui.file_to_file.input.output.steps.upload', {input: in_}),
        icon: 'mdi-cloud-upload-outline',
        text: t('ui.file_to_file.input.output.steps.upload_desc', {s: in_})
      },
      {
        title: t('ui.file_to_file.input.output.steps.quality'),
        icon: 'mdi-cog-transfer-outline', // Иконка шестеренки
        text: t('ui.file_to_file.input.output.steps.quality_desc')
      },
      {
        title: t('ui.file_to_file.input.output.steps.download', {output: out}),
        icon: 'mdi-download-outline',
        text: t('ui.file_to_file.input.output.steps.download_desc', {tgt: out})
      },
    ],
    faq: [
      {q: t('ui.file_to_file.input.output.faq.q1', {s: in_, t: out}), a: t('ui.file_to_file.input.output.faq.a1')},
      {q: t('ui.file_to_file.input.output.faq.q2', {s: in_}), a: t('ui.file_to_file.input.output.faq.a2')},
      {q: t('ui.file_to_file.input.output.faq.q3', {s: in_, t: out}), a: t('ui.file_to_file.input.output.faq.a3')},
    ]
  }
}

const seoContent = computed(() => generateSeoContent());

// Meta tags for Google
useSeoMeta({
  title: () => t('ui.file_to_file.input.output.seo.title', {input: input1.toUpperCase(), output: output.toUpperCase()}),
  description: () => t('ui.file_to_file.input.output.seo.description', {
    input: input1.toUpperCase(),
    output: output.toUpperCase()
  }),
  ogTitle: () => t('ui.file_to_file.input.output.seo.title', {input: input1.toUpperCase(), output: output.toUpperCase()}),
  ogDescription: () => t('ui.file_to_file.input.output.seo.description', {
    input: input1.toUpperCase(),
    output: output.toUpperCase()
  }),
  robots: 'index, follow'
});

// --- CONVERSION LOGIC ---
const files = ref<File[]>([]);
const loading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

const CONVERTER_CONFIG = {
  endpoints: {convert: `/api/${input0}`}
}

const startConversion = async () => {
  if (!files.value || files.value.length === 0) return;

  loading.value = true;
  hasError.value = false;

  for (const file of files.value) {
    try {
      await sendFile(file, input1, output, CONVERTER_CONFIG.endpoints.convert);
    } catch (e: any) {
      const error = {
        message: `Error converting ${file.name}:`,
        error: e
      }
      console.error(error.message);
      hasError.value = true;
      errorMessage.value = e.message + e.error;
    }
  }
  loading.value = false;
}
</script>

<style scoped>
.hero-bg {
  /* Легкий паттерн на фоне для профессионального вида */
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