const router = require("express").Router();
const { Fruit } = require("../models/fruit");
router.get("/", async (req, res) => {
  const fruits = await Fruit.find({});
  res.send(fruits);
});

router.post("/", async (req, res) => {
  const bodyCopy = req.body;

  const fruit = new Fruit({
    name: bodyCopy.name,
    quantity: bodyCopy.quantity,
    supplier: bodyCopy.supplier,
    price: bodyCopy.price,
    desc: bodyCopy.desc,
    img: bodyCopy.img,
  });

  await fruit.save();
  res.send(fruit);
});

module.exports = router;
