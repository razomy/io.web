import {i18n} from '../i18n/translates';
import {directoriesTree, directoryToNavigationNode} from '../razomy/_db';
import type {NavigationNode, RzmNuxtRuntimeConfig, RzmNuxtStaticConfig} from '@razomy/nuxt/runtime/functions';

const lT = (n: string) => (`io.db.${n}.title`)

const subdomainName = 'io' as const;
const domain = `${subdomainName}.razomy.org` as const;
const url = `https://${domain}` as const;
const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;

const externalNavigationRoot = {
  id: 'io.razomy.org',
  meta: {
    nameTk: 'io.web.navbar.products.io',
    iconName: 'https://io.razomy.org/favicon.svg',
    url: 'https://io.razomy.org'
  },
  children: [
    {
      id: 'io.razomy.org',
      children: [],
      meta: {
        nameTk: 'io.web.navbar.products.io',
        iconName: 'https://io.razomy.org/favicon.svg',
        url: 'https://io.razomy.org'
      },
    },
    // {
    //   key: 'razomy',
    //   labelText: 'io.web.navbar.products.razomy',
    //   iconName: 'https://www.razomy.org/favicon.svg',
    //   url: 'https://razomy.org'
    // },
    // {
    //   key: 'id',
    //   labelText: 'io.web.navbar.products.id',
    //   iconName: 'https://id.razomy.org/favicon.svg',
    //   url: 'https://id.razomy.org'
    // },
    // {
    //   key: 'data',
    //   labelText: 'io.web.navbar.products.id',
    //   iconName: 'https://data.razomy.org/favicon.svg',
    //   url: 'https://data.razomy.org'
    // },
    // {
    //   key: 'monster-match',
    //   labelText: 'io.web.navbar.products.monster-match',
    //   iconName: 'https://monster-match.razomy.org/favicon.svg',
    //   url: 'https://monster-match.razomy.org'
    // },
  ] as NavigationNode[],
} as const satisfies NavigationNode;

export const c = {
  headerNavigationNodes: [],
  footerNavigationNodes: [{
    meta: {
      nameTk: 'io.web.footer.github',
      url: 'https://github.com/razomy/io.web',
      iconName: 'mdi-github',
    },
    children: [],
    id: 'github.com/razomy/io.web'
  }],
  externalNavigationRoot: externalNavigationRoot,
  navigationRoot: {
    meta: {
      iconName: 'mdi-home',
      url: '/',
      nameTk: lT('home'),
    },
    id: 'root',
    children: directoriesTree.map(directoryToNavigationNode),
  },
  url,
  cookie,
  i18n,
} as const satisfies RzmNuxtRuntimeConfig & RzmNuxtStaticConfig;

