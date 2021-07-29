export const LOADING = '[LOADING]';
export const FINISH = '[FINISH]';
export const REFRESH = '[REFRESH]';

// toàn bộ tài sản
export const loading = () => ({
    type: LOADING,
    payload: {},
});

export const finish = () => ({
    type: FINISH,
    payload: {},
});

export const refresh = params => ({
    type: REFRESH,
    params,
});