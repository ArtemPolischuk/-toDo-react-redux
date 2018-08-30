// Core
import React, { Component } from 'react';

import Spinner from '../Spinner';
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';
// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST';

export default class Scheduler extends Component {
    state = {
        newTaskMessage: '',
        tasksFilter: '',
        isTasksFetching: false,
        tasks: [],
    }

    componentDidMount () {
        this._fetchTasksAsync();
    }

    _updateTasksFilter = (event) => {
        const { value } = event.target;

        this.setState(() => ({
            tasksFilter: value.toLocaleLowerCase(),
        }));
    };

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        this.setState({
            newTaskMessage: value,
        });
    };

    _getAllCompleted = () => {
        //returns boolean depends if all tasks are completed
        return this.state.tasks.every((task) => {
            return task.completed;
        });
    };

    _setTasksFetchingState = (bool) => {
        this.setState(() => ({
            isTasksFetching: bool,
        }));
    };

    _fetchTasksAsync = async () => {
        try {
            this._setTasksFetchingState(true);

            const tasks = await api.fetchTasks();

            this.setState(() => ({
                tasks,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _createTaskAsync = async (event) => {
        try {
            const { newTaskMessage } = this.state;

            if (!newTaskMessage.trim()) {
                return null;
            }

            if (newTaskMessage.trim()) {
                event.preventDefault();
            }
            this._setTasksFetchingState(true);

            const task = await api.createTask(newTaskMessage);

            this.setState((prevState) => ({
                tasks: [task, ...prevState.tasks],
                newTaskMessage: '',
            }));
        } catch (error) {
            console.log(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _updateTaskAsync = async (updateTask) => {
        try {
            this._setTasksFetchingState(true);

            const updatedTask = await api.updateTask(updateTask);

            this.setState(({ tasks }) => ({
                tasks: tasks.map((task) => task.id === updatedTask.id ?updatedTask : task),
            }));

            // this._fetchTasksAsync();
        } catch (error) {
            console.log(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _removeTaskAsync = async (id) => {
        try {
            this._setTasksFetchingState(true);

            await api.removeTask(id);

            this.setState(({ tasks }) => ({
                tasks: tasks.filter((task) => task.id !== id),
            }));
        } catch (error) {
            console.log(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };
    _completeAllTasksAsync = async () => {
        try {
            if (this._getAllCompleted()) {
                return null;
            }
            this._setTasksFetchingState(true);

            const uncompletedTasks = this.state.tasks.filter((task) => !task.completed);

            uncompletedTasks.map((task) => task.completed = true);

            await api.completeAllTasks(uncompletedTasks);

        } catch (error) {
            console.log(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };
    render () {
        const { tasks, newTaskMessage, isTasksFetching, tasksFilter } = this.state;

        const tasksJSX = tasks.filter((task) => task.message.toLocaleLowerCase().indexOf(tasksFilter) !== -1)
            .sort((a, b) => ((a.completed - b.completed) || (b.favorite - a.favorite)))
            .map((task) => (
                <Task
                    { ...task }
                    key = { task.id }
                    _updateTaskAsync = { this._updateTaskAsync }
                    _removeTaskAsync = { this._removeTaskAsync }
                />
            ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync } >
                            <input
                                className = 'createTask'
                                maxLength = { 50 }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>
                                Добавить задачу
                            </button>
                        </form>
                        <div className = 'overlay'>
                            <ul>
                                { tasksJSX }
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { this._getAllCompleted() }
                            color1 = '#363636'
                            color2 = '#fff'
                            height = { 25 }
                            width = { 25 }
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = 'completeAllTasks'>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
