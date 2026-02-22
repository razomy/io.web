import {en as vuetifyEn} from 'vuetify/locale';
import type {LeafPathGenerator, RzmNuxtTranslate} from '@razomy/nuxt/runtime/functions';

const nuxtTranslates = {
  footer: {
    donate: 'Donate',
    start_year: '2021',
    company_name: 'Razomy'
  },
  dropzone: {
    converting: 'Converting',
    scanning_folders: 'Scanning folders',
    drop_title: 'Drag & Drop file here',
    support_nested_folders: 'We support nested folders',
    select_files: 'Select File',
    select_folder: 'Select Folder',
    selected_files: 'Selected files',
    total_size: 'Total size',
    clear_all: 'Clear all',
    add_files: 'Add files',
    convert: 'Convert'
  },
  error: {
    404: {
      title: 'Page Not Found',
      back_btn: 'Back to Home Page'
    },
  },
  product: {
    name: 'Io',
    description: 'Input command',
  },
} as const satisfies RzmNuxtTranslate['nuxt'];

declare global {
  // Tool to search broken translates:
  // const useI18n: () => ({ t: (_: LeafPathGenerator<typeof i18n['en']>, _2?: any) => '' });
}

export const i18n = {
  en: {
    $vuetify: vuetifyEn,
    nuxt: nuxtTranslates,
    io: {
      web: {
        footer: {
          github: 'Source Code Github',
        },
        navbar: {
          products: {
            'io': 'IO',
          }
        },
        sidebar: {
          search: 'Find...',
          results_for: 'Results for',
          no_results: 'No pairs found'
        },
        text_to_text: {
          input_text: 'Input Text',
          placeholder_input: 'Paste your text here...',
          result_title: '{command} Result',
          copy_to_clipboard: 'Copy to clipboard',
          placeholder_output: 'Result will appear here...',
          convert_btn: 'Convert to {command}',
          copied_success: 'Copied to clipboard!',
          directory: {
            command: {
              steps: {
                paste: '1. Paste {directory} text',
                paste_desc: 'Paste or type your {s} content into the input area.',
                process: '2. Conversion Process',
                process_desc: 'Our tool automatically converts your text to {t} format with the best possible settings.',
                copy: '3. Copy {command}',
                copy_desc: 'The conversion is complete. You can now copy the result directly to your clipboard.',
              }
            }
          }
        },
        file_to_file: {
          error:'Error converting file:{fileName}',
          title: 'Razomy Input Ouput',
          subtitle: 'Find the converter you need among 1000+ functions',
          search_placeholder: 'e.g. pdf to docx, jpg...',
          no_results: 'No results found',
          convert_from: 'Convert from',
          to: 'to',
          close: 'Close',
          convert_to: 'Convert to',
          how_to_convert: 'How to convert',
          seo_title: 'File Converter Catalog',
          faq_title: 'Frequently Asked Questions',
          specs_title: 'Conversion Specs',
          input: 'Input',
          output: 'Output',
          safety: 'Safety',
          safety_value: 'HTTPS / Auto-delete',
          price: 'Price',
          free: 'Free',
          seo_desc: 'Full list of supported formats for conversion. PDF, DOCX, JPG, PNG and others.',
          directory: {
            title: 'Convert .{directory} files',
            subtitle: 'Select command format for your .{directory} files',
            available_conversions: 'Available conversions',
            command: {
              hero_sub: 'Fast, free, and secure online tool to convert {s} to {t}. No registration or software installation required.',
              features: {
                fast: 'Fast Conversion',
                secure: '100% Secure',
                quality: 'High Quality',
                accurate: 'High Accuracy',
              },
              seo: {
                title: 'Convert {directory} to {command} Online | Free & Secure Tool',
                h1: 'Free Online {directory} to {command} Converter',
                description: 'The best way to convert {directory} files to {command} format online. Easy to use, completely free, and secure file conversion.',
                intro_title: 'Why use our {directory} to {command} tool?',
                intro_text: 'Our converter allows you to process files with high precision. We preserve the original layout and quality while transforming your {directory} documents into {command}.'
              },
              steps: {
                upload: '1. Upload {directory} file',
                upload_desc: 'Drag and drop your {s} file into the upload area. The maximum file size is 100MB.',
                quality: '2. Conversion Process',
                quality_desc: 'Our tool automatically converts your file to {t} format with the best possible settings.',
                download: '3. Download {command}',
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
        },
      },
      db: {
        directories: {
          home: 'Home',
          image: 'Image',
          audio: 'Audio',
          video: 'Video',
          document: 'Docmnt',
          math: 'Math',
          string: 'Text'
        },
      },
    },
  }
} as const;