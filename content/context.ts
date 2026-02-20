import {i18n} from './translates';
import {outputRecords, outputRoutes} from './outputRecords';
import {inputRecords} from './inputRecords';

const subdomainName = 'io' as const;
const domain = `${subdomainName}.razomy.org` as const;
const url = `https://${domain}` as const;
const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;

const products = [
  // {
  //   key: 'razomy',
  //   labelText: 'io-web.navbar.products.razomy',
  //   iconUrl: 'https://www.razomy.org/favicon.svg',
  //   url: 'https://razomy.org'
  // },
  {
    key: 'io',
    labelText: 'io-web.navbar.products.io',
    iconUrl: 'https://io.razomy.org/favicon.svg',
    url: 'https://io.razomy.org'
  },
  // {
  //   key: 'id',
  //   labelText: 'io-web.navbar.products.id',
  //   iconUrl: 'https://id.razomy.org/favicon.svg',
  //   url: 'https://id.razomy.org'
  // },
  // {
  //   key: 'data',
  //   labelText: 'io-web.navbar.products.id',
  //   iconUrl: 'https://data.razomy.org/favicon.svg',
  //   url: 'https://data.razomy.org'
  // },
  // {
  //   key: 'monster-match',
  //   labelText: 'io-web.navbar.products.monster-match',
  //   iconUrl: 'https://monster-match.razomy.org/favicon.svg',
  //   url: 'https://monster-match.razomy.org'
  // },
];

export const categories = outputRecords.map(i => {
  const slugs = [...i.inputs, i.output];
  return slugs
});


export const c = {
  headerLinks: [],
  footerLinks: [{url: 'https://github.com/razomy/io.web', text: 'footer.github'}],
  subdomainName,
  domain,
  url,
  cookie,
  categories,
  products,
  groups: inputRecords,
  i18n,
  routes: outputRoutes
} as const
