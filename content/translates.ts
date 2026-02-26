import {en as vuetifyEn} from 'vuetify/locale';
import type {RzmNuxtTranslate} from '@razomy/nuxt/runtime/functions';

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
          result_title: '{target} Result',
          copy_to_clipboard: 'Copy to clipboard',
          placeholder_output: 'Result will appear here...',
          convert_btn: 'Convert to {target}',
          copied_success: 'Copied to clipboard!',
          directory: {
            command: {
              hero_sub: 'Free and instant online tool to convert normal text, strings, or variables into {target}.',
              seo: {
                title: 'Convert Text to {target} Online | Free String Generator',
                h1: 'Free Online {target} Converter',
                description: 'Easily convert your text, strings, or code variables to {target} online. A free, fast, and secure text formatting tool for developers and writers.',
                intro_title: 'Why use our {target} generator?',
                intro_text: 'Our string formatting tool instantly transforms your normal text, sentences, or code variables into {target}. Simply paste your content, and the tool will automatically handle spaces and capitalization.'
              },
              steps: {
                paste: '1. Paste {source} text',
                paste_desc: 'Paste or type your {source} content into the input area.',
                process: '2. Conversion Process',
                process_desc: 'Our tool automatically converts your text to {target} format with the best possible settings.',
                copy: '3. Copy {target}',
                copy_desc: 'The conversion is complete. You can now copy the result directly to your clipboard.',
              },
              faq: {
                q1: 'How do I convert text to {target}?',
                a1: 'Just paste your string into our online tool and click convert. It will automatically apply the {target} casing rules. Then, simply copy the result.',
                q2: 'Is my text and code secure?',
                a2: 'Absolutely. We care about privacy. Your text is processed securely, and we do not store or save any of your pasted content or code.',
                q3: 'Is this string formatter free?',
                a3: 'Yes, this text conversion tool is 100% free to use with no hidden limits.'
              }
            }
          }
        },
        code: {
          title: 'Using code',
          parameters: 'Parameters',
          name: 'Name',
          type: 'Type',
          description: 'Description',
          returns: 'Returns',
          typescript_javascript: 'Typescript/Javascript'
        },
        input: {
          title: 'Convert {source} data',
          subtitle: 'Select output format for your {source} data',
        },
        file_to_file: {
          error: 'Error converting file: {fileName}',
          title: 'Razomy Input Output',
          subtitle: 'Find the converter you need among 1000+ tools',
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
            available_conversions: 'Available conversions',
            command: {
              hero_sub: 'Fast, free, and secure online tool to convert {source} to {target}. No registration or software installation required.',
              features: {
                fast: 'Fast Conversion',
                secure: '100% Secure',
                quality: 'High Quality',
                accurate: 'High Accuracy',
              },
              seo: {
                title: 'Convert {source} to {target} Online | Free & Secure Tool',
                h1: 'Free Online {source} to {target} Converter',
                description: 'The best way to convert {source} files to {target} format online. Easy to use, completely free, and secure file conversion.',
                intro_title: 'Why use our {source} to {target} tool?',
                intro_text: 'Our converter allows you to process files with high precision. We preserve the original layout and quality while transforming your {source} documents into {target}.'
              },
              steps: {
                upload: '1. Upload {source} file',
                upload_desc: 'Drag and drop your {source} file into the upload area. The maximum file size is 100MB.',
                quality: '2. Conversion Process',
                quality_desc: 'Our tool automatically converts your file to {target} format with the best possible settings.',
                download: '3. Download {target}',
                download_desc: 'Wait a moment for the process to finish, then download your new {target} file instantly.'
              },
              faq: {
                q1: 'How do I convert {source} to {target}?',
                a1: 'Simply upload your file, wait for the conversion, and click download. It works on Windows, Mac, Linux, and mobile devices.',
                q2: 'Is it safe to convert {source} on Razomy?',
                a2: 'Yes. We use HTTPS encryption. Your files are automatically deleted from our servers after 1 hour to ensure privacy.',
                q3: 'Is this converter free?',
                a3: 'Absolutely. You can convert {source} files to {target} for free without creating an account.'
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
          document: 'Document',
          math: 'Math',
          string: 'Text'
        },
      },
    },
  }
} as const;