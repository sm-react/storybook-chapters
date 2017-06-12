/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { storiesOf, getStorybook } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import { jumpTo } from '../src';

import Button from './button';

/** note: decorators
 *  You can add decorator globally:
 *  addDecorator(muiTheme(greyTheme));
 *  You can pass a single object or an array of themes
 */
const bookmarks = {};

const fn = (num, bm) => () => (
  <div>
    <h4>Custom Component {num}</h4>
    <button onClick={bm ? bookmarks[bm] : action(`Story number #${num}`)}>
        Press me {num} times
    </button>
  </div>
);

const select = {
    set1: () => {},
    set2: () => {},
    go1() {
//        select.set1(false);
        return () => {
            return (<button onClick={() => select.set1(false)}>set1 on</button>);
        };
    },
    go2() {
        return () => {
//            select.set2(true);
            return (<button onClick={() => select.set2(true)}>set2 on</button>);
        };
    },
};

storiesOf('.addChapter API', module)
    .addChapter('Atoms with bookmarks', chapter => chapter
        .add('Atom 1 with bookmarks.at1', fn(1))
        .bookmark((bm) => { bookmarks.at1 = bm; })
        .add('Atom 2 bookmarks.at2', fn(2))
        .bookmark((bm) => { bookmarks.at2 = bm; })
        .add('Bookmark To Atom1', () => (
            <div>
                <p>{'Use bookmark: onClick={bookmarks.at1}'}</p>
                <button onClick={bookmarks.at1}>
                    Go
                </button>
            </div>
        ))
        .add('Bookmark To Atom2', () => (
            <div>
                <p>{'Use bookmark: onClick={bookmarks.at2}'}</p>
                <button onClick={bookmarks.at2}>
                    Go
                </button>
            </div>
        ))
        .add('Bookmark To Right Panel', () => (
            <div>
                <p>{'Use bookmark: onClick={bookmarks.rgt}'}</p>
                <button onClick={bookmarks.rgt}>
                    Go
                </button>
            </div>
        ))
        .add('Jump To Organism 1', () => (
            <div>
                <p>{"Use jumpTo: onClick={jumpTo('Organisms', 'Organism 1')}"}</p>
                <button onClick={jumpTo('Organisms', 'Organism 1')}>
                    Go
                </button>
            </div>
        ))
        .bookmarkList()
        .addChapter('Molecules', chapter => chapter
            .addChapter('Organisms', chapter => chapter
                .add('Organism 1', fn(7))
                .add('Organism 2', fn(8)),
            )
            .addWithInfo('Molecule 1', fn(1))
            .addWithInfo('Molecule 2', fn(2)),
        )
        .add('Atom 3', fn(3))
        .add('Atom 4', fn(4)),
    )
    .add('choose Dark side', () => {
        select.set1(false);
        select.set2();
        return (<div>{'select.set1(false) -> Heroes Dark'}</div>);
    })
    .add('choose Light side', () => {
        select.set1();
        select.set2(false);
        return (<div>{'select.set2(false) -> Heroes Light'}</div>);
    });


storiesOf('.chapter API', module)
    .storyDecorator(withKnobs)
    .chapter('Left panel')
        .chapter('Bottom Panel')
            .add('Input 3', () => <span>[3]: {text('[3]', '33')}</span>)
            .add('Input 4', () => <span>[4]: {text('[4]', '44')}</span>)
            .endOfChapter()
        .chapter('Header Panel')
            .addWithInfo('Input 5', fn(5))
            .addWithInfo('Input 6', fn(6), { inline: true })
            .endOfChapter()
        .endOfChapter()
    .chapter('Right panel')
        .bookmark((bm) => { bookmarks.rgt = bm; })
        .add('Button 7', fn(7))
        .bookmark((bm) => { bookmarks.But7 = bm; })
        .add('Button 8', fn(8, 'But7'))
        .add('Bookmark', fn(8, 'atoms'))
        .bookmarkList()
        .endOfChapter()
    .add('Dark side', () => {
        select.set1(false);
        select.set2();
        return (<div>{'select.set1(false)'}</div>);
    })
    .add('Light side', () => {
        select.set1();
        select.set2(false);
        return (<div>{'select.set2(false)'}</div>);
    })
    .add('App footer', fn(110));


storiesOf('Heroes Light', module)
    .disable((en) => { select.set1 = en; })
    .add('Light 1', fn(0))
    .add('Light 2', fn(0))
    .add('Light 3', fn(0))
    .add('Light 4', fn(0));

storiesOf('Heroes Dark', module)
    .enable((en) => { select.set2 = en; })
    .add('Dark 1', fn(0))
    .add('Dark 2', fn(0))
    .add('Dark 3', fn(0))
    .add('Dark 4', fn(0));

storiesOf('Mixed API', module)
    .addChapter('Atoms new', chapter => chapter
        .add('Atom 1', fn(1))
        .bookmark((bm) => { bookmarks.Atom1 = bm; })
        .add('Atom 2', fn(2, 'Atom1'))
        .addChapter('Molecules new', chapter => chapter
            .chapter('Cells old')
                .add('Cell 1', fn(1))
                .add('Cell 2', fn(2))
                .addChapter('Organisms new in old', chapter => chapter
                    .add('Organism 1', fn(1))
                    .add('Organism 2', fn(2)),
                )
                .endOfChapter()
            .add('Molecule 1', fn(1))
            .add('Molecule 2', fn(2)),
        )
        .add('Atom 3', fn(3))
        .add('Atom 4', fn(4)),
    )
    .add('new API docs', fn(3))
    .add('prev API docs', fn(4));

// console.log(getStorybook());
