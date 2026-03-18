<template>
  <div class="min-vh-100">
    <!-- Hero Header -->
    <v-container>
      <div class="content-1 mt-4 pt-8 pb-8 px-4 text-center">

        <v-avatar size="80" variant="flat" class="mb-6">
          <v-icon :icon="iconName" color="accent" size="40"/>
        </v-avatar>

        <h1 class="text-h3 font-weight-black mb-2">
          {{ t('io.web.input.title', {sourceTkp: directory1}) }}
        </h1>
        <p class="text-white-70 text-h6 font-weight-regular">
          {{ t('io.web.input.subtitle', {sourceTkp: directory1}) }}
        </p>
      </div>
    </v-container>

    <!-- Список доступных конвертаций -->
    <v-container class="position-relative z-index-1">
      <v-card class="rounded-xl pa-6" border="0">
        <h2 class="text-h5 font-weight-bold mb-6">
          {{ t('io.web.file_to_file.directory.available_conversions') }}
        </h2>

        <v-row>
          <v-col
              v-for="command in currentCommands"
              :key="command.id"
              cols="12"
              xs="2"
              lg="4"
          >
            <v-card
                :to="localePath(`/${directoryPath.join('/')}/${command.commandKey}`)"
                variant="outlined"
                class="d-flex align-center pa-4 hover-card"
                color="primary"
            >
              <v-icon icon="mdi-file-swap-outline" color="accent" start/>
              <span class="font-weight-bold text-body-1 text-high-emphasis">
                  {{ directory1 }}
                  <span class="text-medium-emphasis mx-1">to</span>
                  {{ command.commandKey }}
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
import {useCommandTreeStore} from "~/composables/useCommandTreeStore";
const {commands} = useCommandTreeStore();

const {t} = useI18n();
const localePath = useLocalePath();

const props = defineProps<{
  directoryPath: string[],
}>()

const directoryPath = props.directoryPath;
const directory1 = directoryPath[1]!;

const currentCommands = commands.filter(i => i.directoryPath.join('/') === directoryPath.join('/'));
const iconName = commands.find(i => i.directoryPath.join('/') === directoryPath.join('/'))!.meta.iconName;
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
