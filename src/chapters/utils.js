import { configure, storiesOf, linkTo } from '@kadira/storybook';

const modDEL = {
    hot: {
        dispose(fn) {
            fn();
        },
    },
};

export { modDEL };

export function cleanStoriesOf(kindName) {
/** note: cleanStoriesOf
  * remove storyKind from list
  * but keep in index
  */
    storiesOf(kindName, modDEL);
}

export function setKindIndex(kindName) {
    storiesOf(kindName, module).add('dummmy 1', () => (null));
    cleanStoriesOf(kindName);
}

export function breadcrumbs(chapter, tail) {
    return (
        !chapter ? tail : breadcrumbs(chapter.parent, [chapter, ...(tail || [])])
    );
}

export function crumbsString(chapter, divChar = '/') {
    const crumbsArr = breadcrumbs(chapter);
    const str = crumbsArr.reduce((prev, val) => (
        `${prev.name || prev}${divChar}${val.name}`
    ));
    return str;
}

export function strToCrumbs(str, divChar = '/') {
    return str.split(divChar);
}
