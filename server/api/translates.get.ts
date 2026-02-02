import { H3Event } from 'h3';
import {getUserLocales} from '~~/razomy/vue.nuxt/getUserLocales';
import {c} from '~~/content/context';

export default eventHandler(async (event: H3Event) => {
  return c.i18n[getUserLocales(event)];
});
