import { MAIN_URL, TOKEN } from './config';

export const api = {
    async fetchTasks () {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Tasks were not delivered');
        }

        const { data: tasks } = await response.json();

        return tasks;
    },
    async createTask(newTaskMessage) {
        const response = await fetch(MAIN_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({
                newTaskMessage,
            }),
        });

        if (response.status !== 200) {
            throw new Error('Create were not loaded');
        }

        const { data: task } = await response.json();

        return task;
    },
};
