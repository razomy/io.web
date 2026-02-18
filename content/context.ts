import {i18n} from './translates';
import {ioFunctions, pairRoutes} from './io_functions';
import {ioGroups} from './io_groups';

const subdomainName = 'io' as const;
const domain = `${subdomainName}.razomy.org` as const;
const url = `https://${domain}` as const;
const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;

const products = [
  // {
  //   key: 'razomy',
  //   labelKey: 'navbar.products.razomy',
  //   iconUrl: 'https://www.razomy.org/favicon.svg',
  //   url: 'https://razomy.org'
  // },
  {
    key: 'io',
    labelKey: 'navbar.products.io',
    iconUrl: 'https://io.razomy.org/favicon.svg',
    url: 'https://io.razomy.org'
  },
  // {
  //   key: 'id',
  //   labelKey: 'navbar.products.id',
  //   iconUrl: 'https://id.razomy.org/favicon.svg',
  //   url: 'https://id.razomy.org'
  // },
  // {
  //   key: 'data',
  //   labelKey: 'navbar.products.id',
  //   iconUrl: 'https://data.razomy.org/favicon.svg',
  //   url: 'https://data.razomy.org'
  // },
  // {
  //   key: 'monster-match',
  //   labelKey: 'navbar.products.monster-match',
  //   iconUrl: 'https://monster-match.razomy.org/favicon.svg',
  //   url: 'https://monster-match.razomy.org'
  // },
];

export const categories = ioFunctions.map(i => {
    const slugs = [...i.input, i.output];
    return (slugs)
  })


export const c = {
  headerLinks: [],
  footerLinks: [{url:'https://github.com/razomy/io.web', text:'footer.github'}],
  subdomainName,
  domain,
  url,
  cookie,
  categories,
  products,
  groups: ioGroups,
  i18n,
  routes: pairRoutes
} as const
