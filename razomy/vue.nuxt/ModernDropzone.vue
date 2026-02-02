<template>
  <v-card
      class="mx-auto rounded-xl overflow-hidden"
      elevation="10"
      max-width="800"
      color="surface"
  >
    <!--
      ИСПРАВЛЕНИЕ:
      Используем :model-value вместо v-model, так как мы не меняем
      состояние isProcessing изнутри, мы только реагируем на него.
    -->
    <v-overlay
        :model-value="isProcessing"
        class="align-center justify-center"
        contained
        persistent
        opacity="0.9"
        z-index="5"
    >
      <div class="text-center">
        <v-progress-circular indeterminate color="primary" size="64" width="6" />
        <h3 class="text-h6 mt-4 font-weight-bold text-white">{{ $t('dropzone.converting') }}...</h3>
      </div>
    </v-overlay>

    <!-- Зона Drag & Drop -->
    <div
        class="dropzone-area position-relative d-flex flex-column align-center justify-center pa-10"
        :class="{ 'dragging': isDragging, 'has-file': !!modelValue }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
    >

      <!-- Сценарий 1: Файл не выбран -->
      <template v-if="!modelValue">
        <div class="bg-primary-lighten-5 rounded-circle pa-6 mb-4 transition-swing">
          <v-icon icon="mdi-cloud-upload-outline" size="48" color="primary" />
        </div>
        <h2 class="text-h5 font-weight-bold text-grey-darken-3">
          {{ $t('dropzone.drop_title') }}
        </h2>
        <p class="text-body-1 text-grey-darken-1 mt-2 mb-6">
          {{ $t('dropzone.drop_subtitle') }}
        </p>
        <v-btn
            color="primary"
            size="x-large"
            rounded="pill"
            elevation="4"
            prepend-icon="mdi-folder-open"
            @click="triggerInput"
        >
          {{ $t('dropzone.select_file') }}
        </v-btn>
      </template>

      <!-- Сценарий 2: Файл выбран -->
      <template v-else>
        <v-sheet class="w-100 border rounded-lg pa-4 d-flex align-center bg-grey-lighten-5">
          <v-avatar color="primary" icon="mdi-file-document-outline" size="50" class="mr-4" rounded />
          <div class="flex-grow-1 overflow-hidden">
            <h4 class="text-subtitle-1 font-weight-bold text-truncate">{{ modelValue.name }}</h4>
            <div class="text-caption text-medium-emphasis">
              {{ (modelValue.size / 1024 / 1024).toFixed(2) }} MB
            </div>
          </div>
          <v-btn icon="mdi-close" variant="text" color="error" @click.stop="clearFile" />
        </v-sheet>

        <div class="d-flex gap-4 mt-8 w-100">
          <v-btn
              block
              size="x-large"
              color="primary"
              rounded="xl"
              height="60"
              class="text-h6 font-weight-bold"
              @click="$emit('convert')"
          >
            {{ $t('dropzone.convert_now') }}
            <v-icon end icon="mdi-arrow-right" />
          </v-btn>
        </div>
      </template>

      <!-- Скрытый инпут -->
      <input ref="fileInput" type="file" class="d-none" :accept="accept" @change="onFileChange" />
    </div>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: File | null; accept: string; isProcessing: boolean }>()
const emit = defineEmits(['update:modelValue', 'convert'])

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerInput = () => fileInput.value?.click()

const handleFile = (file: File) => {
  isDragging.value = false
  emit('update:modelValue', file)
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.[0]) handleFile(target.files[0])
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files?.[0]) handleFile(e.dataTransfer.files[0])
}

const clearFile = () => {
  emit('update:modelValue', null)
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<style scoped>
.dropzone-area {
  min-height: 350px;
  border: 2px dashed rgba(var(--v-theme-primary), 0.2);
  transition: all 0.3s ease;
  background: white;
}
.dropzone-area.dragging {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgb(var(--v-theme-primary), 0.05);
  transform: scale(1.02);
}
.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
