const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = [];

// 전체 게시글 가져오기
app.get("/items", (req, res) => {
  res.json(items);
});

// 게시글 등록
app.post("/items", (req, res) => {
  items.unshift(req.body);
  res.send("ok");
});

app.listen(3000, () => console.log("서버 실행중"));
