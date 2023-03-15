import { UPDATE_TODO_ITEM } from "./ActionTypes";

export const toDoListItem = {
  updateToDoListItem: (data) => ({
      type: UPDATE_TODO_ITEM,
      payload: {
        data,
      },
    }),
};