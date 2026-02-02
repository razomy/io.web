import {defineSitemapEventHandler} from '#imports'
// import { db } from '~/server/db/database.js';

export default defineSitemapEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    // const monsterUrls =(await db.getMonsters(['en'])).map((monster) => `/monsters/${monster.id}`);
    const buildTime = new Date(Number(config.public.BUILD_TIME) * 1000).toISOString();
    // return monsterUrls.map(page => ({
    //     loc: page,
    //     _i18nTransform: true,
    //     lastmod: buildTime,
    // }));
    return []
})