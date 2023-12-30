import { DROPDOWN_GROUP_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  selectedGroup: '',
};

export const dropdownGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROPDOWN_GROUP_ACTIONS_TYPE.SELECT_GROUP:
      return {
        selectedGroup: action.payload
      };
    default:
      return state;
  }
};
