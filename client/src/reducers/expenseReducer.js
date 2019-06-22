import {
  GET_EXPENSES,
  EXPENSE_LOADING,
  EDIT_EXPENSES,
  DELETE_EXPENSES,
  CLEAR_CURRENT_EXPENSES
} from "../actions/types";
const initialState = {
  expenses: null,
  selectedExpense: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EXPENSE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false
      };
    case EDIT_EXPENSES:
      return state;

    case DELETE_EXPENSES:
      return {
        ...state,
        expenses: state.expenses.filter(
          expense => expense._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_CURRENT_EXPENSES:
      return {
        expenses: null
      };
    default:
      return state;
  }
}
