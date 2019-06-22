const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date
    // required: true
  }
});

module.exports = Expense = mongoose.model("expenses", ExpenseSchema);
