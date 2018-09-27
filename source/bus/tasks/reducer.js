//Core
import { List, fromJS } from 'immutable';

// Types
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);

        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);

        case types.UPDATE_TASK:
            const updatedTask = action.payload;
            return state.map((task) => task.get('id') === updatedTask.id? fromJS(updatedTask) : task)

        case types.COMPLETE_ALL_TASKS:
            // return state.filter((post) => post.get('id') !== action.payload);

        default:
            return state;
    }
};
