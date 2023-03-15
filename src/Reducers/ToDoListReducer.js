import { UPDATE_TODO_ITEM } from "../Actions/ActionTypes";

const INITIAL_STATE = {
  toDoList: [
  ]
};

const Reducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case UPDATE_TODO_ITEM:
      return {
        ...state,
        toDoList: payload?.data,
      };
    default:
      return state;
  }
};

export default Reducer;