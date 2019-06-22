import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import {
  getCurrentExpenses,
  deleteExpense,
  clearCurrentExpenses
} from "../../actions/expenseAction";
import moment from "moment";

class Expenses extends Component {
  state = {
    totalExpense: null
  };

  componentDidMount() {
    this.props.getCurrentExpenses();
  }

  onDeleteClick(id) {
    this.props.deleteExpense(id);
  }

  render() {
    const { expenses } = this.props.expenses;
    const { user } = this.props.auth;
    console.log(user);
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      if (expenses) {
        const total = expenses.reduce((total, expense) => {
          return total + expense.price;
        }, 0);
        console.log(total);
        return (
          <div>
            <div className="row">
              <div className="col-sm-8">
                <h2>Expenses</h2>
              </div>

              <div className="col-sm-4">
                <h2>Total:${total / 100}</h2>
              </div>
            </div>
            <table className="table table-striped">
              <thead className="thead-inverse">
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense._id}>
                    <td>{expense.title}</td>
                    <td>${expense.price / 100}</td>
                    <td>{expense.category}</td>
                    <td>{moment.utc(expense.date).format("YYYY-MM-DD")}</td>
                    <td>
                      <Link to={`/expense/${expense._id}`} className="btn">
                        <i className="far fa-edit" />
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => this.onDeleteClick(expense._id)}
                      >
                        <i className="far fa-trash-alt" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        return <h1>Loading..</h1>;
      }
    } else {
      return (window.location.href = "/");
    }
  }
}
Expenses.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  expenses: state.expenses
});
export default connect(
  mapStateToProps,
  { getCurrentExpenses, deleteExpense, clearCurrentExpenses, logoutUser }
)(Expenses);
