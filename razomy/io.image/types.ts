import {type FileTypeConfig} from '../io/FILE_TYPES';

// Список форматов, в которые Sharp умеет СОХРАНЯТЬ
const IMAGE_WRITE_TARGETS = [
  'jpg', 'png', 'webp', 'avif', 'tiff', 'gif',
  // TODO: not working 'heic',
  'ico'
];

// Генератор списка конвертаций (исключает самого себя)
const getConversions = (currentExt: string) =>
  IMAGE_WRITE_TARGETS.filter(t => t !== currentExt);


export const images: FileTypeConfig[] = [
  // --- РАСПРОСТРАНЕННЫЕ (Чтение и Запись) ---
  {ext: 'jpg', mime: 'image/jpeg', category: 'image', icon: 'mdi-file-image', conversions: getConversions('jpg')},
  {ext: 'jpeg', mime: 'image/jpeg', category: 'image', icon: 'mdi-file-image', conversions: getConversions('jpeg')},
  {ext: 'png', mime: 'image/png', category: 'image', icon: 'mdi-file-image', conversions: getConversions('png')},
  {ext: 'webp', mime: 'image/webp', category: 'image', icon: 'mdi-file-image', conversions: getConversions('webp')},
  {ext: 'gif', mime: 'image/gif', category: 'image', icon: 'mdi-file-gif-box', conversions: getConversions('gif')},

  // --- СОВРЕМЕННЫЕ (Чтение и Запись) ---
  {ext: 'avif', mime: 'image/avif', category: 'image', icon: 'mdi-star-face', conversions: getConversions('avif')},
  // TODO: not working {ext: 'heic', mime: 'image/heic', category: 'image', icon: 'mdi-cellphone', conversions: getConversions('heic')},
  // TODO: not working {ext: 'heif', mime: 'image/heif', category: 'image', icon: 'mdi-cellphone', conversions: getConversions('heif')},
  {ext: 'tiff', mime: 'image/tiff', category: 'image', icon: 'mdi-printer', conversions: getConversions('tiff')},
  {ext: 'tif', mime: 'image/tiff', category: 'image', icon: 'mdi-printer', conversions: getConversions('tif')},

  // --- СПЕЦИФИЧНЫЕ (В них можно сохранять с оговорками) ---
  {ext: 'ico', mime: 'image/x-icon', category: 'image', icon: 'mdi-emoticon', conversions: getConversions('ico')},

  // --- ТОЛЬКО ЧТЕНИЕ (Sharp открывает их, но сохраняет только в растр) ---
  // Мы не можем конвертировать PNG -> SVG, но можем SVG -> PNG
  {ext: 'svg', mime: 'image/svg+xml', category: 'image', icon: 'mdi-vector-curve', conversions: IMAGE_WRITE_TARGETS},
  {ext: 'bmp', mime: 'image/bmp', category: 'image', icon: 'mdi-image-filter-black-white', conversions: IMAGE_WRITE_TARGETS},
] as const;