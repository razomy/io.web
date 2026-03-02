<template>
  <div class="min-vh-100 pb-16">

    <SeoHeader
        :sourceTkp="sourceTkp!"
        :targetTkp="targetTkp!">
      {{
        t('io.web.file_to_file.directory.command.hero_sub', {
          sourceTkp: sourceTkp,
          targetTkp: targetTkp
        })
      }}
    </SeoHeader>

    <!-- Main Content Area -->
    <v-container class="position-relative z-index-1">

      <!-- Карточка конвертера -->
      <rzm-modern-dropzone
          v-model="files"
          :accept="`.${directory!.directoryKey}`"
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
          :sourceTkp="sourceTkp!"
          :targetTkp="targetTkp!"
      />
    </v-container>

  </div>
</template>

<script setup lang="ts">
import SeoSection from '~/components/SeoSection.vue';
import {sendFile} from '~/functions/sendFile';
import type {SeoContent} from '~~/razomy/functions';
import {getCommandById, getDirectoryBy} from '~~/razomy/db';

const {t} = useI18n();
const props = defineProps<{
  commandId: string,
}>()


const command = computed(() => getCommandById(props.commandId));
const directory = computed(() => command.value && getDirectoryBy(command.value.directoryPath));
const sourceTkp = computed(() => directory.value &&  t(directory.value.meta.nameTk))!;
const targetTkp = computed(() => command.value &&  t(command.value.meta.nameTk))!;

// --- SEO LOGIC ---
const generateSeoContent = () => {
  return {
    h1: t('io.web.file_to_file.directory.command.seo.h1', {sourceTkp: sourceTkp.value, targetTkp: targetTkp.value}),
    intro_title: t('io.web.file_to_file.directory.command.seo.intro_title', {sourceTkp: sourceTkp.value, targetTkp: targetTkp.value}),
    intro: t('io.web.file_to_file.directory.command.seo.intro_text', {sourceTkp: sourceTkp.value, targetTkp: targetTkp.value}), // Более длинный текст
    steps: [
      {
        title: t('io.web.file_to_file.directory.command.steps.upload', {sourceTkp: sourceTkp.value}),
        icon: 'mdi-cloud-upload-outline',
        text: t('io.web.file_to_file.directory.command.steps.upload_desc', {sourceTkp: sourceTkp.value})
      },
      {
        title: t('io.web.file_to_file.directory.command.steps.quality'),
        icon: 'mdi-cog-transfer-outline', // Иконка шестеренки
        text: t('io.web.file_to_file.directory.command.steps.quality_desc')
      },
      {
        title: t('io.web.file_to_file.directory.command.steps.download', {targetTkp: targetTkp.value}),
        icon: 'mdi-download-outline',
        text: t('io.web.file_to_file.directory.command.steps.download_desc', {targetTkp: targetTkp.value})
      },
    ],
    faq: [
      {
        q: t('io.web.file_to_file.directory.command.faq.q1', {sourceTkp: sourceTkp.value, targetTkp: targetTkp.value}),
        a: t('io.web.file_to_file.directory.command.faq.a1')
      },
      {
        q: t('io.web.file_to_file.directory.command.faq.q2', {sourceTkp: sourceTkp.value}),
        a: t('io.web.file_to_file.directory.command.faq.a2')
      },
      {
        q: t('io.web.file_to_file.directory.command.faq.q3', {sourceTkp: sourceTkp, targetTkp: targetTkp.value}),
        a: t('io.web.file_to_file.directory.command.faq.a3')
      },
    ]
  } satisfies SeoContent;
}

const seoContent = computed(() => generateSeoContent());

// Meta tags for Google
useSeoMeta({
  title: () => t('io.web.file_to_file.directory.command.seo.title', {
    sourceTkp: sourceTkp.value,
    targetTkp: targetTkp.value
  }),
  description: () => t('io.web.file_to_file.directory.command.seo.description', {
    sourceTkp: sourceTkp.value,
    targetTkp: targetTkp.value
  }),
  ogTitle: () => t('io.web.file_to_file.directory.command.seo.title', {
    sourceTkp: sourceTkp.value,
    targetTkp: targetTkp.value
  }),
  ogDescription: () => t('io.web.file_to_file.directory.command.seo.description', {
    sourceTkp: sourceTkp.value,
    targetTkp: targetTkp.value
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
      const result = await sendFile(props.commandId, [file]);

      // Логика скачивания одного файла
      const blob = result as Blob;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const originalPath = file.webkitRelativePath || file.name;
      const nameWithoutExt = originalPath.replace(/\.[^/.]+$/, '');
      const safeName = nameWithoutExt.split('/').join('_');

      link.setAttribute('download', `${safeName}.${command.value!.commandKey}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      const error = {
        message: t('io.web.file_to_file.error', {fileName: file.name}),
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