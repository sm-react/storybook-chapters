import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/react-addon-info';
import 'storybook-chapters';

storybook.setAddon(infoAddon);

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
      require('../src/stories');
      require('../src/ThemeSwitcher.story');
      require('../src/MaterialUI/index.story');
    },
    module
);
