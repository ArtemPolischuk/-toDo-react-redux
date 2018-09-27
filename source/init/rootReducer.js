//Core
import { combineReducers } from 'redux';

//Reducers
import { uiReducer as ui } from '../bus/ui/reducer';
import { formReducer as form } from '../bus/form/reducer';
import { tasksReducer as tasks } from '../bus/tasks/reducer'

export const rootReducer = combineReducers({
    ui,
    form,
    tasks,
})