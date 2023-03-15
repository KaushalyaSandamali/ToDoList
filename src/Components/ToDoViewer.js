import React, { useEffect } from "react";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDoItem from "./ToDoItem";
import { connect } from 'react-redux';
import { toDoListItem } from "../Actions/ToDoActions";
import { useLocation } from "react-router-dom";

function ToDoViewer({updateToDoList, toDoListFromStore}) {
  const { state } = useLocation();

  useEffect(() => {
    updateToDoList(state)
  },[state])
  const markTodo = index => {
    const newTodos = [...toDoListFromStore];
    newTodos[index].completed = !toDoListFromStore[index]?.completed;
    updateToDoList(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...toDoListFromStore];
    newTodos.splice(index, 1);
    updateToDoList(newTodos);
  };



  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        {toDoListFromStore.length === 0 && <h5 className="text-center mb-4"> To Do List is Empty</h5>}
        <div data-testid='todo-list'>
          {toDoListFromStore?.map((todo, index) => (
            <Card data-testid='todo-list-card' key={index}>
              <Card.Body>
                <ToDoItem
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


const mapStateToPros = state => {
  const {toDoList} = state;
  return {
    toDoListFromStore: toDoList
  };
};
const mapDispatchToProps = {
  updateToDoList: toDoListItem.updateToDoListItem
};

export default connect(mapStateToPros, mapDispatchToProps)(ToDoViewer);