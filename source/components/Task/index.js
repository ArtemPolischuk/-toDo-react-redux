// Core
import React, { PureComponent, createRef } from 'react';

// Instruments
import Styles from './styles.m.css';
// import cx from 'cx';
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

        _updateTaskAsync(this._getTaskShape({ 'message': newMessage }));
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
            if (!newMessage.trim()) {
                return null;
            }
            this._updateTask();
        }

        if (escapeKey) {
            this._cancelUpdatingTaskMessage();
        }
    };

    _toggleTaskCompletedState = () => {
        const { _updateTaskAsync, completed } = this.props;

        _updateTaskAsync(this._getTaskShape({ 'completed': !completed }));
    };

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync, favorite } = this.props;

        _updateTaskAsync(this._getTaskShape({ 'favorite': !favorite }));
    };

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    }

    render () {
        const { completed, favorite } = this.props;
        const { isTaskEditing, newMessage } = this.state;

        // const taskStyles = cx(Styles.task, {
        //     [Styles.completed]: completed
        // })

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
