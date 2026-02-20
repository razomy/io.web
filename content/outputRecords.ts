import {type FileFormat} from '@razomy/fs-file-format';
import {images} from '@razomy/images';
import {videos} from '@razomy/videos';
import {audios} from '@razomy/audios';
import {type GroupKey} from './inputRecords';

export type IoType = 'number' | 'string' | 'file_path';
export type Absctact = 'pdf' | 'math' | 'camel_case' | 'string' | string;
export type IoInput = Absctact; // package name   = input  = string    = pdf = http
export type IoOutput = Absctact;// fumnction name = output = uppercase = png = post(action to complete)

const aT = 'argumentTypes';
const rT = 'returnType';

export interface OutputRecord {
  inputs: [GroupKey, ...IoInput[]];
  output: IoOutput;
  [aT]: IoType[];
  [rT]: IoType;
  iconName: string;
}

const strings = [
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'camel_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'capitalize', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'humanize', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'kebab_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'lower_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'pascal_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'slugify', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'snake_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'title_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'upper_case', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'text'], output: 'abriviation', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'case'], output: 'repeat', [aT]: ['string'], [rT]: 'string'},
  {iconName: 'mdi-text', inputs: ['string', 'case'], output: 'reverse', [aT]: ['string'], [rT]: 'string'},
] as const satisfies OutputRecord[];

const maths = [
  {iconName: 'mdi-math-compass', inputs: ['math'], output: 'sum', [aT]: ['number', 'number'], [rT]: 'number'},
  {iconName: 'mdi-math-compass', inputs: ['math'], output: 'substract', [aT]: ['number', 'number'], [rT]: 'number'},
] as const satisfies OutputRecord[];

function formatToCategory(f: FileFormat) {
  return f.conversions.map(i => ({
    iconName: f.iconUrl,
    inputs: [f.fileCategory , f.fileExtensionType],
    output: i,
    argumentTypes: ['file_path', f.fileExtensionType],
    returnType: 'file_path'
  }) as OutputRecord);
}

function formatsToCategory(fs: FileFormat[]) {
  return fs.reduce((a, c) => [...a, ...formatToCategory(c)], [] as OutputRecord[])
}

export const outputRecords = [
  ...formatsToCategory(images),
  ...formatsToCategory(audios),
  ...formatsToCategory(videos),
  ...strings,
  ...maths
] as const satisfies OutputRecord[];

export const outputRoutes = outputRecords
  .map(i => `/${i.inputs.join('/')}/${i.output}`);

export const outputRoutesSet = new Set(outputRoutes)

export const isValidConversion = (
  input: [GroupKey, ...IoInput[]],
  output: IoOutput | null = null) => {
  return !!outputRecords.find(i =>
    i.inputs.join('/') == input.join('/')
    && (i.output == output || output == null)
  )
}

const ioGroupRecordsSet: Record<string, { key: string, inputs: IoInput[], records: OutputRecord[] }> = {};
outputRecords.forEach(iof => {
  const key = iof.inputs.join('/');
  if (ioGroupRecordsSet[key]) {
    ioGroupRecordsSet[key].records.push(iof)
  } else {
    ioGroupRecordsSet[key] = {key, inputs: iof.inputs, records: [iof]}
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
      const e = queries.at(-1)!;
      const sourceMatch = fs.find(f => item.key.includes(f));
      const targetMatch = item.records.find(i => i.output.includes(e));
      return sourceMatch && targetMatch;
    }
  });
}