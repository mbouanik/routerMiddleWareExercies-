const express = require("express");
const router = express.Router();
const items = require("./fakeDb");

router.get("/", (req, res, next) => {
  res.json(items);
});

router.get("/:name", (req, res, next) => {
  let [foundItem] = items.filter((item) => {
    if (item.name == req.params.name) {
      return item;
    }
  });

  if (foundItem) {
    return res.json({ item: foundItem });
  } else {
    return res.json({ item: "Not Found" });
  }
});
router.post("/", (req, res, next) => {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  res.json({ added: { newItem } });
});

router.patch("/:name", (req, res, next) => {
  items.map((item) => {
    if (item.name == req.params.name) {
      item.name = req.body.name;
      item.price = req.body.price;
      return res.json({ updated: item });
    }
  });
  return res.json({ item: "Not Found" });
});

router.delete("/:name", (req, res, next) => {
  let index = items.findIndex((v) => v.name === req.params.name);
  console.log(index);
  if (index != -1) {
    items.splice(index, 1);

    return res.json({ message: "Deleted" });
  }
  return res.json({ item: "Not Found" });
});

module.exports = router;
