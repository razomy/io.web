import {defineNuxtConfig} from 'nuxt/config'
import {defaultNuxtConfig} from '@razomy/nuxt/runtime/functions';
import {c} from './configs/static-config';
// https://nuxt.com/docs/api/configuration/nuxt-config
const config = defaultNuxtConfig(c) as any;

config.vuetify.vuetifyOptions.theme.themes.light.colors.background = '#FFFFFF';
config.vuetify.vuetifyOptions.theme.themes.dark.colors.background = '#1E1E1E';
config.vite= {
  optimizeDeps: {
    exclude: ['quickjs-emscripten', 'esbuild'] // Исключаем из предсборки
  }
}
config.modules.push('@pinia/nuxt')
export default defineNuxtConfig(config)
