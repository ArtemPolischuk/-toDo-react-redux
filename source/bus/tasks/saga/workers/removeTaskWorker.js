// Core
import { put, apply, select } from 'redux-saga/effects';

// Instruments
import  { api } from '../../../../REST/api';
import { removeTask } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';


export function* removeTaskWorker ({ payload: taskId }) {
    try {
        yield put(startFetching());

        yield apply(api, api.removeTask, [ taskId ]);

        yield put(removeTask(taskId));
    } catch (error) {
        console.log(error);
    } finally {
        yield put(stopFetching());
    }
}
