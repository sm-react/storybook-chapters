import { register } from 'storybook-adk';
import { register as regAddonLinks } from '@storybook/addon-links';
import { ENQ_SEND } from 'storybook-adk/dist/store/store'; // fixme: in adk

import config from './config';

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
