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
          {{ t('group.input.output.seo.title', { input: input.toUpperCase(), output: output.toUpperCase() }).split('|')[0] }}
        </v-chip>

        <h1 class="text-h3 text-md-h2 font-weight-black mb-4 text-grey-darken-4">
          {{ input.toUpperCase() }} <span class="text-primary">to</span> {{ output.toUpperCase() }}
        </h1>

        <p class="text-medium-emphasis text-body-1 text-md-h6 mx-auto" style="max-width: 700px; line-height: 1.6;">
          {{ t('group.input.output.hero_sub', { s: input.toUpperCase(), t: output.toUpperCase() }) }}
        </p>

        <!-- UI Tweak: Trust Badges (Преимущества) -->
        <div class="d-flex justify-center gap-4 mt-6 flex-wrap">
          <div class="d-flex align-center px-3 py-1 text-caption text-grey-darken-2">
            <v-icon icon="mdi-shield-check" color="success" class="mr-2" size="small"/>
            {{ t('group.input.output.features.secure') }}
          </div>
          <div class="d-flex align-center px-3 py-1 text-caption text-grey-darken-2">
            <v-icon icon="mdi-flash" color="warning" class="mr-2" size="small"/>
            {{ t('group.input.output.features.fast') }}
          </div>
          <div class="d-flex align-center px-3 py-1 text-caption text-grey-darken-2">
            <v-icon icon="mdi-cloud" color="info" class="mr-2" size="small"/>
            {{ t('group.input.output.features.cloud') }}
          </div>
        </div>

      </v-container>
    </div>

    <!-- Main Content Area -->
    <v-container class="mt-n16 position-relative z-index-1">

      <!-- Карточка конвертера -->
      <rzm-modern-dropzone
          v-model="file"
          :accept="`.${input}`"
          :is-processing="loading"
          @convert="startConversion"
      />

      <!-- Ошибки -->
      <v-snackbar v-model="hasError" color="error" location="top" timeout="5000">
        <v-icon start icon="mdi-alert-circle" />
        {{ errorMsg }}
        <template v-slot:actions>
          <v-btn variant="text" @click="hasError = false">Close</v-btn>
        </template>
      </v-snackbar>

      <!-- SEO Контент -->
      <!-- Передаем больше данных для генерации богатого сниппета -->
      <SeoSection
          class="mt-16"
          :content="seoContent"
          :input="input"
          :output="output"
      />
    </v-container>

  </div>
</template>

<script setup lang="ts">
import SeoSection from '~/components/SeoSection.vue';
import { isValidConversion } from '~~/content/isValidConversion';

const { t } = useI18n();
const route = useRoute();

const input = (route.params.input as string).toLowerCase();
const output = (route.params.output as string).toLowerCase();

// --- SEO LOGIC ---
const generateSeoContent = () => {
  const s = input.toUpperCase();
  const tgt = output.toUpperCase();

  return {
    h1: t('group.input.output.seo.h1', { input: s, output: tgt }),
    intro_title: t('group.input.output.seo.intro_title', { input: s, output: tgt }),
    intro: t('group.input.output.seo.intro_text', { input: s, output: tgt }), // Более длинный текст
    steps: [
      {
        title: t('group.input.output.steps.upload', { input: s }),
        icon: 'mdi-cloud-upload-outline',
        text: t('group.input.output.steps.upload_desc', { s })
      },
      {
        title: t('group.input.output.steps.quality'),
        icon: 'mdi-cog-transfer-outline', // Иконка шестеренки
        text: t('group.input.output.steps.quality_desc')
      },
      {
        title: t('group.input.output.steps.download', { output: tgt }),
        icon: 'mdi-download-outline',
        text: t('group.input.output.steps.download_desc', { tgt })
      },
    ],
    faq: [
      { q: t('group.input.output.faq.q1', { s, t: tgt }), a: t('group.input.output.faq.a1') },
      { q: t('group.input.output.faq.q2', { s }), a: t('group.input.output.faq.a2') },
      { q: t('group.input.output.faq.q3', { s, t: tgt }), a: t('group.input.output.faq.a3') },
    ]
  }
}

const seoContent = computed(() => generateSeoContent());

// Meta tags for Google
useSeoMeta({
  title: () => t('group.input.output.seo.title', { input: input.toUpperCase(), output: output.toUpperCase() }),
  description: () => t('group.input.output.seo.description', { input: input.toUpperCase(), output: output.toUpperCase() }),
  ogTitle: () => t('group.input.output.seo.title', { input: input.toUpperCase(), output: output.toUpperCase() }),
  ogDescription: () => t('group.input.output.seo.description', { input: input.toUpperCase(), output: output.toUpperCase() }),
  robots: 'index, follow'
});

// --- CONVERSION LOGIC ---
const file = ref<File | null>(null);
const loading = ref(false);
const hasError = ref(false);
const errorMsg = ref('');

definePageMeta({
  validate: async (route) => {
    const i = (route.params.input as string).toLowerCase();
    const o = (route.params.output as string).toLowerCase();
    return isValidConversion(i, o);
  }
});

const CONVERTER_CONFIG = {
  maxSize: 100 * 1024 * 1024, // 100 MB
  endpoints: { convert: '/api/convert' }
}

const startConversion = async () => {
  if (!file.value) return;

  // Validation Check
  if (file.value.size > CONVERTER_CONFIG.maxSize) {
    errorMsg.value = `File is too large. Max size is ${CONVERTER_CONFIG.maxSize / 1024 / 1024}MB.`;
    hasError.value = true;
    return;
  }

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

    if (error.value) throw new Error(error.value.message || 'API Error');

    // Download Logic
    const blob = data.value as Blob;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Сохраняем имя файла если возможно, или генерируем новое
    const originalName = file.value.name.replace(/\.[^/.]+$/, "");
    link.setAttribute('download', `${originalName}.${output}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Очищаем после успеха (опционально)
    // file.value = null;

  } catch (e: any) {
    console.error(e);
    errorMsg.value = e.message || t('error.generic');
    hasError.value = true;
  } finally {
    loading.value = false;
  }
};
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