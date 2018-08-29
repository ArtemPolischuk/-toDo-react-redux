// Core
import React, { PureComponent, createRef } from 'react';

// Instruments
import Styles from './styles.m.css';
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

export default class Task extends PureComponent {
    constructor (props) {
        super(props);
        this.taskInput = createRef();
    }
    state = {
        isTaskEditing: false,
        newMessage: this.props.message,
    };
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
        }), () => {
            return this.state.isTaskEditing ? this.taskInput.current.focus() : null;
        });
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

        this._setTaskEditingState(false);

        const taskModel = this._getTaskShape(this.props);

        taskModel.message = newMessage;

        _updateTaskAsync(taskModel);
    };

    _updateTaskMessageOnClick = () => {
        if (this.state.isTaskEditing) {
            this._updateTask();

            return null;
        }

        if (!this.state.isTaskEditing) {
            this._setTaskEditingState(true);
        }
    };

    _cancelUpdatingTaskMessage = () => {
        const { message } = this.props;

        this._setTaskEditingState(false);

        this.setState(() => ({
            newMessage: message,
        }));
    };

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

    render () {
        const { completed, favorite } = this.props;
        const { isTaskEditing, newMessage } = this.state;
        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        height = { 25 }
                        inlineBlock
                        onClick = { this._toggleTaskCompletedState }
                        width = { 25 }
                    />
                    <input
                        disabled = { !isTaskEditing }
                        maxLength = { 50 }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                        type = 'text'
                        ref = { this.taskInput }
                        value = { newMessage }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        inlineBlock
                        width = { 19 }
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        inlineBlock
                        width = { 19 }
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        className = 'removeTask'
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 17 }
                        inlineBlock
                        width = { 17 }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
