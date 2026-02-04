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
    <v-app>
      <!-- Сайдбар -->
      <AppSidebar v-model="drawer"/>

      <!--        <landing-header>-->
      <!--          <v-app-bar-nav-icon @click="drawer = !drawer"/>-->
      <!--        </landing-header>-->

      <v-main>
        <Breadcrumbs>
          <v-app-bar-nav-icon @click="drawer = !drawer"/>
        </Breadcrumbs>
        <!-- Контент -->
        <slot/>
        <LandingFooter></LandingFooter>
      </v-main>

    </v-app>
    </Body>
    </Html>
  </div>
</template>
<script setup lang='ts'>
import LandingFooter from './DefaultFooter.vue';
import AppSidebar from './Sidebar.vue';
import {c} from '~~/content/context';
import Breadcrumbs from '~~/razomy/vue.nuxt/Breadcrumbs.vue';

const {locale} = useI18n();
const route = useRoute();
const {t} = useI18n();

const drawer = ref(true); // По умолчанию открыт на больших экранах
const cookie_session_locale = useCookie(c.cookie.session.locale);
cookie_session_locale.value = cookie_session_locale.value || locale.value;

const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
});

const title = computed(() => route.meta.title);

</script>
