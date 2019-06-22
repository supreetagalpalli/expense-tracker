import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExpense } from "../../actions/expenseAction";

class AddExpense extends Component {
  state = {
    title: "",
    price: "",
    category: "",
    date: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const newExpense = {
      title: this.state.title,
      price: this.state.price * 100,
      category: this.state.category,
      date: this.state.date
    };
    this.props.addExpense(newExpense, this.props.history);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/expense" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back to Expenses
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Add Expense</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.price}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    value={this.state.category}
                    onChange={this.onChange}
                    name="category"
                    required
                    className="form-control"
                  >
                    <option disabled value="" hidden>
                      Select a Category
                    </option>
                    <option value="groceries">Groceries</option>
                    <option value="utilities">Utilities</option>
                    <option value="travel">Travel</option>
                    <option value="beauty">Beauty</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    required
                    onChange={this.onChange}
                    value={this.state.date}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (window.location.href = "/");
    }
  }
}
AddExpense.propTypes = {
  expenses: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  expenses: state.expenses,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addExpense }
)(AddExpense);
