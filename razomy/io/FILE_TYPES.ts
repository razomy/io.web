import {images} from '../io.image/types';
import {audios, videos} from '../io.video/types';

export type FileTypeCategory = 'image' | 'video' | 'audio' | 'document';

export interface FileTypeConfig {
  ext: string;
  mime: string;
  category: FileTypeCategory;
  icon: string;
  conversions: string[];
}

const documents: FileTypeConfig[] = [
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

export const FILE_TYPES: FileTypeConfig[] = [
  ...images,
  // ...documents,
  ...videos,
  ...audios,
] as const;
/**
 * Helper: Quick lookup for MIME types (Derived from the main list)
 */
export const MIME_TYPES = FILE_TYPES.reduce((acc, curr) => {
  acc[curr.ext] = curr.mime;
  return acc;
}, {} as any);

export const videoExtensions = new Set(FILE_TYPES.filter(i => i.category === 'video').map(i => i.ext));
export const audioExtensions = new Set(FILE_TYPES.filter(i => i.category === 'audio').map(i => i.ext));
