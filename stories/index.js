/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { storiesOf, action, getStorybook } from '@kadira/storybook';
import { withKnobs, text } from '@kadira/storybook-addon-knobs';

import Button from './button';

/** note: decorators
 *  You can add decorator globally:
 *  addDecorator(muiTheme(greyTheme));
 *  You can pass a single object or an array of themes
 */

const fn = num => () => (
  <div>
    <h4>Custom Component {num}</h4>
    <button onClick={action(`Story number #${num}`)}>
        Press me {num} times
    </button>
  </div>
);
// `
// const story = storiesOf('React App', module)
    // .storyDecorator((story) => (<div><p>Decorator:</p>{story()}</div>))
    // .add('dummmy 1', fn(0))
    // .chapter('App')
    // .endOfChapter()
    // .add('App logo', fn(100))
    // .add('App welcome', fn(101))
    // .chapter('Left panel')
    //     .add('Button 1', fn(1))
    //     .add('Button 2', fn(2))
    //     .chapter('Bottom Panel')
    //         .add('Input 3', fn(3))
    //         .add('Input 4', fn(4))
    //         .endOfChapter()
    //     .chapter('Header Panel')
    //         .add('Input 5', fn(5))
    //         .add('Input 6', fn(6))
    //         .endOfChapter()
    //     .endOfChapter()
    // .chapter('Right panel')
    //     .add('Button 7', fn(7))
    //     .add('Button 8', fn(8))
    //     .endOfChapter()
    // .add('App footer', fn(110));

// storiesOf('Just story 1', module)
//     .add('Component 1', fn(0))
//     .add('Component 2', fn(0))
//     .add('Component 3', fn(0))
//     .add('Component 4', fn(0));

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

// storiesOf('add-Chapter', module)
//     .addChapter('add Left panel', chapter => chapter
//         .add('Fn 1', fn(1))
//         .add('Fn 2', fn(2))
//         // .addChapter('Bottom Panel', chapter => chapter
//         //     .add('Input 3', fn(3))
//         //     .add('Input 4', fn(4))
//         // )
//     )
//     .addChapter('add Header Panel', chapter => chapter
//         .add('Fn 5', fn(5))
//         .add('Fn 6', fn(6))
//     );
//     // .addChapter('Right panel', chapter => chapter
//     //     .add('Button 7', fn(7))
//     //     .add('Button 8', fn(8))
//     // )

storiesOf('React App', module)
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
        .add('Button 7', fn(7))
        .add('Button 8', fn(8))
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

console.log(getStorybook());