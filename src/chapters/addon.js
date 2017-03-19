import { chapterSelect } from './navigate';
import { addRoot } from './store';
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
 *  - `enable(enableFn)`
 *
 *  - `disable(enableFn)`
 *
 *  - `bookmark(goToBookmark)`
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
        parent: api._currentСhapter || null, // !!!
        storyKindInstance: api,
        name, // !!!
        subchapters: [],
        stories: [],
        decorators: api._storyDecorators,
        TOC: api.storyTOC || chapterTOC,
    };
}

function initChapters(api) {
/** note: initChapters
 *  here we inject fields, functions and replace some functions
 *  inside the api object returned by storiesOf
 *  in oder to add "chapter" features to stories
 *  (see client_api.js in react-storybook)
 *  we need to do it ones for each storiesOf instance
 */
    const apiChapters = api;

    apiChapters._add = api.add;
    apiChapters._storyDecorators = api._storyDecorators || [];

    apiChapters._chapter = createChapter(api, api.kind);
    apiChapters._currentСhapter = api._chapter;

/** add TOC story to the current "root chapter" */
    api._add('[.]', api._chapter.TOC(api._chapter));

/** save this root object in the addon store */
    addRoot(api._chapter);

/** left message to not scary other addon developers :) */
    apiChapters.warning = `
    This API was changed by storybook-chapters addon!
    see https://github.com/sm-react/storybook-chapters
`;
}

function addToChapter(api, storyName, getStory) {
/** note: addToChapter
 *  - adds story to current chapter
 * (when we use .add() after chapters init)
 */
    api._currentСhapter.stories.push({ storyName, getStory });
    if (api._currentСhapter === api._chapter) {
        api._add(storyName, getStory);
    }
    return api;
}

function addNewChapter(api, newchapterName) {
/** note: addNewChapter -
  * - adds subchapter to current chapter
  * (when we use .chapter() after chapters init)
  */
    const apiChapters = api;

    setKindIndex(newchapterName);
    const newchapter = createChapter(api, newchapterName);
    api._currentСhapter.subchapters.push(newchapter);

    if (api._currentСhapter === api._chapter) {
        api._add(
            `[${newchapterName}]`,
            chapterSelect(newchapter, api._currentСhapter.name),
        );
    }

    apiChapters._currentСhapter = newchapter;

    return api;
}

const addons = {
    chapter(chapterName, customToC) {
        /**
         *  It calls only once to init chapters for storiesOf
         *  and to create the root of chapters
         *  it substitutes .add(), .chapter() and .endOfChapter()
         *  for the next calls
         */
        if (!this._currentСhapter) {
            /** we need to init "chapters" in first call
             *  some other functions can do it before chapter()
             */
            initChapters(this);
        }

        /** Create **root** chapter */
        addNewChapter(this, chapterName);

        /** substitute add() and chapter()
         *  because we don't need to invoke them immidiately
         *  we just store them in "subchapters"
         */
        this.add = (storyName, getStory) => addToChapter(this, storyName, getStory);
        this.chapter = name => addNewChapter(this, name);

        /** substitute endOfChapter() to work properly */
        this.endOfChapter = () => {
            this._currentСhapter = this._currentСhapter.parent || this._currentСhapter;
            return this;
        };
    },
    storyDecorator(fn) {
        this._storyDecorators = this._storyDecorators || [];
        this._storyDecorators.push(fn);
        this.addDecorator(fn);
    },
    endOfChapter() {
        /** we don't need to use endOfChapter() before chapter()
         *  so now it's just dummy and don't do anything
         *  we'll substitute in chapter() to start work
         */
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
};

export default addons;
