// Core
import { put, apply, select } from 'redux-saga/effects';

// Instruments
import  { api } from '../../../../REST/api';
import { createTask } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';


export function* createTaskWorker ({ payload: newTaskMessage }) {
    try {
        yield put(startFetching());

        const task = yield apply(api, api.createTask, [ newTaskMessage ]);

        yield put(createTask(task));
    } catch (error) {
        console.log(error);
    } finally {
        yield put(stopFetching());
    }
}
