import React from 'react';
import { configure, storiesOf, linkTo } from '@kadira/storybook';
import { modDEL } from './utils';
import { chapterTOC } from './defaults';

// const debugCount = 0;

export function setKindIndex(kindName) {
    storiesOf(kindName, module).add('dummmy 1', () => (<div />));
    storiesOf(kindName, modDEL);
}

export function newStorybook(chapter) {
    const chapterList = chapter.subchapters;
    const storyList = chapter.stories;
    const decoratorList = chapter.decorators;
    return () => {
        const newStory = storiesOf(chapter.name, module);
        decoratorList.forEach(fn => newStory.addDecorator(fn));
        newStory.add('[.]', chapterTOC(chapter));
        if (chapter.parent) {
            newStory.add('[..]', chapterSelect(chapter.parent, chapter.name));
        }
        chapterList.forEach((subchapter) => {
            newStory.add(`[${subchapter.name}]`, chapterSelect(subchapter, chapter.name));
        });
        storyList.forEach(({ storyName, getStory }) => {
            newStory.add(storyName, getStory);
        });
    };
}

function rebuildStorybook(currentchapter) {
    configure(newStorybook(currentchapter), module);
}

export function chapterSelect(chapter, prevKindName) {
    return () => {
        const name = chapter.name;
        storiesOf(prevKindName, modDEL);
        rebuildStorybook(chapter);
        linkTo(chapter.name, '.')();
        return (
          <button onClick={() => { rebuildStorybook(chapter); }}>
            <p>Redirect to {name} chapter</p>
          </button>
        );
    };
}

