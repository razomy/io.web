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
          {{
            t('nuxt.file_to_file.directory.command.hero_sub', {
              s: directoryLast.toUpperCase(),
              t: commandKey.toUpperCase()
            })
          }}
        </p>

        <!-- UI Tweak: Trust Badges (Преимущества) -->
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
            <v-icon icon="mdi-cloud" color="info" class="mr-2" size="small"/>
            {{ t('nuxt.file_to_file.directory.command.features.cloud') }}
          </div>
        </div>

      </v-container>
    </div>

    <!-- Main Content Area -->
    <v-container class="mt-n16 position-relative z-index-1">

      <!-- Карточка конвертера -->
      <rzm-modern-dropzone
          v-model="files"
          :accept="`.${directoryLast}`"
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
          :directory="directoryLast"
          :command="commandKey"
      />
    </v-container>

  </div>
</template>

<script setup lang="ts">
import SeoSection from '~/components/SeoSection.vue';
import {sendFile} from '~/functions/sendFile';

const {t} = useI18n();
const props = defineProps<{
  directoryPath: string[],
  commandKey: string,
}>()

const directoryPath = props.directoryPath;
const directoryLast = directoryPath.at(-1)!;
const commandKey = props.commandKey;

// --- SEO LOGIC ---
const generateSeoContent = () => {
  const in_ = directoryLast.toUpperCase();
  const out = commandKey.toUpperCase();

  return {
    h1: t('nuxt.file_to_file.directory.command.seo.h1', {directory: in_, command: out}),
    intro_title: t('nuxt.file_to_file.directory.command.seo.intro_title', {directory: in_, command: out}),
    intro: t('nuxt.file_to_file.directory.command.seo.intro_text', {directory: in_, command: out}), // Более длинный текст
    steps: [
      {
        title: t('nuxt.file_to_file.directory.command.steps.upload', {directory: in_}),
        icon: 'mdi-cloud-upload-outline',
        text: t('nuxt.file_to_file.directory.command.steps.upload_desc', {s: in_})
      },
      {
        title: t('nuxt.file_to_file.directory.command.steps.quality'),
        icon: 'mdi-cog-transfer-outline', // Иконка шестеренки
        text: t('nuxt.file_to_file.directory.command.steps.quality_desc')
      },
      {
        title: t('nuxt.file_to_file.directory.command.steps.download', {command: out}),
        icon: 'mdi-download-outline',
        text: t('nuxt.file_to_file.directory.command.steps.download_desc', {tgt: out})
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

// Meta tags for Google
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

// --- CONVERSION LOGIC ---
const files = ref<File[]>([]);
const loading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');



const startConversion = async () => {
  if (!files.value || files.value.length === 0) return;

  loading.value = true;
  hasError.value = false;

  for (const file of files.value) {
    try {
      const result = await sendFile(directoryPath, commandKey, [file]);

      // Логика скачивания одного файла
      const blob = result as Blob;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Формируем имя. Если есть папки (webkitRelativePath), заменяем слеши на подчеркивания,
      // чтобы сохранить видимость структуры в имени файла, т.к. создать папки браузер не даст.
      const originalPath = file.webkitRelativePath || file.name;
      const nameWithoutExt = originalPath.replace(/\.[^/.]+$/, '');
      // Можно заменить слэши на подчеркивания, чтобы имя файла содержало путь: path_to_file.jpg
      const safeName = nameWithoutExt.split('/').join('_');

      link.setAttribute('download', `${safeName}.${commandKey}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
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