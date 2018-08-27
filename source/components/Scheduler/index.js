// Core
import React, { Component } from 'react';

import Spinner from '../Spinner';
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox'
// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    state = {
        newTaskMessage: '',
        tasksFilter: '',
        isTasksFetching: false,
        tasks: [],
    }

    _updateTasksFilter = () => {

    }

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        this.setState({
            newTaskMessage: value,
        });
    }

    _getAllCompleted = () => {

    }

    _setTasksFetchingState = () => {

    }

    _fetchTasksAsync = () => {

    }

    _createTaskAsync = () => {

    }

    _updateTaskAsync = () => {

    }

    _removeTaskAsync = () => {

    }
    __completeAllTasksAsync = () => {

    }
    render () {
        const { newTaskMessage } = this.state;

        return (
            <section className = { Styles.scheduler }>
                <Spinner />
                <main>
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <input
                            onChange = { this._updateTasksFilter }
                            placeholder = 'Поиск'
                            type = 'search'
                            value = ''
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync } >
                            <input
                                className = 'createTask'
                                maxLength = { 50 }
                                onChange = { this._updateNewTaskMessage }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                            />
                            <button>
                                Добавить задачу
                            </button>
                        </form>
                        <div className = 'overlay'>
                            <Task
                                _removeTaskAsync = { this._removeTaskAsync }
                                _updateTaskAsync = { this._updateTaskAsync }
                                completed = {false}
                                favorite = {false}
                                id = "123"
                                key = ".$123"
                                message = "Выполнить важную задачу (создано в конструкторе)."
                            />
                        </div>
                    </section>
                    <footer>
                        <Checkbox onClick = {this._completeAllTasksAsync}/>
                        <span className = 'completeAllTasks'>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
