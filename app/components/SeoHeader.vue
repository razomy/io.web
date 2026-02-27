<template>
  <!-- Hero Background -->
  <div class="pt-8 pb-20 px-4 text-center">
    <v-container>
        <h1 class="text-h4 text-md-h3 font-weight-black mb-4">
        {{ directoryLast.toUpperCase() }} <span class="text-accent">{{ t('io.web.file_to_file.to') }}</span> {{ commandKey.toUpperCase() }}
      </h1>

      <p class="text-body-2 text-md-body-1  text-medium-emphasis mx-auto" style="line-height: 1.6;">
        <slot></slot>
      </p>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import type {IoDirectory} from '~~/razomy/io/command';

const {t} = useI18n();

const {
  directoryLast,
  commandKey
} = defineProps<{
  directoryLast: string,
  commandKey: string,
}>()
</script>