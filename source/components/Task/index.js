// Core
import React, { PureComponent, createRef } from 'react';

// Instruments
import Styles from './styles.m.css';
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

export default class Task extends PureComponent {
    state = {
        isTaskEditing: false,
        newMessage: this.props.message,
    };
    taskInput = createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _setTaskEditingState = (bool) => {
        this.setState(() => ({
            isTaskEditing: bool,
        }));
    };

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        this.setState(() => ({
            newMessage: value,
        }));
    };

    _updateTask = () => {
        const { newMessage } = this.state;
        const { message, _updateTaskAsync } = this.props;

        if (newMessage === message) {
            this._setTaskEditingState(false);

            return null;
        }

        _updateTaskAsync();
        this._setTaskEditingState(false);
    };

    _updateTaskMessageOnClick = () => {
        this.state.isTaskEditing ? this._updateTask() : null;

        this._setTaskEditingState(false);
    }

    _cancelUpdatingTaskMessage = () => {
        const { message } = this.props;

        this._setTaskEditingState(false);

        this.setState(() => ({
            newMessage: message,
        }));
    }

    _updateTaskMessageOnKeyDown = (event) => {
        const enterKey = event.key === 'Enter';
        const escapeKey = event.key === 'Escape';
        const { newMessage }  = this.state;

        if (enterKey) {
            event.preventDefault();
            if (!newMessage.trim()) {
                return null;
            }
            this._updateTask();
        }

        if (escapeKey) {
            event.preventDefault();
            this._cancelUpdatingTaskMessage();
        }
    };

    _toggleTaskCompletedState = () => {
        const { _updateTaskAsync, completed } = this.props;

        const taskModel = this._getTaskShape(this.props);
        taskModel.completed = !completed;

        _updateTaskAsync(taskModel);
    };

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync, favorite } = this.props;

        const taskModel = this._getTaskShape(this.props);
        taskModel.favorite = !favorite;

        _updateTaskAsync(taskModel);
    };

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    }
    mock = () => {

    }
    render () {
        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { false }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        height = { 25 }
                        inlineBlock
                        onClick = { this.mock }
                        width = { 25 }
                    />
                    <input
                        disabled
                        maxLength = { 50 }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this.mock }
                        type = 'text'
                        ref = { this.taskInput }
                        value = { this.props.message }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { false }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        inlineBlock
                        width = { 19 }
                        onClick = { this.mock }
                    />
                    <Edit
                        checked = { false }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        inlineBlock
                        width = { 19 }
                        onClick = { this.mock }
                    />
                    <Remove
                        className = 'removeTask'
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 17 }
                        inlineBlock
                        width = { 17 }
                        onClick = { this.mock }
                    />
                </div>
            </li>
        );
    }
}
