// Core
import { put, apply, select } from 'redux-saga/effects';

// Instruments
import  { api } from '../../../../REST/api';
import { completeAllTasks } from '../../actions';
import { startFetching, stopFetching } from '../../../ui/actions';


export function* completeAllTasksWorker ({ payload: uncompletedTasks }) {
    try {
        yield put(startFetching());

        const completedTasks = yield apply(api, api.completeAllTasks, [ uncompletedTasks ]);

        yield put(completeAllTasks(completedTasks));
    } catch (error) {
        console.log(error);
    } finally {
        yield put(stopFetching());
    }
}
