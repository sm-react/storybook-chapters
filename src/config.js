const ADDON_ID = 'chapters';
const config = {
    ADDON_ID,
    ADDON_TITLE: 'chapters',
    PANEL_ID: `${ADDON_ID}/no_panels_here`,
    EVENT_ID_INIT: `${ADDON_ID}/chapters/init`,
    EVENT_ID_DATA: `${ADDON_ID}/chapters/data`,
    CSS_CLASS: 'addon-chapters',
};
export default {
    initData: 'storybook-chapters',
    config,
    queryParams: {
        chapter: '',
        selectedKind: '',
        selectedStory: '',
    },
};
