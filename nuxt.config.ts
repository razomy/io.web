import {defineNuxtConfig} from 'nuxt/config'
import {defaultNuxtConfig} from './razomy/vue.nuxt/default-nuxt-config';
import {c} from './content/context';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ...defaultNuxtConfig,
  build: {
    transpile: ['zod'],
  },
  nitro: {
    prerender: {
      routes: c.routes
    },
    externals: {
      inline: ['zod']
    }
  }
})