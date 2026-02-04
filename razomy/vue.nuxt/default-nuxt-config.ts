import {c} from '../../content/context';
import locales from '../../i18n/locales/locales.mjs';
import { type NuxtConfig } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export const defaultNuxtConfig: NuxtConfig = ({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  site: {
    url: c.url,
    name: c.i18n.en.product.name,
    description: c.i18n.en.product.description,
    defaultLocale: 'en',
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'system',
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
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      cookieKey: c.cookie.session.locale,
    },
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: c.url,
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