import React, { Component } from "react";
import { connect } from "react-redux";
import { editExpense } from "../../actions/expenseAction";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

class EditExpense extends Component {
  state = {
    title: this.props.expense.title,
    price: this.props.expense.price / 100,
    category: this.props.expense.category,
    date: moment.utc(this.props.expense.date).format("YYYY-MM-DD")
  };
  onSubmit = e => {
    e.preventDefault();
    const newExpense = {
      title: this.state.title,
      price: this.state.price * 100,
      category: this.state.category,
      date: this.state.date
    };

    this.props.editExpense(
      newExpense,
      this.props.history,
      this.props.match.params.id
    );
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDate = e => {
    this.setState({
      [e.target.name]: moment(e.target.value).format("YYYY-MM-DD")
    });
  };

  render() {
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
          <div className="card-header">Edit Expense</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  minLength="2"
                  defaultValue={this.state.title}
                  value={this.props.title}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  minLength="2"
                  defaultValue={this.state.price}
                  onChange={this.onChange}
                  value={this.props.price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  defaultValue={this.state.category}
                  onChange={this.onChange}
                  value={this.props.category}
                  placeholder="Select a category"
                  name="category"
                  required
                  className="form-control"
                >
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
                  className="form-control"
                  name="date"
                  type="date"
                  defaultValue={moment(this.state.date).format("YYYY-MM-DD")}
                  onChange={this.onChangeDate}
                  value={this.props.date}
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
  }
}
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.expenses.filter(
      expense => expense._id === props.match.params.id
    )[0]
  };
};
export default connect(
  mapStateToProps,
  { editExpense }
)(withRouter(EditExpense));
