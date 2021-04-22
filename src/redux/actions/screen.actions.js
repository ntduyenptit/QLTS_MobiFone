export const SCREEN = '[SCREEN]';
export const CURRENT_SCREEN = `${SCREEN} Get current screen`;

export const setCurrentScreen = (screen) => ({
    type: CURRENT_SCREEN,
    payload: {
        screen,
    },
})