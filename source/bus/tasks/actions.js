import { types } from './types';

// Async
export const fetchTasksAsync = () => {
    return {
        type: types.FETCH_TASKS_ASYNC,
    };
};

export const createTaskAsync = (task) => {
    return {
        type: types.CREATE_TASK_ASYNC,
        payload: task,
    };
};

export const updateTaskAsync = (updateTask) => {
    return {
        type: types.UPDATE_TASK_ASYNC,
        payload: updateTask,
    };
};

export const removeTaskAsync = (removeTaskData) => {
    return {
        type: types.REMOVE_TASK_ASYNC,
        payload: removeTaskData,
    };
};

export const completeAllTasksAsync = (uncompletedTasks) => {
    return {
        type: types.COMPLETE_ALL_TASKS_ASYNC,
        payload: uncompletedTasks,
    };
};

// Sync
export const fillTasks = (tasks) => {
    return {
        type: types.FILL_TASKS,
        payload: tasks,
    };
};

export const createTask = (task) => {
    return {
        type: types.CREATE_TASK,
        payload: task,
    };
};

export const updateTask = (updateTask) => {
    return {
        type: types.UPDATE_TASK,
        payload: updateTask,
    };
};

export const removeTask = (removeTaskData) => {
    return {
        type: types.REMOVE_TASK,
        payload: removeTaskData,
    };
};

export const completeAllTasks = (tasksData) => {
    return {
        type: types.COMPLETE_ALL_TASKS,
        payload: tasksData,
    };
};

