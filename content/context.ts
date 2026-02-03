import {FILE_TYPES} from '../razomy/function/FILE_TYPES';

const subdomainName = 'function' as const;
const domain = `${subdomainName}.razomy.org` as const;
const url = `https://${domain}` as const;
const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;

// Хелпер для получения иконки по расширению (для красоты)
export const getFileIcon = (ext: string) => {
  return FILE_TYPES[ext]?.icon || 'mdi-file-document-outline';
};

export const ALLOWED_CONVERSIONS = Object.assign({}, ...FILE_TYPES.map(i => ({[i.ext]: i.conversions})));
export const CATEGORY_MAP: Record<string, string> = Object.assign({}, ...FILE_TYPES.map(i => ({[i.ext]: i.category})));
// Конфиг категорий (иконки и названия)
export const CATEGORY_CONFIG: Record<string, { icon: string, labelKey: string }> = {
  image: {icon: 'mdi-image-multiple', labelKey: 'categories.image'},
  document: {icon: 'mdi-file-document-multiple', labelKey: 'categories.document'},
  video: {icon: 'mdi-video', labelKey: 'categories.video'},
  audio: {icon: 'mdi-music', labelKey: 'categories.audio'},
};

const footerLinks = [
  { url: '/company/blog', text: 'footer.blog' },
  { url: '/company/about', text: 'footer.about' },
  { url: '/company/feedback', text: 'footer.feedback' },
  { url: '/company/contacts', text: 'footer.contacts' },
  { url: '/company', text: 'footer.company' },
  { url: '/company/licence', text: 'footer.licence' },
  { url: '/company/term-of-use', text: 'footer.term-of-use' },
  { url: '/company/privacy-policy', text: 'footer.privacy-policy' },
  // <v-btn icon="mdi-github" color="white" href="#" target="_blank"/>
];

const headerLinks = [
  { url: '/company/blog', text: 'footer.blog' },
  { url: '/company/about', text: 'footer.about' },
  { url: '/company/feedback', text: 'footer.feedback' },
  { url: '/company/contacts', text: 'footer.contacts' },
  { url: '/company', text: 'footer.company' },
  { url: '/company/licence', text: 'footer.licence' },
  { url: '/company/term-of-use', text: 'footer.term-of-use' },
  { url: '/company/privacy-policy', text: 'footer.privacy-policy' },
];

const routes = FILE_TYPES.map(i=>[i.conversions.map(o=>`/${i.ext}-${o}`)]).flat(2);

