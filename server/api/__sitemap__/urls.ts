import {defaultIoConfig, loadNpmPackageCommandsWithCommands} from "~~/razomy/_db/loadNpmPackageCommands";


export default defineSitemapEventHandler(async () => {
  const {
    directoriesTree,
    commands,
    directories
  } = await loadNpmPackageCommandsWithCommands(defaultIoConfig);

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
