import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { describe, expect } from "@jest/globals";
import { act } from "react-dom/test-utils";
import { createStore } from 'redux'
import ToDoListReducer from "../src/Reducers/ToDoListReducer";
import userEvent from '@testing-library/user-event';

describe('ToDo App Working Fine' , () => {
  let store;
  beforeEach(async () => {
    store = createStore(
      ToDoListReducer,
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <App/>
        </Provider>
      )
    })
  })
  it('ToDo List Page should display properly', async () => {
    const _ElementHeader = await waitFor(() => document.querySelector('[data-testid=main-header]'))
    expect(_ElementHeader.innerHTML).toEqual('Todo List')
    const _ElementInput = await waitFor(() => document.querySelector('[data-testid=input-todo]'))
    userEvent.type(_ElementInput, 'New ToDo')
    expect(_ElementInput).toHaveValue('New ToDo')
    const _ElementSubmitButton = await waitFor(() => document.querySelector('[data-testid=submit]'))
    expect(_ElementSubmitButton).toBeEnabled()
    userEvent.click(_ElementSubmitButton)
    expect(_ElementInput).toHaveValue('')
    const _ElementViewButton = await waitFor(() => document.querySelector('[data-testid=view]'))
    expect(_ElementViewButton).toBeEnabled()
    userEvent.click(_ElementViewButton)
  })
})
