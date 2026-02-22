import {i18n} from './translates';
import {directoriesTree, directoryToNavigationNode} from '../razomy/db';
import type {NavigationNode, RzmNuxtConfig} from '@razomy/nuxt/runtime/functions';

// import type {Category} from '@razomy/nuxt/runtime/functions';
import {lT} from '../razomy/db/alies';

const subdomainName = 'io' as const;
const domain = `${subdomainName}.razomy.org` as const;
const url = `https://${domain}` as const;
const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;

const externalNavigationRoot = {
  id: 'io.razomy.org',
  meta: {
    key: 'io',
    labelText: 'io.web.navbar.products.io',
    iconName: 'https://io.razomy.org/favicon.svg',
    url: 'https://io.razomy.org'
  },
  children: [
    {
      id: 'io.razomy.org',
      children: [],
      meta: {
        key: 'io',
        labelText: 'io.web.navbar.products.io',
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
      labelText: 'io.web.footer.github',
      url: 'https://github.com/razomy/io.web',
      iconName: 'mdi-github',
      key: 'github.com/razomy/io.web'
    },
    children: [],
    id: 'github.com/razomy/io.web'
  }],
  externalNavigationRoot: externalNavigationRoot,
  navigationRoot: {
    meta: {
      key: 'root',
      iconName: 'mdi-home',
      url: '/',
      labelText: lT('home').fullText,
    },
    id: 'root',
    children: directoriesTree.map(directoryToNavigationNode),
  },
  url,
  cookie,
  i18n,
} as const satisfies RzmNuxtConfig;
