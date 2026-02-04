<template>
  <v-container class="mt-16 mw-900">
    <!-- H1 и Интро (для SEO, но красиво) -->
    <div class="text-center mb-16">
      <h1 class="text-h3 font-weight-bold text-primary mb-4">{{ content.h1 }}</h1>
      <p class="text-h6 text-medium-emphasis font-weight-regular" style="max-width: 700px; margin: 0 auto;">
        {{ content.intro }}
      </p>
    </div>

    <!-- Как это работает (Шаги) -->
    <v-row class="mb-16">
      <v-col cols="12" md="4" v-for="(step, i) in content.steps" :key="i">
        <v-card class="h-100 py-6 px-4 text-center bg-transparent" elevation="0">
          <v-avatar color="primary" variant="tonal" size="64" class="mb-4">
            <v-icon :icon="step.icon" size="32" />
          </v-avatar>
          <h3 class="text-h6 font-weight-bold mb-2">{{ step.title }}</h3>
          <p class="text-body-2 text-medium-emphasis">{{ step.text }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- FAQ + Таблица -->
    <v-row>
      <v-col cols="12" md="7">
        <h2 class="text-h4 font-weight-bold mb-6">FAQ</h2>
        <v-expansion-panels variant="popout" class="mb-6">
          <v-expansion-panel
              v-for="(item, i) in content.faq"
              :key="i"
              :title="item.q"
              :text="item.a"
              elevation="1"
          />
        </v-expansion-panels>
      </v-col>

      <v-col cols="12" md="5">
        <h2 class="text-h4 font-weight-bold mb-6">Specs</h2>
        <v-table class="border rounded-lg">
          <thead>
          <tr>
            <th class="text-left bg-grey-lighten-4">Param</th>
            <th class="text-left bg-grey-lighten-4">Value</th>
          </tr>
          </thead>
          <tbody>
          <tr><td>Source</td><td>.{{ input.toUpperCase() }}</td></tr>
          <tr><td>Target</td><td>.{{ output.toUpperCase() }}</td></tr>
          <tr><td>Price</td><td class="text-success font-weight-bold">Free</td></tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineProps<{ content: any, input: string, output: string }>()
</script>

<style scoped>
.mw-900 { max-width: 1000px; margin-left: auto; margin-right: auto; }
</style>