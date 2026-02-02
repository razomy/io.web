import {H3Event} from 'h3';
import zod from 'zod';
import {c} from '~~/content/context';

// export const id_schema = zod.object({
//   id: zod.string()
//     .min(1)
//     .max(255)
//   ,
// });
//
export function getQueryFrom(event: H3Event, schema: zod.ZodObject) {
  let responses = getQuery(event);

  try {
    responses = schema.parse(responses) as any;
  } catch (err) {
    console.log(err);
    return null;
  }

  return responses;
}


export function getUserLocales(event: H3Event): 'en' {
  let responses = getQueryFrom(
    event,
    zod.object({
      locale: zod.string()
        .length(2),
    }),
  ) as { locale: string };
  if (responses?.locale) {
    return responses.locale || 'en';
  }

  const locale = getCookie(event, c.cookie.session.locale) || 'en';
  return locale;
}

//
// export function getPath(event: H3Event, _default: string) {
//   let responses = getQueryFrom<{ path: string }>(
//     event,
//     zod.object({
//       path: zod.string()
//         .required(),
//     }),
//   );
//   if (responses?.path) {
//     return responses?.path;
//   }
//   return _default;
// }
