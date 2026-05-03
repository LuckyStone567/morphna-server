const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

let items = [];

app.get("/", (req, res) => {
  res.send("Morphna server is running");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const item = {
    id: Date.now(),
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    category: req.body.category
  };

  items.unshift(item);
  res.json(item);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
