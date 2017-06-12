import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';

import '../src';

storybook.setAddon(infoAddon);

// Chapters();

setOptions({
    name: 'React Theming',
    url: 'https://github.com/sm-react/react-theming',
    goFullScreen: false,
    showLeftPanel: true,
    showDownPanel: true,
    showSearchBox: false,
    downPanelInRight: false,
});

storybook.configure(
    () => {
      require('../stories');
    },
    module
);
