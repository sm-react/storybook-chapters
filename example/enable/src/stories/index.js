/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';


const info = text => () => (
  <div>
    <h4>Info about:</h4>
    <p>{text}</p>
    <button onClick={action(`you selected ${text}`)}>
        select {text}
    </button>
  </div>
);
// `

const lightStory = [];
const darkStory = [];

const toLight = () => {
    lightStory.forEach(en => en());
    darkStory.forEach(en => en(false));
};

const toDark = () => {
    lightStory.forEach(en => en(false));
    darkStory.forEach(en => en());
};

storiesOf('Choose Your Side', module)
    .add('Lightside', () => {
        toLight();
        return (<div>{'Lightside selected'}</div>);
    })
    .add('Darkside', () => {
        toDark();
        return (<div>{'Darkside selected'}</div>);
    });


storiesOf('Heroes Lightside', module)
    .enable(en => lightStory.push(en))
    .add('Yoda', info('Yoda'))
    .add('Mace Windu', info('Mace Windu'));

storiesOf('Heroes Darkside', module)
    .disable(en => darkStory.push(en))
    .add('Darth Sidious', info('Darth Sidious'))
    .add('Darth Maul', info('Darth Maul'));

storiesOf('Starships Lightside', module)
    .enable(en => lightStory.push(en))
    .add('X-wing starfighters', info('X-wing starfighters'))
    .add('Millennium Falcon', info('Millennium Falcon'));

storiesOf('Starships Darkside', module)
    .disable(en => darkStory.push(en))
    .add('Imperial I-class Star Destroyer', info('Star Destroyer'))
    .add('TIE/ln space superiority starfighter', info('TIE/ln'));
