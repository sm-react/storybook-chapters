import { chapterSelect, setKindIndex, newStorybook } from './navigate';
import { chapterTOC } from './defaults';

const modHMR = module;


const addons = {
    chapter(chapterName) {
        if (!this._chapter) {
            this._add = this.add;
            this._storyDecorators = this._storyDecorators || [];
            this._chapter = {
                parent: null,
                storyKindInstance: this,
                name: this.kind,
                subchapters: [],
                stories: [],
                decorators: this._storyDecorators,
            };
            this._currentСhapter = this._chapter; // null;
            this._add('[.]', chapterTOC(this._chapter));
        }

        const addTochapter = (storyName, getStory) => {
            this._currentСhapter.stories.push({ storyName, getStory });
            if (this._currentСhapter === this._chapter) {
                this._add(storyName, getStory);
            }
            return this;
        };

        const addNewchapter = (newchapterName) => {
            // console.info(`adding chapter ${newchapterName}:`);
            // console.log(`Current chapter:`, this._currentСhapter.name);
            setKindIndex(newchapterName);
            const newchapter = {
                parent: this._currentСhapter,
                storyKindInstance: this,
                name: newchapterName,
                subchapters: [],
                stories: [],
                decorators: this._storyDecorators,
            };
            this._currentСhapter.subchapters.push(newchapter);

            if (this._currentСhapter === this._chapter) {
                this._add(
                    `[${newchapterName}]`,
                    chapterSelect(newchapter, this._currentСhapter.name),
                );
            }

            this._currentСhapter = newchapter;

            // console.log('chapters:', this._chapter);
            return this;
        };
        addNewchapter(chapterName);

        this.add = (storyName, getStory) => addTochapter(storyName, getStory);
        this.chapter = name => addNewchapter(name);
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
};

export default addons;
