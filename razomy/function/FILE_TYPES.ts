export type FileTypeCategory = 'image' | 'video' | 'audio' | 'doc';

export interface FileTypeConfig {
  ext: string;
  mime: string;
  category: FileTypeCategory;
  icon: string;
  conversions: string[];
}

const images: FileTypeConfig[] = [
  {ext: 'jpg', mime: 'image/jpeg', category: 'image', icon: 'mdi-file-image', conversions: ['png', 'webp', 'pdf']},
  {ext: 'jpeg', mime: 'image/jpeg', category: 'image', icon: 'mdi-file-image', conversions: ['png', 'webp', 'pdf']},
  {ext: 'png', mime: 'image/png', category: 'image', icon: 'mdi-file-image', conversions: ['jpg', 'webp', 'ico']},
  {ext: 'webp', mime: 'image/webp', category: 'image', icon: 'mdi-file-image', conversions: ['jpg', 'png']},
  {ext: 'ico', mime: 'image/x-icon', category: 'image', icon: 'mdi-file-image', conversions: ['jpg', 'png']},
  {ext: 'gif', mime: 'image/gif', category: 'image', icon: 'mdi-file-image', conversions: ['mp4', 'webp']},
  {ext: 'svg', mime: 'image/svg+xml', category: 'image', icon: 'mdi-file-image', conversions: ['png', 'pdf']},
  {ext: 'avif', mime: 'image/avif', category: 'image', icon: 'mdi-file-image', conversions: ['jpg', 'png']},
  {ext: 'tiff', mime: 'image/tiff', category: 'image', icon: 'mdi-file-image', conversions: ['jpg', 'png', 'pdf']},
  {ext: 'heic', mime: 'image/heic', category: 'image', icon: 'mdi-file-image', conversions: ['jpg', 'png']},
] as const;
const documents: FileTypeConfig[] = [
  {ext: 'pdf', mime: 'application/pdf', category: 'doc', icon: 'mdi-file-pdf-box', conversions: ['docx', 'jpg', 'png']},
  {
    ext: 'docx',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: 'doc',
    icon: 'mdi-file-word',
    conversions: ['pdf', 'txt', 'html']
  },
  {ext: 'html', mime: 'text/html', category: 'doc', icon: 'mdi-language-html5', conversions: ['pdf', 'txt']},
  {ext: 'txt', mime: 'text/plain', category: 'doc', icon: 'mdi-file-document-text', conversions: ['pdf', 'docx']},
  {ext: 'csv', mime: 'text/csv', category: 'doc', icon: 'mdi-file-table', conversions: ['xlsx', 'pdf', 'txt']},
  {
    ext: 'xlsx',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'doc',
    icon: 'mdi-file-excel',
    conversions: ['csv', 'pdf']
  },
] as const;
const videos: FileTypeConfig[] = [
  // --- VIDEO ---
  {ext: 'mp4', mime: 'video/mp4', category: 'video', icon: 'mdi-video', conversions: ['mp3', 'gif', 'webm']},
  {ext: 'webm', mime: 'video/webm', category: 'video', icon: 'mdi-video', conversions: ['mp4', 'mp3']},
  {ext: 'mov', mime: 'video/quicktime', category: 'video', icon: 'mdi-video', conversions: ['mp4', 'mp3']},
  {ext: 'mkv', mime: 'video/x-matroska', category: 'video', icon: 'mdi-video', conversions: ['mp4', 'mp3']},
  {ext: 'avi', mime: 'video/x-msvideo', category: 'video', icon: 'mdi-video', conversions: ['mp4', 'mp3']},
  {ext: 'flv', mime: 'video/x-msvideo', category: 'video', icon: 'mdi-video', conversions: ['mp4', 'mp3']},
  {ext: 'wmv', mime: 'video/x-msvideo', category: 'video', icon: 'mdi-video', conversions: ['mp4', 'mp3']},
  {ext: 'm4v', mime: 'video/x-msvideo', category: 'video', icon: 'mdi-video', conversions: ['mp4', 'mp3']},
  {ext: '3gp', mime: 'video/x-msvideo', category: 'video', icon: 'mdi-video', conversions: ['mp4', 'mp3']},
] as const;
const audios: FileTypeConfig[] = [
  {ext: 'mp3', mime: 'audio/mpeg', category: 'audio', icon: 'mdi-music', conversions: ['wav', 'ogg', 'flac']},
  {ext: 'wav', mime: 'audio/wav', category: 'audio', icon: 'mdi-music', conversions: ['mp3', 'ogg']},
  {ext: 'ogg', mime: 'audio/ogg', category: 'audio', icon: 'mdi-music', conversions: ['mp3', 'wav']},
  {ext: 'flac', mime: 'audio/flac', category: 'audio', icon: 'mdi-music', conversions: ['mp3', 'wav']},
  {ext: 'm4a', mime: 'audio/mp4', category: 'audio', icon: 'mdi-music', conversions: ['mp3']},
  {ext: 'aac', mime: 'audio/aac', category: 'audio', icon: 'mdi-music', conversions: ['mp3']},
  {ext: 'wma', mime: 'audio/wma', category: 'audio', icon: 'mdi-music', conversions: ['mp3']},
] as const;

export const FILE_TYPES: FileTypeConfig[] = [
  ...images,
  ...documents,
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
