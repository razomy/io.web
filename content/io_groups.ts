export const ioGroups = [
  {key: 'home', iconName: 'mdi-home', labelKey: 'groups.home'},
  {key: 'image', iconName: 'mdi-image-multiple', labelKey: 'groups.image'},
  {key: 'document', iconName: 'mdi-file-document-multiple', labelKey: 'groups.document'},
  {key: 'video', iconName: 'mdi-video', labelKey: 'groups.video'},
  {key: 'audio', iconName: 'mdi-music', labelKey: 'groups.audio'},
  {key: 'math', iconName: 'mdi-math-compass', labelKey: 'groups.math'},
  {key: 'string', iconName: 'mdi-text', labelKey: 'groups.string'},
] as const satisfies { key: string, iconName: string, labelKey: string }[];

export type GroupKey = typeof ioGroups[number]['key']

export const ioGroupSet: Record<string, { key: string, iconName: string, labelKey: string }> = {};
ioGroups.forEach(iof => {
  const key = iof.key;
  ioGroupSet[key] = iof
})
