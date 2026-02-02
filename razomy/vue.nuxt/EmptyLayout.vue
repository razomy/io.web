<template>
  <div>
    <Html :lang='head.htmlAttrs.lang' :dir='head.htmlAttrs.dir'>
    <Head>
      <Title>{{ title }}</Title>
      <template v-for='link in head.link' :key='link.id'>
        <Link :id='link.id' :rel='link.rel' :href='link.href' :hreflang='link.hreflang'/>
      </template>
      <template v-for='meta in head.meta' :key='meta.id'>
        <Meta :id='meta.id' :property='meta.property' :content='meta.content'/>
      </template>
    </Head>
    <Body>
    <v-layout class='flex-column'>
      <v-main>
        <slot/>
      </v-main>
    </v-layout>
    </Body>
    </Html>
  </div>
</template>
<script setup lang='ts'>
import {COOKIE_SESSION_LOCALE} from '~/models/COOKIE_SESSION_LOCALE';

const {locale} = useI18n();

const cookie_session_locale = useCookie(COOKIE_SESSION_LOCALE);
cookie_session_locale.value = cookie_session_locale.value || locale.value;

const route = useRoute();
const {t} = useI18n();
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
});
const title = computed(() => route.meta.title);

</script>
