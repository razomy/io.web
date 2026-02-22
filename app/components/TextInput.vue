<template>
  <v-card border="0" class="rounded-xl pa-4 pa-md-6 mb-8">
    <v-row>
      <v-col cols="12" md="6">
        <div class="d-flex align-center mb-2">
          <v-icon color="accent" icon="mdi-text-box-outline" class="mr-2" />
          <span class="text-subtitle-1">{{ t('io.web.text_to_text.input_text') }}</span>
        </div>
        <v-textarea
            v-model="inputText"
            :label="t('io.web.text_to_text.input_text')"
            variant="outlined"
            color="primary"
            :placeholder="t('io.web.text_to_text.placeholder_input')"
            rounded="xl"
            rows="8"
            :disabled="loading"
        ></v-textarea>
      </v-col>

      <v-col cols="12" md="6">
        <div class="d-flex align-center justify-space-between mb-2">
          <div class="d-flex align-center">
            <v-icon color="accent" icon="mdi-code-braces" class="mr-2" />
            <span class="text-subtitle-1">
              {{ t('io.web.text_to_text.result_title', { command: commandKey.toUpperCase() }) }}
            </span>
          </div>
          <v-btn
              size="small"
              density="compact"
              variant="text"
              color="primary"
              icon="mdi-content-copy"
              @click="copyToClipboard"
              :title="t('io.web.text_to_text.copy_to_clipboard')"
          />
        </div>
        <v-textarea
            v-model="outputText"
            variant="outlined"
            bg-color="lighten-4"
            :placeholder="t('io.web.text_to_text.placeholder_output')"
            rounded="xl"
            auto-grow
            rows="8"
            readonly
            :loading="loading"
        ></v-textarea>
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-6">
      <v-btn
          color="primary"
          size="large"
          variant="flat"
          prepend-icon="mdi-auto-fix"
          :loading="loading"
          @click="emit('convert')"
          class="px-8 rounded-pill"
      >
        {{ t('io.web.text_to_text.convert_btn', { command: commandKey.toUpperCase() }) }}
      </v-btn>
    </div>
  </v-card>

  <v-snackbar v-model="copied" color="success" location="bottom" timeout="2000">
    <v-icon start icon="mdi-check-circle"/>
    {{ t('io.web.text_to_text.copied_success') }}
  </v-snackbar>
</template>

<script setup lang="ts">
import type {IoDirectory} from '~~/razomy/io/command';
import {ref} from 'vue';
const {t} = useI18n();

const {
  loading,
  commandKey,
    ...props
} = defineProps<{
  loading: boolean,
  modelValue: string,
  outputText: string,
  commandKey: string,
}>();
const emit = defineEmits(['update:modelValue', 'convert'])

const inputText = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const outputText = computed({
  get: () => props.outputText,
  set: (val) => null
});

const copied = ref(false);
// Утилита для копирования результата
const copyToClipboard = async () => {
  if (!outputText.value) return;
  try {
    await navigator.clipboard.writeText(outputText.value);
    copied.value = true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}
</script>