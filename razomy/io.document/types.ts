import type {FileTypeConfig} from '../FILE_TYPES';

export const documents: FileTypeConfig[] = [
  {ext: 'pdf', mime: 'application/pdf', category: 'document', icon: 'mdi-file-pdf-box', conversions: ['docx', 'jpg', 'png']},
  {
    ext: 'docx',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'document',
    icon: 'mdi-file-word',
    conversions: ['pdf', 'txt', 'html']
  },
  {ext: 'html', mime: 'text/html', category: 'document', icon: 'mdi-language-html5', conversions: ['pdf', 'txt']},
  {ext: 'txt', mime: 'text/plain', category: 'document', icon: 'mdi-file-document-text', conversions: ['pdf', 'docx']},
  {ext: 'csv', mime: 'text/csv', category: 'document', icon: 'mdi-file-table', conversions: ['xlsx', 'pdf', 'txt']},
  {
    ext: 'xlsx',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'document',
    icon: 'mdi-file-excel',
    conversions: ['csv', 'pdf']
  },
] as const;