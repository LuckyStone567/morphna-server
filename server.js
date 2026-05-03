const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// 👉 여기 너 MongoDB 주소 넣기
const MONGO_URI = "mongodb+srv://Admin:O2pg15TS0lp66mYs@cluster0.1dejeim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch(err => console.log(err));

// 스키마 정의
const ItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  img: String,
  category: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Item = mongoose.model("Item", ItemSchema);

// 전체 게시글 가져오기
app.get("/items", async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "삭제 완료" });
});
// 게시글 등록
app.post("/items", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("서버 실행중");
});
