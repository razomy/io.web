<template>
  <div class="bg-surface-light min-vh-100">
    <!-- Hero Header -->
    <div class="bg-surface pt-8 pb-8 px-4 text-center">
      <v-container max-width="900">

        <v-avatar size="80" variant="flat" class="mb-6 global-soft-card">
          <v-icon :icon="icon" color="primary" size="40"/>
        </v-avatar>

        <h1 class="text-h3 font-weight-black mb-2">
          {{ t('ui.file_to_file.input.title', {input: input1.toUpperCase()}) }}
        </h1>
        <p class="text-white-70 text-h6 font-weight-regular">
          {{ t('ui.file_to_file.input.subtitle', {input: input1.toUpperCase()}) }}
        </p>
      </v-container>
    </div>

    <!-- Список доступных конвертаций -->
    <v-container class="position-relative z-index-1" max-width="1000">
      <v-card class="rounded-xl pa-6 global-soft-card">
        <h2 class="text-h5 font-weight-bold mb-6">
          {{ t('ui.file_to_file.input.available_conversions') }}
        </h2>

        <v-row>
          <v-col
              v-for="output in outputs"
              :key="output.output"
              cols="12"
              xs="2"
              lg="4"
          >
            <v-card
                :to="localePath(`/${inputs.join('/')}/${output.output}`)"
                variant="outlined"
                class="d-flex align-center pa-4 hover-card"
                color="primary"
            >
              <v-icon icon="mdi-file-swap-outline" start/>
              <span class="font-weight-bold text-body-1 text-high-emphasis">
                  {{ input1.toUpperCase() }}
                  <span class="text-medium-emphasis mx-1">to</span>
                  {{ output.output.toUpperCase() }}
                </span>
              <v-spacer/>
              <v-icon icon="mdi-chevron-right" color="grey"/>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import {outputRecords} from '~~/content/outputRecords';

const {t} = useI18n();
const localePath = useLocalePath();

const props = defineProps<{
  inputs: string[],
}>()

const inputs = props.inputs;
const input1 = inputs[1]!;

const outputs = outputRecords.filter(i => i.inputs.join('/') === inputs.join('/'));
const icon = outputRecords.find(i => i.inputs.join('/') === inputs.join('/'))!.iconName;
</script>

<style scoped>
.hover-card {
  transition: background 0.2s;
  border-color: rgba(var(--v-theme-primary), 0.2);
}

.hover-card:hover {
  background: rgba(var(--v-theme-primary), 0.05);
  border-color: rgb(var(--v-theme-primary));
}

.text-white-70 {
  color: rgba(255, 255, 255, 0.7);
}
</style>
