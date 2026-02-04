<template>
  <div class="bg-surface-light min-vh-100 pb-16">

    <!-- Hero Background -->
    <div class="hero-bg bg-primary pt-16 pb-32 px-4 text-center">
      <v-container>
        <v-chip color="white" variant="outlined" class="mb-4">
          Online Converter
        </v-chip>
        <h1 class="text-h2 font-weight-black text-white mb-2">
          {{ input.toUpperCase() }} <span class="text-white-50">to</span> {{ output.toUpperCase() }}
        </h1>
        <p class="text-white-70 text-body-1">
          {{ t('group.input.output.hero_sub', { s: input.toUpperCase(), t: output.toUpperCase() }) }}
        </p>
      </v-container>
    </div>

    <!-- Main Content Area (Overlapping Hero) -->
    <v-container class="mt-n16 position-relative z-index-1">
      <ModernDropzone
          v-model="file"
          :accept="`.${input}`"
          :is-processing="loading"
          @convert="startConversion"
      />

      <!-- Ошибки -->
      <v-snackbar v-model="hasError" color="error" location="top">
        {{ errorMsg }}
        <template v-slot:actions>
          <v-btn variant="text" @click="hasError = false">Close</v-btn>
        </template>
      </v-snackbar>

      <!-- SEO Контент -->
      <SeoSection :content="seoData" :input="input" :output="output" />
    </v-container>

  </div>
</template>

<script setup lang="ts">
import ModernDropzone from '~~/razomy/vue.nuxt/ModernDropzone.vue';
import SeoSection from '~~/razomy/vue.nuxt/SeoSection.vue';
import { isValidConversion } from '~~/content/isValidConversion';
import Breadcrumbs from '~~/razomy/vue.nuxt/Breadcrumbs.vue';

const { t } = useI18n();
const route = useRoute();

const input = (route.params.input as string).toLowerCase();
const output = (route.params.output as string).toLowerCase();

const generateSeoContent = (t: any, input: string, output: string) => {
  const s = input.toUpperCase();
  const tgt = output.toUpperCase();

  return {
    h1: t('group.input.output.seo.h1', {input: s, output: tgt}),
    intro: t('group.input.output.seo.intro', {input: s, output: tgt}),
    steps: [
      {
        title: t('group.input.output.steps.upload'),
        icon: 'mdi-cloud-upload',
        text: t('group.input.output.steps.upload_desc', {s})
      },
      {title: t('group.input.output.steps.quality'), icon: 'mdi-tune', text: t('group.input.output.steps.quality_desc')},
      {
        title: t('group.input.output.steps.download'),
        icon: 'mdi-download',
        text: t('group.input.output.steps.download_desc', {tgt})
      },
    ],
    faq: [
      {q: t('group.input.output.faq.q1', {s}), a: t('group.input.output.faq.a1')},
      {q: t('group.input.output.faq.q2'), a: t('group.input.output.faq.a2')},
      {q: t('group.input.output.faq.q3'), a: t('group.input.output.faq.a3')},
    ]
  }
}

// SEO Meta
const seoData = computed(() => generateSeoContent(t, input, output));
useSeoMeta({
  title: seoData.value.h1,
  description: seoData.value.intro
});

// Logic
const file = ref<File | null>(null);
const loading = ref(false);
const hasError = ref(false);
const errorMsg = ref('');

definePageMeta({
  validate: async (route) => {
    const input = (route.params.input as string).toLowerCase();
    const output = (route.params.output as string).toLowerCase();

    // Валидация типов
    return isValidConversion(input, output);
  }
});
// utils/converter.constants.ts
 const CONVERTER_CONFIG = {
  maxSize: 100 * 1024 * 1024, // 100 MB
  endpoints: {
    convert: '/api/convert'
  }
}
const startConversion = async () => {
  if (!file.value) return;

  loading.value = true;
  hasError.value = false;

  const formData = new FormData();
  formData.append('file', file.value);
  formData.append('from', input);
  formData.append('to', output);

  try {
    const { data, error } = await useFetch(CONVERTER_CONFIG.endpoints.convert, {
      method: 'POST',
      body: formData,
      responseType: 'blob'
    });

    if (error.value) throw new Error('Conversion API Error');

    // Скачивание
    const url = window.URL.createObjectURL(data.value as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `converted.${output}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (e) {
    console.error(e);
    errorMsg.value = t('error.generic');
    hasError.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.hero-bg {
  /* Градиентный фон */
  background: rgb(var(--v-theme-primary));
  padding-bottom: 120px; /* Место под нахлест карточки */
}
.z-index-1 { z-index: 1; }
.text-white-70 { color: rgba(255,255,255, 0.7); }
.text-white-50 { color: rgba(255,255,255, 0.5); }
</style>
