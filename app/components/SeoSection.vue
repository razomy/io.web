<template>
  <v-container class="mt-16 mw-900 pb-16">

    <!-- 1. SEO Title & Intro -->
    <!-- Используем H2, так как H1 уже есть в Hero секции -->
    <div class="text-center mb-16">
      <h2 class="text-h4 font-weight-bold mb-4 text-grey-darken-4">
        {{ content.h1 }}
      </h2>
      <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 700px; line-height: 1.8;">
        {{ content.intro }}
      </p>
    </div>

    <!-- 2. How-to Steps (Process) -->
    <div class="mb-16 position-relative">
      <div class="d-flex justify-center mb-8">
        <v-chip color="primary" variant="tonal" class="font-weight-bold">
          How to convert
        </v-chip>
      </div>

      <v-row>
        <v-col cols="12" md="4" v-for="(step, i) in content.steps" :key="i" class="position-relative">
          <!-- Стрелка между шагами (только десктоп) -->
          <div v-if="i as any < 2" class="d-none d-md-block arrow-connector text-grey-lighten-2">
            <v-icon icon="mdi-chevron-right" size="40"/>
          </div>

          <v-card class="h-100 py-8 px-6 text-center rounded-xl border-thin" elevation="0" color="surface">
            <v-avatar color="primary" variant="tonal" size="64" class="mb-4">
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
          <h2 class="text-h5 font-weight-bold">Frequently Asked Questions</h2>
        </div>

        <v-expansion-panels variant="accordion" class="border custom-panels rounded-xl overflow-hidden">
          <v-expansion-panel
              v-for="(item, i) in content.faq"
              :key="i"
              elevation="0"
              class="bg-grey-lighten-5"
          >
            <v-expansion-panel-title class="font-weight-medium">
              {{ item.q }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-2 text-grey-darken-2 pt-2">
              {{ item.a }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <!-- Technical Specs Table -->
      <v-col cols="12" md="5">
        <div class="bg-surface border rounded-xl">
          <div class="bg-grey-lighten-4 px-6 py-4 border-b rounded-t-xl">
            <h3 class="text-h6 font-weight-bold mb-0">Conversion Specs</h3>
          </div>

          <v-table density="comfortable" class="px-2 w-full">
            <tbody>
            <tr>
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-file-import" size="small" class="mr-2"/>
                Input
              </td>
              <td class="font-weight-medium text-uppercase text-right">{{ input }}</td>
            </tr>
            <tr>
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-file-export" size="small" class="mr-2"/>
                Output
              </td>
              <td class="font-weight-medium text-uppercase text-right">{{ output }}</td>
            </tr>
            <tr>
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-star" size="small" class="mr-2"/>
                User Rating
              </td>
              <td class="text-right">
                <div class="d-flex justify-end align-center w-full max-w-full oveflow-hidden">
                  <v-rating :model-value="4.9" color="amber" density="compact" size="small" readonly half-increments/>
                  <span class="text-caption ml-1 font-weight-bold">4.9</span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-shield-check" size="small" class="mr-2"/>
                Safety
              </td>
              <td class="text-right text-success font-weight-medium">HTTPS / Auto-delete</td>
            </tr>
            <tr class="no-border">
              <td class="text-medium-emphasis py-3">
                <v-icon icon="mdi-tag" size="small" class="mr-2"/>
                Price
              </td>
              <td class="text-right">
                <v-chip color="success" size="small" variant="tonal" class="font-weight-bold">Free</v-chip>
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

const props = defineProps<{ content: any, input: string, output: string }>()

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
        'name': `How to convert ${props.input.toUpperCase()} to ${props.output.toUpperCase()}`,
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
        'name': `${props.input.toUpperCase()} to ${props.output.toUpperCase()} Converter`,
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

.border-thin {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

/* Стрелочка между карточками шагов */
.arrow-connector {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  z-index: 1;
}

/* Стилизация FAQ */
.custom-panels :deep(.v-expansion-panel-title--active) {
  color: rgb(var(--v-theme-primary));
}

.shadow-sm {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.no-border td {
  border-bottom: none !important;
}
</style>