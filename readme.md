# storybook-chapters

Adds unlimited levels of nesting for stories. 


![preview](doc/img/preview.gif)


## Usage

```shell
yarn add storybook-chapters --dev
```

```js
// .storybook/config.js:

import 'storybook-chapters';

```

```js
// stories.js:

storiesOf('React App', module)
    .chapter('Left panel')
        .add('Button 1', fn(1))
        .add('Button 2', fn(2))
        .chapter('Bottom Panel')
            .add('Input 3', fn(3))
            .add('Input 4', fn(4))
            .endOfChapter()
        .chapter('Header Panel')
            .add('Input 5', fn(5))
            .add('Input 6', fn(6))
            .endOfChapter()
        .endOfChapter()
    .chapter('Right panel')
        .add('Button 7', fn(7))
        .add('Button 8', fn(8))
        .endOfChapter()
```

## Features

- The hierarchical structure of Substories

## API

soon

## Credits

<div align="left" style="height: 16px;"><sub>Created with ❤︎ to <b>React</b> and <b>React Storybook</b> by <a href="https://twitter.com/UsulPro">@UsulPro</a> and     <a href="https://github.com/sm-react/react-theming">React Theming</a>.</sub></div>
