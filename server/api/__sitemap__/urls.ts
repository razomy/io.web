import {directories} from '~~/razomy/db/directories';
import {commands} from '~~/razomy/db';

export default defineSitemapEventHandler(async () => {
  return [
    ...directories.map(page => ({
      loc: page.directoryPath.join('/'),
      _i18nTransform: true,
      lastmod: page.meta.updateDatetime,
    })),
    ...commands.map(page => ({
      loc: page.meta.url,
      _i18nTransform: true,
      lastmod: page.meta.updateDatetime,
    })),
  ]
})