import {H3Event} from 'h3';
import {z}from 'zod';
import {c} from '~~/content/context';

// export const id_schema = zod.object({
//   id: zod.string()
//     .min(1)
//     .max(255)
//   ,
// });
//
export function getQueryFrom(event: H3Event, schema: z.ZodObject) {
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
    z.object({
      locale: z.string()
        .length(2),
    }),
  ) as { locale: any };
  if (responses?.locale) {
    return responses.locale || 'en';
  }

  const locale = getCookie(event, c.cookie.session.locale) as any || 'en';
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
