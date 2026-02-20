export const i18n = {
  en: {
    ['vue-nuxt']: {
      breadcrumb: {
        title: 'Home',
        select_category: 'Select Category',
        select_source: 'Select Source',
        select_output: 'Select Target'
      },
      header: {
        'company-name': 'Razomy',
      },
      footer: {
        blog: 'Blog',
        about: 'About Us',
        github: 'Source Code Github',
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
        search: 'Find...',
        results_for: 'Results for',
        no_results: 'No pairs found'
      },
      dropzone: {
        converting: 'Converting',
        drop_title: 'Drag & Drop file here',
        drop_subtitle: 'or click to select',
        select_file: 'Select File',
        convert_now: 'Convert Now'
      },
      button: {
        convert: 'Convert',
        back_to: 'Back to .{format}',
        remove: 'Remove'
      },
      error: {
        404: {
          title: 'Page Not Found'
        },
        generic: 'Conversion failed. Please try again later.'
      },
      file_to_file: {
        title: 'Functions',
        subtitle: 'Find the converter you need among 100+ formats',
        search_placeholder: 'e.g. pdf to docx, jpg...',
        no_results: 'No results found',
        convert_from: 'Convert from',
        convert_to: 'CONVERT TO',
        seo_title: 'File Converter Catalog',
        seo_desc: 'Full list of supported formats for conversion. PDF, DOCX, JPG, PNG and others.',
        input: {
          clear: 'Clear',
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
      },
      product: {
        name: 'Io',
        description: 'Input output',
        icon: 'mdi-transcribe'
      },
    },
    ['io-web']: {
      navbar: {
        products: {
          'monster-match': 'Monster Match',
          'io': 'IO',
          'razomy': 'Razomy',
        }
      },
      db: {
        inputs: {
          home: 'Home',
          image: 'Image',
          audio: 'Audio',
          video: 'Video',
          document: 'Doc',
          math: 'Math',
          string: 'Text'
        },
      },
    },
  }
} as const;