const i18n = {
  en: {
    breadcrumb: {
      title: 'Home',
      select_category: 'Select Category',
      select_source: 'Select Source',
      select_target: 'Select Target'
    },
    header: {
      monsters: 'Monsters',
      random: 'Random',
      test: 'Test',
      stories: 'Stories',
      'company-name': 'Razomy',
    },
    footer: {
      blog: 'Blog',
      about: 'About Us',
      feedback: 'Feedback',
      contacts: 'Contacts',
      company: 'Company',
      licence: 'Licence',
      'term-of-use': 'Terms of Use',
      'privacy-policy': 'Privacy Policy',
      donate: 'Donate',
      'company-name': 'Razomy'
    },
    sidebar: {
      search: 'Find format...',
      results_for: 'Results for',
      no_results: 'No pairs found'
    },
    categories: {
      image: 'Images',
      document: 'Documents',
      video: 'Video',
      audio: 'Audio',
      other: 'Other'
    },
    dropzone: {
      converting: 'Converting',
      drop_title: 'Drag & Drop file here',
      drop_subtitle: 'or click to select',
      select_file: 'Select File',
      convert_now: 'Convert Now'
    },
    common: {
      convert_btn: 'Convert',
      back_to: 'Back to .{format}',
      remove: 'Remove'
    },
    error: {
      404: {
        title: 'Page Not Found'
      },
      generic: 'Conversion failed. Please try again later.'
    },
    fs: {
      title: 'All Tools',
      subtitle: 'Find the converter you need among 100+ formats',
      search_placeholder: 'e.g. pdf to docx, jpg...',
      no_results: 'No results found',
      convert_from: 'Convert from',
      convert_to: 'CONVERT TO',
      seo_title: 'File Converter Catalog',
      seo_desc: 'Full list of supported formats for conversion. PDF, DOCX, JPG, PNG and others.',
      source: {
        title: 'Convert .{source} files',
        subtitle: 'Select target format for your .{source} files',
        available_conversions: 'Available conversions',
        target: {
          hero_sub: 'Best way to convert {s} to {t} in seconds.',
          seo: {
            h1: 'Convert {source} to {target} for free',
            intro: 'Best way to convert {source} files to {target} format in seconds.',
          },
          steps: {
            upload: 'Upload {source} file',
            upload_desc: 'Select your {s} file to upload',
            quality: 'Select quality (if applicable)',
            quality_desc: 'Adjust settings as needed',
            download: 'Download your {target}',
            download_desc: 'Get your converted {tgt} file'
          },
          faq: {
            q1: 'How to open {s}?',
            a1: 'You can use standard tools...',
            q2: 'Is it safe?',
            a2: 'Yes, files are deleted automatically after 1 hour.',
            q3: 'Size limits?',
            a3: 'Up to 100 MB for free.'
          }
        }
      }
    }
  },
  ru: {
    global: {
      breadcrumb: {
        title: 'Главная',
        select_category: 'Категория',
        select_source: 'Источник',
        select_target: 'Цель'
      },
      header: {
        monsters: 'Монстры',
        random: 'Случайное',
        test: 'Тест',
        stories: 'Истории',
        'company-name': 'Razomy',
      },
      footer: {
        blog: 'Блог',
        about: 'О нас',
        feedback: 'Обратная связь',
        contacts: 'Контакты',
        company: 'Компания',
        licence: 'Лицензия',
        'term-of-use': 'Условия использования',
        'privacy-policy': 'Политика конфиденциальности',
        donate: 'Поддержать',
        'company-name': 'Razomy'
      },
      sidebar: {
        search: 'Найти формат...',
        results_for: 'Результаты для',
        no_results: 'Пары не найдены'
      },
      categories: {
        image: 'Изображения',
        document: 'Документы',
        video: 'Видео',
        audio: 'Аудио',
        other: 'Другое'
      },
      dropzone: {
        converting: 'Конвертация',
        drop_title: 'Перетащите файл сюда',
        drop_subtitle: 'или нажмите для выбора',
        select_file: 'Выбрать файл',
        convert_now: 'Конвертировать'
      },
      common: {
        convert_btn: 'Конвертировать',
        back_to: 'Назад к .{format}',
        remove: 'Удалить'
      },
      error: {
        404: {
          title: 'Страница не найдена'
        },
        generic: 'Ошибка при конвертации. Попробуйте позже.'
      }
    },
    fs: {
      title: 'Все инструменты',
      subtitle: 'Найдите нужный конвертер среди 100+ форматов',
      search_placeholder: 'Например: pdf в docx, jpg...',
      no_results: 'Ничего не найдено',
      convert_from: 'Конвертер из формата',
      convert_to: 'ПРЕОБРАЗОВАТЬ В',
      seo_title: 'Каталог всех файловых конвертеров',
      seo_desc: 'Полный список поддерживаемых форматов для конвертации. PDF, DOCX, JPG, PNG и другие.',
      source: {
        title: 'Конвертер файлов .{source}',
        subtitle: 'Выберите целевой формат для конвертации ваших .{source} файлов',
        available_conversions: 'Доступные направления',
        target: {
          hero_sub: 'Лучший способ преобразовать файлы {s} в формат {t} за секунды.',
          seo: {
            h1: 'Конвертировать {source} в {target} бесплатно',
            intro: 'Лучший способ преобразовать файлы {source} в формат {target} за секунды.',
          },
          steps: {
            upload: 'Загрузите файл {source}',
            upload_desc: 'Выберите ваш файл {s}',
            quality: 'Выберите качество (если применимо)',
            quality_desc: 'Настройте параметры',
            download: 'Скачайте ваш {target}',
            download_desc: 'Получите ваш файл {tgt}'
          },
          faq: {
            q1: 'Как открыть {s}?',
            a1: 'Вы можете использовать стандартные средства...',
            q2: 'Безопасно ли это?',
            a2: 'Да, файлы удаляются автоматически через 1 час.',
            q3: 'Лимиты размера?',
            a3: 'До 100 Мб бесплатно.'
          }
        }
      }
    }
  }
} as const;

export const c = {
  headerLinks,
  footerLinks,
  subdomainName,
  domain,
  url,
  cookie,
  i18n,
  routes
} as const
