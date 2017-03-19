const modDEL = {
    hot: {
        dispose(fn) {
            fn();
        },
    },
};

export { modDEL };

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
