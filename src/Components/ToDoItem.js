import React from "react";
import { Button } from 'react-bootstrap';

function ToDoItem({ todo, index, markTodo, removeTodo }) {
    return (
        <div className="todo" data-testid='todo-list-item'>
            <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>{todo.title}</span>
            <div>
                <Button variant="outline-success" data-testid='success' onClick={() => markTodo(index)}>✓</Button>{' '}
                <Button variant="outline-danger" data-testid='remove' onClick={() => removeTodo(index)}>✕</Button>
            </div>
        </div>
    );
}

export default ToDoItem;