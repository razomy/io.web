export type FileTypeCategory = 'image' | 'video' | 'audio' | 'document';

export interface FileTypeConfig {
  ext: string;
  mime: string;
  category: FileTypeCategory;
  icon: string;
  conversions: string[];
}

