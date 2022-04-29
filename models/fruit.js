const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 100,
  },
  quantity: {
    type: Number,
    required: true,
    minLength: 0,
    maxLength: 10000,
  },
  supplier: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: true,
    minLength: 0,
    maxLength: 1000,
  },
  desc: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 100,
  },
  img: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 1000,
  },
});

module.exports = {
  Fruit: mongoose.model("Fruit", fruitSchema),
};
