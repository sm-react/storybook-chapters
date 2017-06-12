import { chapterSelect } from './navigate';
import { addRoot, storiesEnable } from './store';
import { setKindIndex } from './utils';
import { chapterTOC } from './defaults';

/**
 *  This module provides "chapters" interface for developing stories.
 *  It's accessible as methods (addons) of `storiesOf`:
 *
 *  - `.chapter(name, ToC)` enables "chapters", init root chapter
 *  and adds subchapters to `storiesOf`
 *
 *  - `.add(name, story)` adds stories to current chapter
 * (warning: dont use .add() before first .chapter()!)
 *
 *  - `.endOfChapter()` jumps to the parent chapter
 *
 *  - `.storyDecorator(decorator)` adds decorators to whole `storiesOf` (including subchapters)
 *
 *  - `enable(enableFn => {})`
 *
 *  - `disable(enableFn => {})`
 *
 *  - `bookmark(goToBookmark => {})`
 *
 *  - `bookmarkList(customToC)`
 *
 *  - `toc(customToC)`
 *
 */

function createChapter(api, name) {
/** note: _chapter
 *  we store all "chapter" details here
 *  subchapters - is array with "sub chapters" (which adds via .chapter() function)
 *  stories - is array with stories of current chapter (which adds via .add() function)
 */
    return {
        parent: api._currentСhapter || null,
        storyKindInstance: api,
        name,
        subchapters: [],
        stories: [],
        decorators: api._storyDecorators,
        TOC: api.storyTOC || chapterTOC,
        rootStore: null, /** we add this in initChapters after addRoot() */
    };
}

function addToChapter(api, storyName, getStory) {
/** note: addToChapter
 *  - adds story to current chapter
 * (when we use .add() after chapters init)
 */
    api._currentСhapter.stories.push({ storyName, getStory });

    const isEnable = api._currentСhapter.rootStore.enable;
    if (api._currentСhapter === api._chapter && isEnable) {
        api._add(storyName, getStory);
    }
    return api;
}

function addNewChapter(api, newchapterName) {
/** note: addNewChapter -
  * - adds subchapter to current chapter
  * (when we use .chapter() after chapters init)
  */
    const apiStories = api;

    setKindIndex(newchapterName);
    const newchapter = createChapter(api, newchapterName);
    newchapter.rootStore = api._currentСhapter.rootStore;

    api._currentСhapter.subchapters.push(newchapter);

    if (api._currentСhapter === api._chapter) {
        api._add(
            `[${newchapterName}]`,
            chapterSelect(newchapter, api._currentСhapter.name),
        );
    }

    apiStories._currentСhapter = newchapter;

    return api;
}

function addRecursiveChapter(api, name, subChapterFn) {
/** note: addRecursiveChapter
 * Recursive API to add chapters
 */
    const apiStories = api;
    const currentСhapter = api._currentСhapter;
    addNewChapter(api, name);
    subChapterFn(api);
    apiStories._currentСhapter = currentСhapter;
    return api;
}

function shiftToParent(api) {
/** note: shiftToParent
 * set _currentСhapter pointer to the parent chapter or to the root
 */
    const apiStories = api;
    apiStories._currentСhapter = api._currentСhapter.parent || api._currentСhapter;
    return api;
}

function initChapters(api) { // todo: new API initAddon - to inject this to stories
/** note: initChapters
 *  here we inject fields, functions and replace some functions
 *  inside the api object returned by storiesOf
 *  in oder to add "chapter" features to stories
 *  (see client_api.js in react-storybook)
 *  we need to do it ones for each storiesOf instance
 */
    if (api._currentСhapter) {
        // if Chapter already initialized don't do anything
        return;
    }
    const apiStories = api; // todo: rename to apiStories

    apiStories._add = api.add; // hello ESLint
    apiStories._storyDecorators = api._storyDecorators || [];

    apiStories._chapter = createChapter(api, api.kind);
    apiStories._currentСhapter = api._chapter;

/** add TOC story to the current "root chapter" */
    api._add('[.]', api._chapter.TOC(api._chapter));

/** save this root object in the addon store */
    apiStories._chapter.rootStore = addRoot(api._chapter);

    apiStories.add = (storyName, getStory) => addToChapter(api, storyName, getStory);
    apiStories.chapter = name => addNewChapter(api, name);
    apiStories.addChapter = (name, subChapterFn) => addRecursiveChapter(api, name, subChapterFn);
    apiStories.endOfChapter = () => shiftToParent(api);

/** left message to not scary other addon developers :) */
    apiStories.warning =
`This API was changed by storybook-chapters addon!
see https://github.com/sm-react/storybook-chapters`;
}

function treeEnable(api, fn, isEnable) {
    initChapters(api);
    const enableFn = (isEnb = true) => storiesEnable(api._currentСhapter, isEnb);
    enableFn(isEnable);
    if (fn) {
        try {
            fn(enableFn);
        } catch (err) {
            console.warn(err);
        }
    }
}

const addons = {
    chapter(chapterName) {
      // todo: depricate customToC, use .toc instead
        initChapters(this);
        /** Create first "sub chapter" after **root**  */
        addNewChapter(this, chapterName);
    },

    addChapter(chapterName, chapterFn) {
        initChapters(this);
        /** Create first "sub chapter" after **root**  */
        addNewChapter(this, chapterName);
        chapterFn(this);
        shiftToParent(this);
    },

    storyDecorator(fn) {
        initChapters(this);
        this._storyDecorators = this._storyDecorators || [];
        this._storyDecorators.push(fn);
        this.addDecorator(fn);
    },
    endOfChapter() {
        /** we don't need to use endOfChapter() before chapter()
         *  so now it's just dummy and don't do anything
         *  we'll substitute in chapter() to start work
         */
        initChapters(this);
    },
    enable(fn) {
        treeEnable(this, fn, true);
    },
    disable(fn) {
        treeEnable(this, fn, false);
    },
    bookmark(fn) {
        /** it's a next feature */
        const dummyfn = () => {};
        fn(dummyfn);
    },
    bookmarkList(customToC) {
        /** it's a next feature */

    },
    toc(customToC) {
        /** it's a next feature */
        // const renderToC = customToC ? customToC(crumbs, chapters, stories) : chapterTOC;
    },
    _(storyName, getStory) {
        if (!this._currentСhapter) {
            /** we need to init "chapters"
             *  some other functions can do it as well
             */
            initChapters(this);
        }
        this.add(storyName, getStory);
    },
};

export default addons;
