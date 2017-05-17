import { storiesOf } from '@kadira/storybook';

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
    if (!kindName) return;

    storiesOf(kindName, module).add('_', () => null);
    storiesOf(kindName, modDEL);
}

export function setKindIndex(kindName) {
    /**
     * here we store storyKind index and clean it
     * it keeps the oder of storyKinds
     */
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
    if (typeof (str) === 'string') {
        return str;
    }
    return chapter.name;
}

export function strToCrumbs(str, divChar = '/') {
    return str.split(divChar);
}
