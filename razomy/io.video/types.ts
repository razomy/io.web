import {FILE_TYPES, type FileTypeConfig} from '../io/FILE_TYPES';

// Списки целевых форматов (куда мы можем кодировать)
// Внимание: кодировать В realmedia (.rm) или swf ffmpeg делает плохо, поэтому их лучше оставить только на вход.
const ALL_VIDEO_TARGETS = [
  'mp4', 'webm', 'mov', 'mkv', 'avi', 'wmv', 'flv', 'm4v', '3gp', 'mpg', 'mpeg', 'ogv', 'gif',
  'vob', 'm2ts', 'mts', 'ts', 'asf', 'dv', 'mxf'
];

const ALL_AUDIO_TARGETS = [
  'mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac', 'wma', 'opus', 'aiff', 'ac3', 'dts', 'amr', 'voc'
];

const VIDEO_CONVERSIONS = [...ALL_VIDEO_TARGETS, ...ALL_AUDIO_TARGETS];
const AUDIO_CONVERSIONS = [...ALL_AUDIO_TARGETS];

export const videos: FileTypeConfig[] = [
  // --- WEB & MODERN ---
  {ext: 'mp4', mime: 'video/mp4', category: 'video', icon: 'mdi-video', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'mp4')},
  {ext: 'webm', mime: 'video/webm', category: 'video', icon: 'mdi-video', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'webm')},
  {ext: 'mov', mime: 'video/quicktime', category: 'video', icon: 'mdi-filmstrip', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'mov')},
  {ext: 'mkv', mime: 'video/x-matroska', category: 'video', icon: 'mdi-video-outline', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'mkv')},

  // --- PC & LEGACY ---
  {ext: 'avi', mime: 'video/x-msvideo', category: 'video', icon: 'mdi-video-outline', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'avi')},
  {ext: 'wmv', mime: 'video/x-ms-wmv', category: 'video', icon: 'mdi-windows', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'wmv')},
  {ext: 'asf', mime: 'video/x-ms-asf', category: 'video', icon: 'mdi-windows', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'asf')}, // Предшественник WMV
  {ext: 'flv', mime: 'video/x-flv', category: 'video', icon: 'mdi-flash', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'flv')},
  {ext: 'swf', mime: 'application/x-shockwave-flash', category: 'video', icon: 'mdi-flash-outline', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'swf')}, // Flash

  // --- MOBILE & APPLE ---
  {ext: 'm4v', mime: 'video/x-m4v', category: 'video', icon: 'mdi-apple', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'm4v')},
  {ext: '3gp', mime: 'video/3gpp', category: 'video', icon: 'mdi-cellphone', conversions: VIDEO_CONVERSIONS.filter(c => c !== '3gp')},
  {ext: '3g2', mime: 'video/3gpp2', category: 'video', icon: 'mdi-cellphone', conversions: VIDEO_CONVERSIONS.filter(c => c !== '3g2')},

  // --- DISC & BROADCAST (DVD, BluRay, TV) ---
  {ext: 'vob', mime: 'video/mpeg', category: 'video', icon: 'mdi-disc', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'vob')}, // DVD
  {ext: 'mpg', mime: 'video/mpeg', category: 'video', icon: 'mdi-disc', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'mpg')},
  {ext: 'mpeg', mime: 'video/mpeg', category: 'video', icon: 'mdi-disc', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'mpeg')},
  {ext: 'm2ts', mime: 'video/mp2t', category: 'video', icon: 'mdi-disc-player', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'm2ts')}, // Blu-ray
  {ext: 'mts', mime: 'video/mp2t', category: 'video', icon: 'mdi-camcorder', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'mts')}, // AVCHD Camcorders
  {ext: 'ts', mime: 'video/mp2t', category: 'video', icon: 'mdi-satellite-uplink', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'ts')}, // IPTV Stream
  {ext: 'mxf', mime: 'application/mxf', category: 'video', icon: 'mdi-television-box', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'mxf')}, // Профессиональное ТВ

  // --- OTHERS ---
  {ext: 'ogv', mime: 'video/ogg', category: 'video', icon: 'mdi-video', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'ogv')},
  {ext: 'rm', mime: 'application/vnd.rn-realmedia', category: 'video', icon: 'mdi-history', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'rm')}, // RealMedia (90s)
  {ext: 'rmvb', mime: 'application/vnd.rn-realmedia-vbr', category: 'video', icon: 'mdi-history', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'rmvb')},
  {ext: 'dv', mime: 'video/x-dv', category: 'video', icon: 'mdi-camcorder-off', conversions: VIDEO_CONVERSIONS.filter(c => c !== 'dv')}, // Digital Video (MiniDV cassettes)
] as const;

export const audios: FileTypeConfig[] = [
  // --- COMMON ---
  {ext: 'mp3', mime: 'audio/mpeg', category: 'audio', icon: 'mdi-music', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'mp3')},
  {ext: 'wav', mime: 'audio/wav', category: 'audio', icon: 'mdi-waveform', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'wav')},
  {ext: 'aac', mime: 'audio/aac', category: 'audio', icon: 'mdi-music-note', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'aac')},
  {ext: 'm4a', mime: 'audio/mp4', category: 'audio', icon: 'mdi-apple', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'm4a')},
  {ext: 'ogg', mime: 'audio/ogg', category: 'audio', icon: 'mdi-music-circle', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'ogg')},

  // --- HIGH QUALITY / PRO ---
  {ext: 'flac', mime: 'audio/flac', category: 'audio', icon: 'mdi-diamond-stone', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'flac')},
  {ext: 'aiff', mime: 'audio/x-aiff', category: 'audio', icon: 'mdi-music-clef-treble', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'aiff')}, // Apple Lossless (старый)
  {ext: 'alac', mime: 'audio/mp4', category: 'audio', icon: 'mdi-apple', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'alac')}, // Apple Lossless

  // --- CINEMA / SURROUND ---
  {ext: 'ac3', mime: 'audio/ac3', category: 'audio', icon: 'mdi-speaker', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'ac3')}, // Dolby Digital
  {ext: 'dts', mime: 'audio/vnd.dts', category: 'audio', icon: 'mdi-speaker-wireless', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'dts')}, // Digital Theater Systems

  // --- SPECIFIC ---
  {ext: 'wma', mime: 'audio/x-ms-wma', category: 'audio', icon: 'mdi-windows', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'wma')},
  {ext: 'opus', mime: 'audio/opus', category: 'audio', icon: 'mdi-access-point', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'opus')},
  {ext: 'amr', mime: 'audio/amr', category: 'audio', icon: 'mdi-cellphone', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'amr')}, // Nokia / Voice Recorders
  {ext: 'voc', mime: 'audio/x-voc', category: 'audio', icon: 'mdi-gamepad-variant', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'voc')}, // Creative SoundBlaster (DOS Games)
  {ext: 'au', mime: 'audio/basic', category: 'audio', icon: 'mdi-server', conversions: AUDIO_CONVERSIONS.filter(c => c !== 'au')}, // Sun Microsystems / Java
] as const;

export const videoExtensions = new Set(videos.map(i => i.ext));
export const audioExtensions = new Set(audios.map(i => i.ext));
