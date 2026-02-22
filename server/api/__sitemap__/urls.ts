import {directories} from '~~/razomy/db/directories';
import {commands} from '~~/razomy/db';

export default defineSitemapEventHandler(async () => {
  return [
    ...directories.map(page => ({
      loc: page.directoryPath.join('/'),
      _i18nTransform: true,
      lastmod: page.updateDatetime,
    })),
    ...commands.map(page => ({
      loc: page.url,
      _i18nTransform: true,
      lastmod: page.updateDatetime,
    })),
  ]
})