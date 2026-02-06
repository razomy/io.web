import {defineNuxtConfig} from 'nuxt/config'
import {defaultNuxtConfig} from '@razomy/vue-nuxt/runtime/functions';
// import {c} from './content/context.browser';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ...defaultNuxtConfig(
    {
    url: '',
    cookie: {session: {locale: ''}},
    i18n: {en: {product: {name: '', description: ''}}},
  }
  ) as any,
  build: {
    transpile: ['zod'],
  },
  typescript: {
    strict: false,
    typeCheck: false,
  },
  // devServer: {
  //   port: 3000,
  //   host: '0.0.0.0' // allows access from network IP
  // },
  nitro: {
    //TODO: performance issue
    // prerender: {
    //   routes: c.routes
    // },
    externals: {
      inline: ['zod']
    }
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      // 1. GLOBAL DEFAULTS: This removes the "Material" feel
      defaults: {
        global: {
          elevation: 0,  // Removes shadows globally
        },
        VBtn: {
          variant: 'flat', // No shadow, just color
          class: 'text-none', // Normal capitalization
        },
        VCard: {
          variant: 'flat', // No shadow
          border: true,    // Adds a subtle border instead of shadow
          rounded: 'lg',   // Soft, large rounded corners
          color: 'surface',
        },
        VTextField: {
          variant: 'outlined',
          density: 'comfortable', // Adds more whitespace than 'compact'
          color: 'primary',
          hideDetails: 'auto',
        },
        VMenu: {
          // Автоматически применяем наш CSS класс к контейнеру меню
          contentClass: 'global-soft-menu',
          offset: 4, // Небольшой отступ от кнопки (эффект полета)
          transition: 'scale-transition', // Или 'slide-y-transition' для мягкости
        },
        VAppBar: {
          flat: true,
          color: 'background', // Blends with the page background
          border: true,        // Subtle separation line
        },
        VNavigationDrawer: {
          border: 'none',
          color: 'surface',
          elevation: 0,
        },
      },

      // 2. THEME COLORS: Soft, airy palette
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            dark: false,
            colors: {
              // Your Brand Colors (slightly softened)
              primary: '#FCB60D',
              secondary: '#5243C2',

              // THE "SOFT" UI BASE
              // background: '#F5F5F7', // The "Apple Store" light gray background
              // surface: '#FFFFFF',    // Pure white for cards/elements
              'surface-light': '#F3F4F6',    // Pure white for cards/elements

              // Text colors for better contrast without harsh black
              'on-background': '#1D1D1F', // Dark grey (Apple style) instead of #000
              'on-surface': '#1D1D1F',
            },
          },
          dark: {
            dark: true,
            colors: {
              primary: '#FCB60D',
              secondary: '#5243C2',
              background: '#121212', // Standard dark
              surface: '#1E1E1E',
            },
          },
        },
      },
    },
  },

})