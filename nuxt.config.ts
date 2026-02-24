import {defineNuxtConfig} from 'nuxt/config'
import {defaultNuxtConfig,locales} from '@razomy/nuxt/runtime/functions';
import {c} from './content/context';
import { resolve } from 'path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ...defaultNuxtConfig(c) as any,
})