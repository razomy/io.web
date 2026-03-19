import {useCommandTreeStore} from '~/composables/useCommandTreeStore';
import {useRzmRuntimeConfigState} from '#imports';
import {i18n} from '../../i18n/translates';
import type {NavigationNode} from "@razomy/nuxt/runtime/functions";
import {directoryToNavigationNode} from "~~/razomy/io/command";
import {cookie, url} from "../../configs/static-config";

const lT = (n: string) => (`io.db.${n}.title`)

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

export default defineNuxtPlugin(async (nuxtApp) => {
  const commandTreeStore = useCommandTreeStore();
  const rzmRuntimeConfigState = useRzmRuntimeConfigState();


  await commandTreeStore.initUserEnvironment(null);

  rzmRuntimeConfigState.set({
    url,
    cookie,
    i18n,
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
      children: commandTreeStore.directoriesTree.map(directoryToNavigationNode),
    },
  } as any);
});
