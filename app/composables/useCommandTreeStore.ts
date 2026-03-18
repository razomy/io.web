import { defineStore } from 'pinia';
import {commands, getCommandBy, isCommandExists, getCommandById} from '~~/razomy/_db/commands';
import {directoryToNavigationNode} from '~~/razomy/io/command/directory';
import {directoriesTree, getDirectoryByFilter, isDirectoryExists, getDirectoryBy} from '~~/razomy/_db/directories';
import {systemSet} from '~~/razomy/_db/systems';

export const useCommandTreeStore = defineStore('commandTreeStore', {
  state: () => ({
    isLoading: true,
    config: null,
    commands,
    directoriesTree,
    systemSet,
  }),

  actions: {
    getCommandBy,
    isCommandExists,
    getCommandById,
    getDirectoryByFilter, isDirectoryExists, getDirectoryBy,
    directoryToNavigationNode,
    saveConfigToStorage() {
      // import.meta.client - проверка Nuxt 3, что мы в браузере
      if (import.meta.client) {
        localStorage.setItem('commandTreeStore.config', JSON.stringify(this.config))
      }
    },

    // Вызываем этот метод при загрузке приложения
    loadConfigFromStorage() {
      if (import.meta.client) {
        const saved = localStorage.getItem('commandTreeStore.config')
        if (saved) {
          this.config = JSON.parse(saved)
        }
      }
    },
    async initUserEnvironment(userId: string | null) {
    //   if (!this.isLoading && this.directoriesTree.length > 0) return; // Уже загружено
    //
    //   try {
    //     // 1. Загружаем дельту конфига пользователя (те самые 10%)
    //     // const userConfig = await $fetch(`/api/users/${userId}/config`);
    //     // Имитация загруженного конфига:
    //     this.config.npmRazomyPackages = { '@razomy/string-case@0.0.1-beta.4': true };
    //
    //     const directoriesMap = new Map<string, IoDirectory>();
    //
    //     // 2. Параллельно грузим ТОЛЬКО нужные пакеты
    //     const packagesToLoad = Object.keys(this.config.npmRazomyPackages).filter(k => this.config.npmRazomyPackages[k]);
    //
    //     const loadPromises = packagesToLoad.map(async (pkgString) => {
    //       // '@razomy/string-case@0.0.1' -> '@razomy/string-case'
    //       const cleanName = pkgString.split('@').slice(0, 2).join('@');
    //
    //       if (registryCache.has(cleanName)) return registryCache.get(cleanName);
    //
    //       // Динамический импорт Vite (работает на лету, собирает чанки)
    //       const [pkgJson, specs] = await Promise.all([
    //         import(`../../node_modules/${cleanName}/package.json`),
    //         import(`../../node_modules/${cleanName}/specifications.json`)
    //       ]);
    //
    //       const name = pkgJson.default.name;
    //       const dpPackage = name.replace('@razomy/', '').split('-'); // ['string', 'case']
    //       const rootKey = dpPackage[0]; // 'string'
    //
    //       // Сохраняем функцию ленивой загрузки самого модуля для роутера
    //       this.registry[name] = () => import(`../../node_modules/${cleanName}/index.js`);
    //
    //       // Строим команды
    //       const commands = specs.default.map((spec: any) => ({
    //         metaIconName: 'mdi-text',
    //         ...cA,
    //         ...hRA,
    //         directoryPath: dpPackage,
    //         environment: eB(this.registry, name, spec.name),
    //         spec,
    //       })) as IoCommandTemplate[];
    //
    //       const childDirectory: IoDirectory = {
    //         id: dpPackage.join('.'),
    //         directoryKey: dpPackage[1] || rootKey,
    //         directoryPath: dpPackage,
    //         meta: {
    //           iconName: 'mdi-text',
    //           nameTk: lT(`${rootKey}.children.${dpPackage[1]}`),
    //           updateDatetime: new Date().toISOString(),
    //           url: '/' + dpPackage.join('/')
    //         },
    //         commands: commands.map(templateToCommand),
    //         directories: [],
    //       };
    //
    //       const parsedData = { rootKey, childDirectory };
    //       registryCache.set(cleanName, parsedData);
    //       return parsedData;
    //     });
    //
    //     const loadedModules = await Promise.all(loadPromises);
    //
    //     // 3. Собираем финальное дерево (Группируем по корневым папкам, например 'string')
    //     loadedModules.forEach(({ rootKey, childDirectory }) => {
    //       if (!directoriesMap.has(rootKey)) {
    //         directoriesMap.set(rootKey, {
    //           id: rootKey,
    //           directoryKey: rootKey,
    //           directoryPath: [rootKey],
    //           meta: {
    //             iconName: 'mdi-folder',
    //             updateDatetime: new Date().toISOString(),
    //             nameTk: lT(rootKey),
    //             url: `/${rootKey}`
    //           },
    //           commands: [],
    //           directories: []
    //         });
    //       }
    //       directoriesMap.get(rootKey)!.directories.push(childDirectory);
    //     });
    //
    //     this.directoriesTree = Array.from(directoriesMap.values());
    //   } catch (e) {
    //     console.error('Failed to load user environment', e);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
    //
    // // Функция поиска перенесена в стор, чтобы работать с динамическими данными
    // getDirectoryByFilter(searchQuery: string): IoDirectory[] {
    //   if (!searchQuery) return this.directoriesTree.flatMap(d => d.directories);
    //
    //   const lowerSearch = searchQuery.toLowerCase();
    //   return this.directoriesTree.flatMap(d => d.directories).filter(dir => {
    //     return dir.meta.nameTk?.toLowerCase().includes(lowerSearch) ||
    //       dir.commands.some(c => c.meta.nameTk?.toLowerCase().includes(lowerSearch));
    //   });
    }
  }
});
