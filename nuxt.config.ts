import {defineNuxtConfig} from 'nuxt/config'
import {defaultNuxtConfig} from './razomy/vue.nuxt/default-nuxt-config';
import {ALLOWED_CONVERSIONS} from './content/context';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ...defaultNuxtConfig,
  nitro: {
    prerender: {
      routes: (() => {
        const routes = []
        for (const [src, targets] of Object.entries(ALLOWED_CONVERSIONS)) {
          // Страница источника
          routes.push(`/fs/${src}`)
          // Страницы пар
          targets.forEach(tgt => routes.push(`/fs/${src}/to-${tgt}`))
        }
        return routes
      })()
    }
  }
})