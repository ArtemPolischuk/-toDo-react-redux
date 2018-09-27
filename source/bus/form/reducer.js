import { combineForms } from 'react-redux-form';

export const formReducer = combineForms({
    newTask: {
        message: '',
    },
    filter: {
        tasksFilter: '',
    },
}, 'forms');