import { register } from 'storybook-adk';
import { ENQ_SEND } from 'storybook-adk/dist/store/store'; // fixme: in adk

import config from './config';


register(config, (env) => {
//    const qq1 = env.storybookApi.getQueryParam('chapter');
//    env.storybookApi.onStory((...args) => console.log('onStory', ...args))
//    console.log('register', env.storybookApi);
    const setupChannel = env.channelInit(ENQ_SEND, 'cp01');
    /* const stopChannel = */ setupChannel();
});
