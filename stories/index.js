/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs';

import Button from './button';

/** note: decorators
 *  You can add decorator globally:
 *  addDecorator(muiTheme(greyTheme));
 *  You can pass a single object or an array of themes
 */


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

// storiesOf('Just story 2', module)
//     .add('Component 1', fn(0))
//     .add('Component 2', fn(0))
//     .add('Component 3', fn(0))
//     .add('Component 4', fn(0));

// storiesOf('Just story 3', module)
//     .add('Component 1', fn(0))
//     .add('Component 2', fn(0))
//     .add('Component 3', fn(0))
//     .add('Component 4', fn(0));


const fn = num => () => (
  <div>
    <h4>Custom Component {num}</h4>
    <button onClick={() => console.log(`Story number #${num}`)}>
        Press me {num} times
    </button>
  </div>
);

storiesOf('React App', module)
    .storyDecorator(withKnobs)
    .chapter('Left panel')
        .add('Button 1', fn(1))
        .add('Button 2', fn(2))
        .chapter('Bottom Panel')
            .add('Input 3', () => <span>Input 3: {text('Input 3', '33')}</span>)
            .add('Input 4', () => <span>Input 4: {text('Input 4', '44')}</span>)
            .endOfChapter()
        .chapter('Header Panel')
            .addWithInfo('Input 5', fn(5), { inline: true })
            .addWithInfo('Input 6', fn(6))
            .endOfChapter()
        .endOfChapter()
    .chapter('Right panel')
        .add('Button 7', fn(7))
        .add('Button 8', fn(8))
        .endOfChapter()
    .add('App footer', fn(110));
