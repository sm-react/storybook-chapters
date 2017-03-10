import * as storybook from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

import '../src';

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
