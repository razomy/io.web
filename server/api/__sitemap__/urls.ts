// import { db } from '~/server/db/database.js';

import {c} from '~~/content/context';

export default defineSitemapEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const routes = c.routes;
  const buildTime = new Date(Number(process.env.BUILD_TIME) * 1000).toISOString();
  return routes.map(page => ({
      loc: page,
      _i18nTransform: true,
      lastmod: buildTime,
  }));
})