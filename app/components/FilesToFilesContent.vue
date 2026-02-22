<template>
  <div class="min-vh-100 pb-16">

    <SeoHeader :directoryLast="directoryLast" :commandKey="commandKey"></SeoHeader>

    <!-- Main Content Area -->
    <v-container class="position-relative z-index-1">

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
      <SeoSection
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
    h1: t('io.web.file_to_file.directory.command.seo.h1', {directory: in_, command: out}),
    intro_title: t('io.web.file_to_file.directory.command.seo.intro_title', {directory: in_, command: out}),
    intro: t('io.web.file_to_file.directory.command.seo.intro_text', {directory: in_, command: out}), // Более длинный текст
    steps: [
      {
        title: t('io.web.file_to_file.directory.command.steps.upload', {directory: in_}),
        icon: 'mdi-cloud-upload-outline',
        text: t('io.web.file_to_file.directory.command.steps.upload_desc', {s: in_})
      },
      {
        title: t('io.web.file_to_file.directory.command.steps.quality'),
        icon: 'mdi-cog-transfer-outline', // Иконка шестеренки
        text: t('io.web.file_to_file.directory.command.steps.quality_desc')
      },
      {
        title: t('io.web.file_to_file.directory.command.steps.download', {command: out}),
        icon: 'mdi-download-outline',
        text: t('io.web.file_to_file.directory.command.steps.download_desc', {tgt: out})
      },
    ],
    faq: [
      {
        q: t('io.web.file_to_file.directory.command.faq.q1', {s: in_, t: out}),
        a: t('io.web.file_to_file.directory.command.faq.a1')
      },
      {
        q: t('io.web.file_to_file.directory.command.faq.q2', {s: in_}),
        a: t('io.web.file_to_file.directory.command.faq.a2')
      },
      {
        q: t('io.web.file_to_file.directory.command.faq.q3', {s: in_, t: out}),
        a: t('io.web.file_to_file.directory.command.faq.a3')
      },
    ]
  }
}

const seoContent = computed(() => generateSeoContent());

// Meta tags for Google
useSeoMeta({
  title: () => t('io.web.file_to_file.directory.command.seo.title', {
    directory: directoryLast.toUpperCase(),
    command: commandKey.toUpperCase()
  }),
  description: () => t('io.web.file_to_file.directory.command.seo.description', {
    directory: directoryLast.toUpperCase(),
    command: commandKey.toUpperCase()
  }),
  ogTitle: () => t('io.web.file_to_file.directory.command.seo.title', {
    directory: directoryLast.toUpperCase(),
    command: commandKey.toUpperCase()
  }),
  ogDescription: () => t('io.web.file_to_file.directory.command.seo.description', {
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
        message: t('io.web.file_to_file.error',{fileName:file.name}),
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
.z-index-1 {
  z-index: 1;
}

.gap-4 {
  gap: 1rem;
}
</style>