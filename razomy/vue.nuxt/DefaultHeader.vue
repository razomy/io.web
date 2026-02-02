<template>

  <DefineTemplate>
    <v-btn rounded='xl' :to='localePath("monsters")'>{{ t('header.monsters') }}</v-btn>
    <v-btn rounded='xl' :to='localePath("random")'>{{ t('header.random') }}</v-btn>
    <v-btn rounded='xl' variant='outlined' color='primary' :to='localePath("test")'>{{ t('header.test') }}</v-btn>
    <v-btn rounded='xl' :to='localePath("stories")'>{{ t('header.stories') }}</v-btn>
  </DefineTemplate>

  <v-app-bar density='compact' :collapse='isMobile && !isDrawerOpen' :class='{
    "app-bar-desktop rounded-xl mt-2": !isMobile,
    "app-bar-mobile-drawer-open rounded-br-xl": isMobile && isDrawerOpen,
  }'>

    <v-btn v-if='!isMobile || isDrawerOpen' rounded='xl' :to='localePath("/")'>
      <v-avatar>
<!--        <v-img src='/images/favicon/logo.png'></v-img>-->
      </v-avatar>
      <span v-if='!isTablet'>{{ t('header.company-name') }}</span>
    </v-btn>

    <v-app-bar-nav-icon
      v-if='isMobile'
      :icon='isDrawerOpen ? "mdi-close" : "mdi-menu"'
      @click.stop='isDrawerOpen = !isDrawerOpen'></v-app-bar-nav-icon>

    <div class='mx-2' v-if='!isMobile'>
      <ReuseTemplate></ReuseTemplate>
    </div>

<!--
Implement quick actions
<template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
</template>-->
  </v-app-bar>

  <v-navigation-drawer
    v-model='isDrawerOpen'
    location='left'
    temporary
  >
    <div class='d-grid px-4'>
      <ReuseTemplate></ReuseTemplate>
    </div>
  </v-navigation-drawer>
</template>
<script lang='ts' setup>
import { useDisplay } from 'vuetify';
import { createReusableTemplate } from '@vueuse/core';

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

const localePath = useLocalePath();
const { t } = useI18n();
const isDrawerOpen = ref(false);
const { xs: isMobile, sm: isTablet } = useDisplay();
</script>
<style>

.app-bar-desktop {
  width:        fit-content !important;
  left:         calc(-50vw + 50%);
  right:        calc(-50vw + 50%);
  margin-left:  auto;
  margin-right: auto;
}

.app-bar-mobile-drawer-open {
  max-width: fit-content !important;
}

.rounded-br-xl {
  border-bottom-right-radius: 4*6px;
}

.d-grid {
  display:grid;
}

</style>
