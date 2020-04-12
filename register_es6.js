import { register } from '@storybook/addon-devkit';
import { register as regAddonLinks } from '@storybook/addon-links';
import { ENQ_SEND } from '@storybook/addon-devkit/dist/store/store'; // fixme: in adk

import config from './dist/config';

const logger = {
    log() {},
};

regAddonLinks();

register(config, (env) => {
    env.addonStore.watch('enabledMap', (map) => {
        logger.log('enabledMap', map);
    });

    const setupChannel = env.channelInit(ENQ_SEND, 'cp01');
    /* const stopChannel = */ setupChannel();
    env.storybookApi.onStory(( kind, name ) => {
        env.addonStore.set('onStory', { kind, name });
    });
});
