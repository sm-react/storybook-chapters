import { setAddon } from '@storybook/react';
import { initStore } from '@storybook/addon-devkit';
import { ENQ_ASK } from '@storybook/addon-devkit/dist/store/store'; // fixme: in adk

import config from './config';
import chapters from './chapters';
import { setStore /* , getEnabledMap, setEnabledMap */ } from './chapters/store';

export { jumpTo } from './chapters/store';

const storeEnv = initStore(config);
const setupChannel = storeEnv.channelInit(ENQ_ASK, 'ad02');
/* const stopChannel = */ setupChannel();
setStore(storeEnv.addonStore);


export default function addChapters(options) {
    setAddon(chapters);
}
addChapters();

// export { getEnabledMap, setEnabledMap };

