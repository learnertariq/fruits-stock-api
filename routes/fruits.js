const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Fruit } = require("../models/fruit");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const queryObj = {};

  const fruits = await Fruit.find(queryObj);
  res.send(fruits);
});

router.get("/secured", auth, async (req, res) => {
  const fruits = await Fruit.find({ email: req.user.email });
  res.send(fruits);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const fruit = await Fruit.findById(mongoose.Types.ObjectId(id));
  res.send(fruit);
});

router.post("/", auth, async (req, res) => {
  const bodyCopy = req.body;

  const fruit = new Fruit({
    name: bodyCopy.name,
    quantity: bodyCopy.quantity,
    supplier: bodyCopy.supplier,
    price: bodyCopy.price,
    desc: bodyCopy.desc,
    img: bodyCopy.img,
    email: req.user.email,
  });

  await fruit.save();
  res.send(fruit);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const bodyCopy = req.body;

  const updatedFruit = {};
  if (bodyCopy.name) updatedFruit.name = bodyCopy.name;
  if (bodyCopy.quantity) updatedFruit.quantity = bodyCopy.quantity;
  if (bodyCopy.supplier) updatedFruit.supplier = bodyCopy.supplier;
  if (bodyCopy.price) updatedFruit.price = bodyCopy.price;
  if (bodyCopy.desc) updatedFruit.desc = bodyCopy.desc;
  if (bodyCopy.img) updatedFruit.img = bodyCopy.img;

  const fruit = await Fruit.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    updatedFruit,
    { new: true }
  );

  res.send(fruit);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const fruit = await Fruit.findByIdAndDelete(mongoose.Types.ObjectId(id));
  res.send(fruit);
});

module.exports = router;
