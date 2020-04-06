import React from 'react';

import './todo-list-item.css'

const TodoListItem = ({ label, onDeleted }) => {
    return (
        <span className="todo-list-item">
            <span>{label}</span>
            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
            </button>
        </span>
    );
}

export default TodoListItem;