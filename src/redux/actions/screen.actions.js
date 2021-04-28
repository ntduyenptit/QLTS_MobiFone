export const SCREEN = '[SCREEN]';
export const CURRENT_SCREEN = `${SCREEN} Get current screen`;

export const TAB = '[TAB]';
export const CURRENT_TAB = `${TAB} Get current tab`;

export const setCurrentScreen = (screen) => ({
    type: CURRENT_SCREEN,
    payload: {
        screen,
    },
})

export const setCurrentTab = (tab) => ({
    type: CURRENT_TAB,
    payload: {
        tab,
    },
})