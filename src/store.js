import { createStore } from 'redux';
import ToDoListReducer from './Reducers/ToDoListReducer';

export const store = createStore(
    ToDoListReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );