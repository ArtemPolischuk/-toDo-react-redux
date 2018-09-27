import { types } from './types'

//Sync
export const startFetching = () => {
    return {
        type: types.START_FETCHING,
    };
};

export const stopFetching = () => {
    return {
        type: types.STOP_FETCHING,
    };
};