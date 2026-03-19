import {directoryToNavigationNode} from '../razomy/_db';
import type {NavigationNode, RzmNuxtRuntimeConfig, RzmNuxtStaticConfig} from '@razomy/nuxt/runtime/functions';
import {i18n} from "../i18n/translates";

const subdomainName = 'io' as const;
const domain = `${subdomainName}.razomy.org` as const;
export const url = `https://${domain}` as const;
export const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;


export const c = {
  url,
  cookie,
  i18n,
} as const satisfies RzmNuxtStaticConfig;
