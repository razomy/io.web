export const inputRecords = [
  {key: 'home', iconName: 'mdi-home', labelText: 'io-web.db.inputs.home'},
  {key: 'image', iconName: 'mdi-image-multiple', labelText: 'io-web.db.inputs.image'},
  {key: 'document', iconName: 'mdi-file-document-multiple', labelText: 'io-web.db.inputs.document'},
  {key: 'video', iconName: 'mdi-video', labelText: 'io-web.db.inputs.video'},
  {key: 'audio', iconName: 'mdi-music', labelText: 'io-web.db.inputs.audio'},
  {key: 'math', iconName: 'mdi-math-compass', labelText: 'io-web.db.inputs.math'},
  {key: 'string', iconName: 'mdi-text', labelText: 'io-web.db.inputs.string'},
] as const satisfies { key: string, iconName: string, labelText: string }[];

export type GroupKey = typeof inputRecords[number]['key']

export const inputRecordsSet: Record<string, { key: string, iconName: string, labelText: string }> = {};
inputRecords.forEach(iof => {
  const key = iof.key;
  inputRecordsSet[key] = iof
})
