import {i18n} from './translates';
import {commands, directoriesToCategories, directoriesTree} from '../razomy/db';
// import type {Category} from '@razomy/nuxt/runtime/functions';
import {lT} from '../razomy/db/alies';

const subdomainName = 'io' as const;
const domain = `${subdomainName}.razomy.org` as const;
const url = `https://${domain}` as const;
const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;

const products = [
  // {
  //   key: 'razomy',
  //   labelText: 'io.web.navbar.products.razomy',
  //   iconName: 'https://www.razomy.org/favicon.svg',
  //   url: 'https://razomy.org'
  // },
  {
    key: 'io',
    labelText: 'io.web.navbar.products.io',
    iconName: 'https://io.razomy.org/favicon.svg',
    url: 'https://io.razomy.org'
  },
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
];

export const routes = commands.map(r => r.url);

export const c = {
  headerLinks: [],
  footerLinks: [{url: 'https://github.com/razomy/io.web', text: 'io.web.footer.github'}],
  subdomainName,
  domain,
  url,
  cookie,
  categories: [
    {key: 'home', 'iconName': 'mdi-home', url: '/', labelText: lT('home').fullText, categories: []} as any,
    ...directoriesTree.map(directoriesToCategories),
  ],
  products,
  i18n,
  routes: routes
} as const
