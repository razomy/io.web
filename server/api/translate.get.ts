import { H3Event } from 'h3';
import {getUserLocales} from '@razomy/vue-nuxt/runtime/functions';
import {c} from '~~/content/context';

export default eventHandler(async (event: H3Event) => {
  return c.i18n[getUserLocales(c, event)! as any as 'en']! as any;
});
