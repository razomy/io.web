import {type FileFormat} from '@razomy/fs-file-format';
import {images} from '@razomy/images';
import {videos} from '@razomy/videos';
import {audios} from '@razomy/audios';

const subdomainName = 'io' as const;
const domain = `${subdomainName}.razomy.org` as const;
const url = `https://${domain}` as const;
const cookie = {
  session: {locale: `${subdomainName}.razomy.org-session-locale`,}
} as const;

export const FILE_TYPES: FileFormat[] = [
  ...images,
  // ...documents,
  ...videos,
  ...audios,
] as const;

// Хелпер для получения иконки по расширению (для красоты)
export const getFileIcon = (ext: string) => {
  return FILE_TYPES[ext as any]?.iconUrl || 'mdi-file-document-outline';
};

export const EXT_TO_EXTS_MAP = Object.assign({}, ...FILE_TYPES.map(i => ({[i.fileExtensionType]: i.conversions})));
export const EXT_TO_GROUP_MAP: Record<string, string> = Object.assign({}, ...FILE_TYPES.map(i => ({[i.fileExtensionType]: i.fileCategory})));
// Конфиг категорий (иконки и названия)
export const groups: Record<string, { icon: string, labelKey: string }> = {
  image: {icon: 'mdi-image-multiple', labelKey: 'groups.image'},
  // document: {icon: 'mdi-file-document-multiple', labelKey: 'groups.document'},
  video: {icon: 'mdi-video', labelKey: 'groups.video'},
  audio: {icon: 'mdi-music', labelKey: 'groups.audio'},
};

const footerLinks: any[] = [
  // { url: '/company/blog', text: 'footer.blog' },
  // { url: '/company/about', text: 'footer.about' },
  // { url: '/company/feedback', text: 'footer.feedback' },
  // { url: '/company/contacts', text: 'footer.contacts' },
  // { url: '/company', text: 'footer.company' },
  // { url: '/company/licence', text: 'footer.licence' },
  // { url: '/company/term-of-use', text: 'footer.term-of-use' },
  // { url: '/company/privacy-policy', text: 'footer.privacy-policy' },
  // <v-btn icon="mdi-github" color="white" href="#" output="_blank"/>
];

const headerLinks: any[] = [
  // { url: '/company/blog', text: 'footer.blog' },
  // { url: '/company/about', text: 'footer.about' },
  // { url: '/company/feedback', text: 'footer.feedback' },
  // { url: '/company/contacts', text: 'footer.contacts' },
  // { url: '/company', text: 'footer.company' },
  // { url: '/company/licence', text: 'footer.licence' },
  // { url: '/company/term-of-use', text: 'footer.term-of-use' },
  // { url: '/company/privacy-policy', text: 'footer.privacy-policy' },
];


// {
//   [{url:a, ComponentB}
//   {url:a, ComponentC}
//   {}

const pairRoutes = FILE_TYPES
  .map(i => [i.conversions.map(o => `/${i.fileCategory}/${i.fileExtensionType}/${o}`)])
  .flat(2);

export const pairRoutesSet = new Set(pairRoutes)

const routes = pairRoutes;
const i18n = {
  en: {
    product: {
      name: 'Io',
      description: 'Input output',
      icon: 'mdi-transcribe'
    },
    groups: {
      image: 'image',
      audio: 'audio',
      video: 'video',
      document: 'document'
    },
    breadcrumb: {
      title: 'Home',
      select_category: 'Select Category',
      select_source: 'Select Source',
      select_output: 'Select Target'
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
    group: {
      title: 'Functions',
      subtitle: 'Find the converter you need among 100+ formats',
      search_placeholder: 'e.g. pdf to docx, jpg...',
      no_results: 'No results found',
      convert_from: 'Convert from',
      convert_to: 'CONVERT TO',
      seo_title: 'File Converter Catalog',
      seo_desc: 'Full list of supported formats for conversion. PDF, DOCX, JPG, PNG and others.',
      input: {
        title: 'Convert .{input} files',
        subtitle: 'Select output format for your .{input} files',
        available_conversions: 'Available conversions',
        output: {
          hero_sub: 'Fast, free, and secure online tool to convert {s} to {t}. No registration or software installation required.',
          features: {
            fast: 'Fast Conversion',
            secure: '100% Secure',
            quality: 'High Quality',
            cloud: 'Cloud Based'
          },

          seo: {
            title: 'Convert {input} to {output} Online | Free & Secure Tool',
            h1: 'Free Online {input} to {output} Converter',
            description: 'The best way to convert {input} files to {output} format online. Easy to use, completely free, and secure file conversion.',
            intro_title: 'Why use our {input} to {output} tool?',
            intro_text: 'Our converter allows you to process files with high precision. We preserve the original layout and quality while transforming your {input} documents into {output}.'
          },
          steps: {
            upload: '1. Upload {input} file',
            upload_desc: 'Drag and drop your {s} file into the upload area. The maximum file size is 100MB.',
            quality: '2. Conversion Process',
            quality_desc: 'Our tool automatically converts your file to {t} format with the best possible settings.',
            download: '3. Download {output}',
            download_desc: 'Wait a moment for the process to finish, then download your new {tgt} file instantly.'
          },
          faq: {
            q1: 'How do I convert {s} to {t}?',
            a1: 'Simply upload your file, wait for the conversion, and click download. It works on Windows, Mac, Linux, and mobile devices.',
            q2: 'Is it safe to convert {s} on Razomy?',
            a2: 'Yes. We use HTTPS encryption. Your files are automatically deleted from our servers after 1 hour to ensure privacy.',
            q3: 'Is this converter free?',
            a3: 'Absolutely. You can convert {s} files to {t} for free without creating an account.'
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
        select_input: 'Источник',
        select_output: 'Цель'
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
    group: {
      title: 'Все инструменты',
      subtitle: 'Найдите нужный конвертер среди 100+ форматов',
      search_placeholder: 'Например: pdf в docx, jpg...',
      no_results: 'Ничего не найдено',
      convert_from: 'Конвертер из формата',
      convert_to: 'ПРЕОБРАЗОВАТЬ В',
      seo_title: 'Каталог всех файловых конвертеров',
      seo_desc: 'Полный список поддерживаемых форматов для конвертации. PDF, DOCX, JPG, PNG и другие.',
      input: {
        title: 'Конвертер файлов .{input}',
        subtitle: 'Выберите целевой формат для конвертации ваших .{input} файлов',
        available_conversions: 'Доступные направления',
        output: {
          hero_sub: 'Лучший способ преобразовать файлы {s} в формат {t} за секунды.',
          seo: {
            h1: 'Конвертировать {input} в {output} бесплатно',
            intro: 'Лучший способ преобразовать файлы {input} в формат {output} за секунды.',
          },
          steps: {
            upload: 'Загрузите файл {input}',
            upload_desc: 'Выберите ваш файл {s}',
            quality: 'Выберите качество (если применимо)',
            quality_desc: 'Настройте параметры',
            download: 'Скачайте ваш {output}',
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
