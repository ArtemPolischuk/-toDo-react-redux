// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { fetchTasksWorker } from './workers/fetchTasksWorker';
import { createTaskWorker } from './workers/createTaskWorker';
import { updateTaskWorker } from './workers/updateTaskWorker';
import { removeTaskWorker } from './workers/removeTaskWorker';
import { completeAllTasksWorker } from './workers/completeAllTasksWorker';

function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasksWorker);
    yield takeEvery(types.CREATE_TASK_ASYNC, createTaskWorker);
    yield takeEvery(types.UPDATE_TASK_ASYNC, updateTaskWorker);
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTaskWorker);
    yield takeEvery(types.COMPLETE_ALL_TASKS_ASYNC, completeAllTasksWorker);
}

export function* watchTasks () {
    yield all([ call(watchFetchTasks) ]);
}
