import { H3Event } from 'h3';
import {getUserLocales} from '@razomy/nuxt/runtime/functions/server';
import {c} from '~~/content/context';

export default eventHandler(async (event: H3Event) => {
  return c.i18n[getUserLocales(c, event)! as any as 'en']! as any;
});
