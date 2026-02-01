import {c} from './content/meta';
import locales from './i18n/locales/locales.mjs';
import {defineNuxtConfig} from 'nuxt/config'

export const COOKIE_SESSION_LOCALE = 'monster-match.razomy.com_session';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  site: {
    url: process.env.LOCATION,
    name: c.name,
    description: c.description,
    defaultLocale: 'en',
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark',
        themes: {
          light: {
            colors: {
              primary: '#FCB60D',
              secondary: '#5243C2',
            },
          },
          dark: {
            dark: true,
            colors: {
              primary: '#FCB60D',
              secondary: '#5243C2',
            },
          },
        },
      },
      /* vuetify options */
    }
  },
  i18n: {
    locales: locales,
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      cookieKey: COOKIE_SESSION_LOCALE,
    },
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: process.env.LOCATION,
  },
  sitemap: {
    xsl: false,
    xslTips: false,
    // TODO: not working with google search
    sitemaps: false,
    sources: [
      '/api/__sitemap__/urls',
    ]
  },

  modules: [
    ['nuxt-gtag', {id: process.env.NUXT_PUBLIC_GTAG_ID}],
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
    '@nuxtjs/robots',
    'nuxt-zod-i18n',
  ],

})