const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Expense = require("../../models/Expense");
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "Expense Works" }));

//Fetch all expenses
router.get(
  "/expense",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Expense.find({ userId: req.user._id })
      .then(expenses => {
        res.json(expenses);
      })
      .catch(err => console.log(err));
  }
);

//Fetch expense with id
router.get(
  "/expense/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Expense.findOne({ _id: req.params.id })
      .then(expense => {
        res.json(expense);
      })
      .catch(err => console.log(err));
  }
);

//Create expense
router.post(
  "/expense/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newExpense = new Expense({
      userId: req.user._id,
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      date: req.body.date
    });
    newExpense
      .save()
      .then(expense => res.json(expense))
      .catch(err => console.log(err));
  }
);

//Delete an expense
router.delete(
  "/expense/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Expense.findById(req.params.id)
      .then(expense => {
        if (expense) {
          if (expense.userId.equals(req.user._id)) {
            Expense.deleteOne(expense)
              .then(() => {
                res.send("Expense sucessfully removed");
              })
              .catch(err => {
                res.status(422).send(err);
              });
          } else {
            res.status(400).json({ msg: "User doesnt match" });
          }
        } else {
          res.status(400).json({ msg: "Invalid Expense" });
        }
      })
      .catch(err => console.log(err));
  }
);

//Update an expense
router.put(
  "/expense/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Expense.findOne({ _id: req.params.id }).then(expense => {
      //New Values
      expense.title = req.body.title;
      expense.price = req.body.price;
      expense.category = req.body.category;
      expense.date = req.body.date;
      expense
        .save()
        .then(expense => {
          res.send(expense);
        })
        .catch(err => {
          res.status(422).send(err);
        });
    });
  }
);

module.exports = router;
