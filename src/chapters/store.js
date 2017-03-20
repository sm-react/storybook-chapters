import { breadcrumbs, crumbsString, strToCrumbs } from './utils';
import { chapterHide, chapterShow } from './navigate';

/** note: `channelStore`
  * store to communicate through the channel
  * via [storybook-adk](https://github.com/sm-react/storybook-adk)
  * we need it to fetch and set querry data here
  */
let channelStore = null;
let queryData = {};

const chapterRootMap = {};

function findRoot(chapter) {
    const rootName = breadcrumbs(chapter)[0].name;
    return chapterRootMap[rootName] || null;
}

function lookForPath(chapNamesArr, currChap) {
    if (chapNamesArr.length === 0) {
        return currChap;
    }
    const nextName = chapNamesArr[0];
    const nextChap = currChap.subchapters.find(val => (val.name === nextName));
    if (nextChap) {
        return lookForPath(chapNamesArr.slice(1), nextChap);
    }
    return null;
}

function checkPath(chapNamesArr) {
    const lookingChap = chapterRootMap[chapNamesArr[0]];
    if (!lookingChap) return false;
    return lookForPath(chapNamesArr.slice(1), lookingChap.chapter);
}

export function setStore(store) {
    channelStore = store;
    const stopSubscription = channelStore.watch('queryData', (data) => {
//        console.info('queryData in addon:', data);
        queryData = data;
        stopSubscription();

        const chapNamesArr = strToCrumbs(queryData.chapter);
        const reqChap = checkPath(chapNamesArr);
//        console.log('reqChap:', reqChap);
        if (reqChap) {
        // temporary disable
//            chapterSelect(reqChap, findRoot(reqChap).chapter.name)();
        }
    });
}

export function getStore() {
    return channelStore;
}

export function addRoot(chapter) {
    const root = {
        chapter,
        current: chapter, // ??
        enable: true, // note: new feature
    };
    chapterRootMap[chapter.name] = root;
    return root;
}

export function setCurrentChapter(chapter) {
    const rootStored = findRoot(chapter);
    if (rootStored) {
        rootStored.current = chapter;
    }
    queryData.chapter = crumbsString(chapter);
    // temporary disable this:
//    channelStore.set('queryData', queryData); // fixme: check errors in adk
}

export function getEnabledMap() {
    const keys = Object.keys(chapterRootMap);
    const map = {};
    keys.forEach((val) => {
        map[val] = chapterRootMap[val].enable;
    });
    return map;
}

export function setEnabledMap(map) {
    const keys = Object.keys(map);
    const chapterRoots = Object.keys(chapterRootMap);
    keys.forEach((val) => {
        if (chapterRoots.find(name => (name === val))) {
            chapterRoots[val].enable = map[val];
            storiesEnable(chapterRoots[val], map[val]);
        }
    });
}

function sendEnabledMap(rootStored) {
    const storedMap = channelStore.get('enabledMap');
    if (!storedMap || !storedMap[rootStored.chapter.name] ||
        (storedMap[rootStored.chapter.name].enable !== rootStored.enable)) {
        channelStore.set('enabledMap', getEnabledMap());
    }
}

/*
export function storiesDisable(chapter) {
    const rootStored = findRoot(chapter);
    if (rootStored && rootStored.enable) {
        rootStored.enable = false;
        chapterHide(rootStored.current);
        sendEnabledMap(rootStored);
    }
}
*/

export function storiesEnable(chapter, isEnable = true) {
    const rootStored = findRoot(chapter);
    if (rootStored && (rootStored.enable !== isEnable)) {
        rootStored.enable = isEnable;
        if (isEnable) {
            chapterShow(rootStored.current);
        } else {
            chapterHide(rootStored.current);
        }

        sendEnabledMap(rootStored);
    }
}
