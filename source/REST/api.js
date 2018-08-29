import { MAIN_URL, TOKEN } from './config';

export const api = {
    async fetchTasks () {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
            headers: {
                Authorization: TOKEN,
            }
        });

        if (response.status !== 200) {
            console.log(response);
            throw new Error('Tasks were not delivered');
        }

        const { data: tasks } = await response.json();

        return tasks;
    },
    async createTask (newTaskMessage) {
        const response = await fetch(MAIN_URL, {
            method: 'POST',
            headers: {
                Authorization: TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                "message": newTaskMessage,
            }),
        });

        if (response.status !== 200) {
            throw new Error('Create were not loaded');
        }

        const { data: task } = await response.json();

        return task;
    },
    async updateTask (updateTask) {
        const response = await fetch(MAIN_URL, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                updateTask,
            }),
        });

        if (response.status !== 200) {
            throw new Error('task was not updated');
        }

        const { data: updatedTask } = await response.json();

        return updatedTask;
    },
    async removeTask (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            }
        });

        if (response.status !== 204) {
            throw new Error('Task was not deleted');
        }

        return null;
    },
    async completeAllTasks (tasks) {

    }
};
