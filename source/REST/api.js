import { MAIN_URL ,ROOT_URL } from './config';

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
};
