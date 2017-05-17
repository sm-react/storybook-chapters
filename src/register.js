import { register } from 'storybook-adk';
import { ENQ_SEND } from 'storybook-adk/dist/store/store'; // fixme: in adk

import config from './config';

const logger = {
    log() {},
};

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
