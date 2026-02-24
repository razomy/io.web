import { H3Event } from 'h3';
import {getUserLocales} from '@razomy/nuxt/runtime/functions/server';
import {c} from '~~/content/context';
import uk from '~~/i18n/uk-UA.json';
import es from '~~/i18n/es-ES.json';
import fr from '~~/i18n/fr-FR.json';
import de from '~~/i18n/de-DE.json';
import it from '~~/i18n/it-IT.json';
import pt from '~~/i18n/pt-PT.json';
import nl from '~~/i18n/nl-NL.json';
import sv from '~~/i18n/sv-SE.json';
import no from '~~/i18n/no-NO.json';
import da from '~~/i18n/da-DK.json';
import fi from '~~/i18n/fi-FI.json';
import ja from '~~/i18n/ja-JP.json';
import zh from '~~/i18n/zh-CN.json';
import ko from '~~/i18n/ko-KR.json';
import ar from '~~/i18n/ar-SA.json';
import ru from '~~/i18n/ru-RU.json';
import tr from '~~/i18n/tr-TR.json';
import hi from '~~/i18n/hi-IN.json';
import th from '~~/i18n/th-TH.json';
import id from '~~/i18n/id-ID.json';
const translates = {
  en: c.i18n.en,
  uk,
  es,
  fr,
  de,
  it,
  pt,
  nl,
  sv,
  no,
  da,
  fi,
  ja,
  zh,
  ko,
  ar,
  ru,
  tr,
  hi,
  th,
  id,
}
export default eventHandler(async (event: H3Event) => {
  const locale = getUserLocales(c, event)! as any as 'en';
  return translates[locale];
});
