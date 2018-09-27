// Core
import React, { Component } from 'react';
import { Form, Control, actions as actionForm } from 'react-redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';


// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST';

//Actions
import {
    fetchTasksAsync,
    createTaskAsync,
    updateTaskAsync,
    removeTaskAsync,
    completeAllTasksAsync,
} from "../../bus/tasks/actions";

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        isFetching: state.ui.isFetching,
        newTaskMessage: state.form.newTask.message,
        tasksFilter: state.form.filter.tasksFilter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchTasksAsync,
            createTaskAsync,
            updateTaskAsync,
            resetForm: actionForm.reset,
            removeTaskAsync,
            completeAllTasksAsync,
        }, dispatch),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
export default class Scheduler extends Component {
    state = {
        newTaskMessage: '',
        tasksFilter: '',
        isTasksFetching: false,
        tasks: [],
    }

    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        this.setState({
            newTaskMessage: value,
        });
    };

    _getAllCompleted = () => {
        //returns boolean depends if all tasks are completed
        const { tasks } = this.props;

        return tasks.every((task) => {
            return task.get('completed');
        });
    };

    _setTasksFetchingState = (bool) => {
        this.setState(() => ({
            isTasksFetching: bool,
        }));
    };

    _createTaskAsync = () => {
        const { newTaskMessage, actions } = this.props;

        if (newTaskMessage) {
            actions.createTaskAsync(newTaskMessage);
            actions.resetForm('forms.newTask.message');
        }

        return null;
    };

    _completeAllTasksAsync = async () => {
        const { tasks, actions } = this.props;

        if (this._getAllCompleted()) {
            return null;
        }

        // !task.get('completed')
        const uncompletedTasks = tasks.toJS()
            .filter((task) => !task.completed)
            .map((task) => {
                task.completed = true;

                return task;
            } );


        console.log(uncompletedTasks);

        actions.completeAllTasksAsync(uncompletedTasks);
    }

    render () {
        const { tasks, actions, tasksFilter, isFetching } = this.props;

        const tasksJSX = tasks.filter((task) => task.get('message')
            .toLocaleLowerCase()
            .includes(tasksFilter))
            .sort((a, b) => ((a.completed - b.completed) || (b.favorite - a.favorite)))
            .map((task) => (
                <Task
                    actions = { actions }
                    completed = { task.get('completed') }
                    created = { task.get('created') }
                    favorite = { task.get('favorite') }
                    id = { task.get('id') }
                    key = { task.get('id') }
                    message = { task.get('message') }
                />
            ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isFetching } />
                <main>
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <Form model = 'forms.filter'>
                            <Control.text
                                model = 'forms.filter.tasksFilter'
                                placeholder = 'Поиск'
                                type = 'search'
                            />
                        </Form>
                    </header>
                    <section>
                        <Form
                            model = 'forms.newTask'
                            onSubmit = { this._createTaskAsync }
                        >
                            <Control.text
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                model = 'forms.newTask.message'
                                placeholder = 'Описание моей новой задачи'
                            />
                            <button>
                                Добавить задачу
                            </button>
                        </Form>
                        <div className = { Styles.overlay }>
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
