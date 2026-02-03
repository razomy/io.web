<template>
  <v-container class='my-12'>
    <v-footer class='rounded-xl py-6'>
      <v-row justify='center' no-gutters>
        <v-btn
          v-for='link in c.footerLinks'
          :to='localePath(link.url)'
          variant='text'
          class='mx-2'
          rounded='xl'
        >
          {{ t(link.text) }}
        </v-btn>
        <LanguageSelector></LanguageSelector>
        <v-btn href="https://donate.stripe.com/28o9CS6Px6QwaQMbIN"
               append-icon="mdi-heart-outline"
               class='mx-2'
               rounded="xl"
               color="pink"
               variant="outlined">
          {{t('footer.donate')}}
        </v-btn>

        <v-col class='text-center' cols='12'>
          2023-{{ new Date().getFullYear() }} — <span>{{ t('footer.company-name') }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>
<script lang='ts' setup>
import {c} from '~~/content/context';
import LanguageSelector from '~~/razomy/vue.nuxt/LanguageSelector.vue';

const localePath = useLocalePath();
const { t } = useI18n();

</script>
