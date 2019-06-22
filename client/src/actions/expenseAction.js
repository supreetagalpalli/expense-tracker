import axios from "axios";

import {
  GET_EXPENSES,
  EXPENSE_LOADING,
  GET_ERRORS,
  DELETE_EXPENSES,
  CLEAR_CURRENT_EXPENSES
} from "./types";

export const getCurrentExpenses = () => dispatch => {
  dispatch(setExpenseLoading());
  axios
    .get("/api/expenses/expense")
    .then(res =>
      dispatch({
        type: GET_EXPENSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXPENSES,
        payload: {}
      })
    );
};

export const addExpense = (expData, history) => dispatch => {
  axios
    .post("/api/expenses/expense/add", expData)
    .then(res => history.push("/expense"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editExpense = (expNewData, history, id) => dispatch => {
  axios
    .put(`/api/expenses/expense/${id}`, expNewData)
    .then(res => history.push("/expense"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteExpense = id => dispatch => {
  axios
    .delete(`/api/expenses/expense/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_EXPENSES,
        payload: id
      });
    })
    .catch(err =>
      dispatch({
        type: GET_EXPENSES,
        payload: err.response.data
      })
    );
};

export const clearCurrentExpenses = () => {
  return {
    type: CLEAR_CURRENT_EXPENSES
  };
};

export const setExpenseLoading = () => {
  return {
    type: EXPENSE_LOADING
  };
};
