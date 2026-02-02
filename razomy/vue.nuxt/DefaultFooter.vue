<template>
  <v-container class='my-12'>
    <v-footer class='rounded-xl py-6'>
      <v-row justify='center' no-gutters>
        <v-btn
          v-for='link in links'
          :to='localePath(link.url)'
          variant='text'
          class='mx-2'
          rounded='xl'
        >
          {{ t(link.text) }}
        </v-btn>
        <language-selector></language-selector>
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
const localePath = useLocalePath();
const { t } = useI18n();

const links = [
  { url: '/company/blog', text: 'footer.blog' },
  { url: '/company/about', text: 'footer.about' },
  { url: '/company/feedback', text: 'footer.feedback' },
  { url: '/company/contacts', text: 'footer.contacts' },
  { url: '/company', text: 'footer.company' },
  { url: '/company/licence', text: 'footer.licence' },
  { url: '/company/term-of-use', text: 'footer.term-of-use' },
  { url: '/company/privacy-policy', text: 'footer.privacy-policy' },
];
</script>
