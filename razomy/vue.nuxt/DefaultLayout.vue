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
      <v-layout class='flex-column'>


        <!-- Сайдбар -->
        <AppSidebar v-model="drawer"/>

        <landing-header></landing-header>
        <!-- Верхняя панель -->
        <v-app-bar color="primary" elevation="0">
          <v-app-bar-nav-icon @click="drawer = !drawer" color="white"/>

          <v-toolbar-title class="font-weight-bold text-white cursor-pointer" @click="goHome">
            FileConverter
          </v-toolbar-title>

          <v-spacer/>

          <v-btn icon="mdi-github" color="white" href="#" target="_blank"/>
        </v-app-bar>

        <!-- Контент -->
        <v-main>
          <slot/>
        </v-main>


        <landing-footer></landing-footer>

      </v-layout>
    </v-app>
    </Body>
    </Html>
  </div>
</template>
<script setup lang='ts'>
import LandingFooter from './DefaultFooter.vue';
import LandingHeader from './DefaultHeader.vue';
// import {COOKIE_SESSION_LOCALE} from '~/models/COOKIE_SESSION_LOCALE';
import AppSidebar from './Sidebar.vue';

const {locale} = useI18n();

// const cookie_session_locale = useCookie(COOKIE_SESSION_LOCALE);
// cookie_session_locale.value = cookie_session_locale.value || locale.value;

const route = useRoute();
const {t} = useI18n();
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
});
const title = computed(() => route.meta.title);


const drawer = ref(true); // По умолчанию открыт на больших экранах
const localePath = useLocalePath();
const router = useRouter();

const goHome = () => router.push(localePath('/'));
</script>
