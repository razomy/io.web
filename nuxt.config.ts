import {defineNuxtConfig} from 'nuxt/config'
import {defaultNuxtConfig} from '@razomy/nuxt/runtime/functions';
import {c} from './content/context';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(Object.assign({},
  defaultNuxtConfig(c)
))