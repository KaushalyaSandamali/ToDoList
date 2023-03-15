import React from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { toDoListItem } from "../Actions/ToDoActions";
import '../App.css'

function AddToDoItem({ toDoList, updateToDoList }) {
    const navigate = useNavigate();
    const [value, setValue] = React.useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        const payload = [...toDoList, {
            title: value,
            completed: false
        }]
        updateToDoList(payload);
        setValue("");
    };


    return (
        <div className="app">
            <div className="container">
                <h1 className="text-center mb-4" data-testid='main-header'>Todo List</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label><b>Add Todo</b></Form.Label>
                        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" data-testid='input-todo' />
                    </Form.Group>
                    <div className="mt-4 d-flex w-100">
                        <div className="mr-4 w-10">
                        <Button variant="primary mb-3" type="submit" data-testid='submit'>
                            Submit
                        </Button>
                        </div>
                        <div className="ml-4 w-10 ps-4">
                        <a href="todoviewer">
                            <Button variant="primary mb-3" onClick={() =>
                                navigate('/todoviewer',
                                    {
                                        state: toDoList
                                    })} data-testid='view'>
                                View
                            </Button>
                        </a>
                        </div>
                        
                    </div>
                </Form>
            </div>

        </div>

    );
}

const mapStateToPros = state => {
    const { toDoList } = state;
    return {
        toDoList
    };
};
const mapDispatchToProps = {
    updateToDoList: toDoListItem.updateToDoListItem
};

export default connect(mapStateToPros, mapDispatchToProps)(AddToDoItem);