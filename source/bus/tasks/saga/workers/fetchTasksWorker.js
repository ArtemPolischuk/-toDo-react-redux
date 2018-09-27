// Core
import { put, apply, call } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST/api';
import { fillTasks } from '../../actions';
import { startFetching, stopFetching } from "../../../ui/actions";


export function* fetchTasksWorker () {
    yield put(startFetching());

    const tasks = yield apply(api, api.fetchTasks, [ 2, 3 ]);
    yield put(fillTasks(tasks));

    yield put(stopFetching());
}
