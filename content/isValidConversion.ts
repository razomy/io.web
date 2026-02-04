// Вспомогательная функция проверки
import {EXT_TO_EXTS_MAP} from '~~/content/context';

export const isValidConversion = (source: string, target: string) => {
  return EXT_TO_EXTS_MAP[source]?.includes(target) || false
}