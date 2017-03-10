import { setAddon } from '@kadira/storybook';
import chapters from './chapters';

export default function addChapters(options) {
    setAddon(chapters);
}
addChapters();
