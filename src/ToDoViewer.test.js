import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import ToDoViewer from '../src/Components/ToDoViewer';
import { describe, expect } from "@jest/globals";
import { act } from "react-dom/test-utils";
import { createStore } from 'redux'
import ToDoListReducer from "../src/Reducers/ToDoListReducer";
import { toDoListItem } from "../src/Actions/ToDoActions";
import userEvent from '@testing-library/user-event';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: `/todoviewer`,
    }),
    useHistory: () => ({
        goBack: jest.fn(),
        replace: jest.fn(),
    }),
    useNavigate: () => ('/todoviewer',
    {
        state: [
            { title: 'This is a sampel todo', completed: false },
            { title: 'New ToDo', completed: false }
        ]
    })
}));

describe('ToDoViewer page Working Fine', () => {
    let store;
    beforeEach(async () => {
        store = createStore(
            ToDoListReducer,
        );
        await act(async () => {
            render(
                <Provider store={store}>
                    <ToDoViewer />
                </Provider>
            )
        })
    })
    it('ToDoViewer Page should display properly', async () => {
        act(() => {
            store.dispatch(
                toDoListItem.updateToDoListItem([
                    { title: 'This is a sampel todo', completed: false },
                    { title: 'New ToDo', completed: false }
                ])
            )
        });

        const _ElementToDoList = await waitFor(() => document.querySelectorAll('[data-testid=todo-list-card]'))
        expect(_ElementToDoList).toHaveLength(2)

        const _ElementToDoListItem1Title = await waitFor(() => _ElementToDoList[0].querySelector('span'))
        expect(_ElementToDoListItem1Title.innerHTML).toEqual('This is a sampel todo')

        const _ElementToDoListItem1BtnSuccess = await waitFor(() => _ElementToDoList[0].querySelector('[data-testid=success]'))
        expect(_ElementToDoListItem1BtnSuccess).toBeEnabled()
        userEvent.click(_ElementToDoListItem1BtnSuccess)
        expect(_ElementToDoListItem1Title).toHaveAttribute('style', "text-decoration: line-through;")

        const _ElementToDoListItem1BtnRemove = await waitFor(() => _ElementToDoList[0].querySelector('[data-testid=remove]'))
        expect(_ElementToDoListItem1BtnRemove).toBeEnabled()
        userEvent.click(_ElementToDoListItem1BtnRemove)

        act(() => {
            store.dispatch(
                toDoListItem.updateToDoListItem([
                    { title: 'New ToDo', completed: false }
                ])
            )
        });
        expect(_ElementToDoList).toHaveLength(2)
    })
})
