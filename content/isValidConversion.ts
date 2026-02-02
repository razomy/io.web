// Вспомогательная функция проверки
import {ALLOWED_CONVERSIONS} from '~~/content/context';

export const isValidConversion = (source: string, target: string) => {
  return ALLOWED_CONVERSIONS[source]?.includes(target) || false
}