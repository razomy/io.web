import {type FileFormat} from '@razomy/fs-file-format';
import {images} from '@razomy/images';
import {videos} from '@razomy/videos';
import {audios} from '@razomy/audios';
import {type GroupKey} from './io_groups';

export type IoType = 'number' | 'string' | 'file_path';
export type Absctact = 'pdf' | 'math' | 'camel_case' | 'string' | string;
export type IoInput = Absctact; // package name   = input  = string    = pdf = http
export type IoOutput = Absctact;// fumnction name = output = uppercase = png = post(action to complete)

const aT = 'argumentTypes';
const rT = 'returnType';

export interface IoRecord {
  input: [GroupKey, ...IoInput[]];
  output: IoOutput;
  [aT]: IoType[];
  [rT]: IoType;
  iconName: string;
}

const strings = [
  {iconName: 'mdi-text', input: ['string'], output: 'camel_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'capitalize', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'humanize', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'kebab_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'lower_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'pascal_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'slugify', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'snake_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'title_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'upper_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'abriviation', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'repeat', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', input: ['string'], output: 'reverse', [aT]: ['string'], [rT]: 'string'},
] as const satisfies IoRecord[];

const maths = [
  {iconName: 'mdi-math-compass', input: ['math'], output: 'sum', [aT]: ['number', 'number'], [rT]: 'number'},
  {iconName: 'mdi-math-compass', input: ['math'], output: 'substract', [aT]: ['number', 'number'], [rT]: 'number'},
] as const satisfies IoRecord[];

function formatToCategory(f: FileFormat) {
  return f.conversions.map(i => ({
    iconName: f.iconUrl,
    input: [f.fileCategory , f.fileExtensionType],
    output: i,
    argumentTypes: ['file_path', f.fileExtensionType],
    returnType: 'file_path'
  }) as IoRecord);
}

function formatsToCategory(fs: FileFormat[]) {
  return fs.reduce((a, c) => [...a, ...formatToCategory(c)], [] as IoRecord[])
}

export const ioFunctions = [
  ...formatsToCategory(images),
  ...formatsToCategory(audios),
  ...formatsToCategory(videos),
  ...strings,
  ...maths
] as const satisfies IoRecord[];

export const pairRoutes = ioFunctions
  .map(i => `/${i.input.join('/')}/${i.output}`);

export const pairRoutesSet = new Set(pairRoutes)

export const isValidConversion = (
  input: [GroupKey, ...IoInput[]],
  output: IoOutput | null = null) => {
  return !!ioFunctions.find(i =>
    i.input.join('/') == input.join('/')
    && (i.output == output || output == null)
  )
}

const ioGroupRecordsSet: Record<string, { key: string, input: string[], records: IoRecord[] }> = {};
ioFunctions.forEach(iof => {
  const key = iof.input.join('/');
  if (ioGroupRecordsSet[key]) {
    ioGroupRecordsSet[key].records.push(iof)
  } else {
    ioGroupRecordsSet[key] = {key, input: iof.input, records: [iof]}
  }
})
const ioGroupRecords = Object.values(ioGroupRecordsSet);

export function ioFilterBy(value: string) {
  const query = value.toLowerCase().trim();
  if (!query) return ioGroupRecords;
  const queries = query.split(/ |,|to/);

  return ioGroupRecords.filter(item => {
    if (queries.length === 1) {
      const sourceMatch = queries.find(f => item.key.includes(f));
      const targetMatch = queries.find(f => item.records.find(i => i.output.includes(f)));
      return sourceMatch || targetMatch;
    } else {
      const fs = queries.slice(0, queries.length - 1);
      const e = queries.at(-1);
      const sourceMatch = fs.find(f => item.key.includes(f));
      const targetMatch = item.records.find(i => i.output.includes(e));
      return sourceMatch && targetMatch;
    }
  });
}