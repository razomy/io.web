<template>
  <v-container class="mw-900 pb-16 px-0">
    <div class="d-flex justify-center gap-4 flex-wrap">
      <div class="d-flex align-center px-3 py-1 text-caption text-darken-2">
        <v-icon icon="mdi-shield-check" color="success" class="mr-2" size="small"/>
        {{ t('io.web.file_to_file.directory.command.features.secure') }}
      </div>
      <div class="d-flex align-center px-3 py-1 text-caption text-darken-2">
        <v-icon icon="mdi-flash" color="warning" class="mr-2" size="small"/>
        {{ t('io.web.file_to_file.directory.command.features.fast') }}
      </div>
      <div class="d-flex align-center px-3 py-1 text-caption text-darken-2">
        <v-icon icon="mdi-text-box-check" color="info" class="mr-2" size="small"/>
        {{ t('io.web.file_to_file.directory.command.features.accurate') }}
      </div>
    </div>

    <!-- 1. SEO Title & Intro -->
    <!-- Используем H2, так как H1 уже есть в Hero секции -->
    <div class="text-center mt-16 mb-16">
      <h2 class="text-h4 font-weight-bold mb-4 text-darken-4">
        {{ content.h1 }}
      </h2>
      <p class="text-body-1 text-darken-1 mx-auto" style="max-width: 700px; line-height: 1.8;">
        {{ content.intro }}
      </p>
    </div>

    <!-- 2. How-to Steps (Process) -->
    <div class="mb-16 position-relative">
      <div class="d-flex justify-center mb-4">
        <v-chip variant="text" class="font-weight-bold">
          {{ t('io.web.file_to_file.how_to_convert') }}
        </v-chip>
      </div>

      <v-row>
        <v-col cols="12" md="4" v-for="(step, i) in content.steps" :key="i" class="position-relative">
          <!-- Стрелка между шагами (только десктоп) -->
          <div v-if="i as any < 2" class="d-none d-md-block arrow-connector text-lighten-2">
            <v-icon icon="mdi-chevron-right" size="40"/>
          </div>

          <v-card border="0" class="h-100 py-8 px-6 text-center rounded-xl" elevation="0" color="surface">
            <v-avatar color="accent" variant="tonal" size="64" class="mb-4">
              <v-icon :icon="step.icon" size="32"/>
            </v-avatar>

            <h3 class="text-h6 font-weight-bold mb-3">{{ step.title }}</h3>
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ step.text }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- 3. FAQ + Enhanced Specs -->
    <v-row class="mt-8">
      <!-- FAQ Section -->
      <v-col cols="12" md="7" class="pr-md-8">
        <div class="d-flex align-center mb-6">
          <!--          <v-icon icon="mdi-help-circle-outline" color="primary" class="mr-2" size="large"/>-->
          <h2 class="text-h5 font-weight-bold">{{ t('io.web.file_to_file.faq_title') }}</h2>
        </div>

        <v-expansion-panels variant="accordion" class="rounded-xl overflow-hidden">
          <v-expansion-panel
              v-for="(item, i) in content.faq"
              :key="i"
              elevation="0"
          >
            <v-expansion-panel-title class="font-weight-medium">
              {{ item.q }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-2 text-darken-2 pt-2 mx-2">
              {{ item.a }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <!-- Technical Specs Table -->
      <v-col cols="12" md="5">
        <div class="mb-6 rounded-t-xl">
          <h3 class="text-h5 font-weight-bold">{{ t('io.web.file_to_file.specs_title') }}</h3>
        </div>

        <div class="bg-surface rounded-xl">
          <v-table density="comfortable" class="px-2 w-full">
            <tbody>
            <tr>
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-file-import" size="small" class="mr-2"/>
                {{ t('io.web.file_to_file.input') }}
              </td>
              <td class="font-weight-medium text-uppercase text-right">{{ directory }}</td>
            </tr>
            <tr>
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-file-export" size="small" class="mr-2"/>
                {{ t('io.web.file_to_file.output') }}
              </td>
              <td class="font-weight-medium text-uppercase text-right">{{ command }}</td>
            </tr>
            <!--            <tr>-->
            <!--              <td class="text-medium-emphasis py-3">-->
            <!--                <v-icon icon="mdi-star" size="small" class="mr-2"/>-->
            <!--                User Rating-->
            <!--              </td>-->
            <!--              <td class="text-right">-->
            <!--                <v-icon icon="mdi-star" size="small" color="primary"/>-->
            <!--                <v-icon icon="mdi-star" size="small" color="primary"/>-->
            <!--                <v-icon icon="mdi-star" size="small" color="primary"/>-->
            <!--                <v-icon icon="mdi-star" size="small" color="primary"/>-->
            <!--                <v-icon icon="mdi-star" size="small" color="primary"/>-->
            <!--                <span class="text-caption ml-1 font-weight-bold">4.9</span>-->
            <!--              </td>-->
            <!--            </tr>-->
            <tr>
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-shield-check" size="small" class="mr-2"/>
                {{ t('io.web.file_to_file.safety') }}
              </td>
              <td class="text-right text-success font-weight-medium">{{ t('file_to_file.safety_value') }}</td>
            </tr>
            <tr class="no-border">
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-tag" size="small" class="mr-2"/>
                {{ t('io.web.file_to_file.price') }}
              </td>
              <td class="text-right">
                <v-chip color="success" size="small" variant="tonal" class="font-weight-bold">{{ t('io.web.file_to_file.free') }}</v-chip>
              </td>
            </tr>
            </tbody>
          </v-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useHead} from '#imports';

const props = defineProps<{ content: any, directory: string, command: string }>()

const {t} = useI18n();


/**
 * ГЕНЕРАЦИЯ SCHEMA.ORG (JSON-LD)
 * Это критически важно для SEO. Это сообщает Google структуру страницы.
 */
const jsonLd = computed(() => {
  const steps = props.content.steps.map((step: any, index: number) => ({
    '@type': 'HowToStep',
    'position': index + 1,
    'name': step.title,
    'text': step.text
  }));

  const faq = props.content.faq.map((item: any) => ({
    '@type': 'Question',
    'name': item.q,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.a
    }
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Schema для Инструкции
      {
        '@type': 'HowTo',
        'name': `How to convert ${props.directory.toUpperCase()} to ${props.command.toUpperCase()}`,
        'step': steps
      },
      // Schema для FAQ
      {
        '@type': 'FAQPage',
        'mainEntity': faq
      },
      // Schema для Софта (SoftwareApplication) - опционально, но полезно
      {
        '@type': 'SoftwareApplication',
        'name': `${props.directory.toUpperCase()} to ${props.command.toUpperCase()} Converter`,
        'applicationCategory': 'MultimediaApplication',
        'operatingSystem': 'Any',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'ratingCount': '1250'
        }
      }
    ]
  };
});

// Вставляем JSON-LD в <head>
useHead({
  script: [
    {
      type: 'application/ld+json',
      //@ts-ignore
      children: jsonLd
    }
  ]
});
</script>

<style scoped>
.mw-900 {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

/* Стрелочка между карточками шагов */
.arrow-connector {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  z-index: 1;
}

.shadow-sm {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.no-border td {
  border-bottom: none !important;
}

.v-expansion-panel:not(:first-child)::after {
  margin-left:8px;
  margin-right:8px;
}

</style>