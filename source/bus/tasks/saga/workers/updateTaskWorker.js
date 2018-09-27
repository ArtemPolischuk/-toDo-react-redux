// Core
import { put, apply, select } from 'redux-saga/effects';

// Instruments
import  { api } from '../../../../REST/api';
import { updateTask } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';


export function* updateTaskWorker ({ payload: updatingTask }) {

    try {
        yield put(startFetching());

        const upToDateTask = yield apply(api, api.updateTask, [ updatingTask ] );

        yield put(updateTask(upToDateTask));
    } catch (error) {
        console.log(error);
    } finally {
        yield put(stopFetching());
    }
}
