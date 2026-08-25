// userMode.js의 사용자 모델을 참고하여 사용자 등록 API를 작성하세요.
// name과 email, password를 사용해서 사용자를 등록합니다.

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1) DB 연결
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// 2) 사용자 스키마 (지문대로 name / email / password)
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("PracticeUser", UserSchema);

// 3) 브라우저로 테스트할 폼 (주소창은 GET만 보낼 수 있어서 이게 필요하다)
app.get("/register", (req, res) => {
  res.send(`
    <h2>사용자 등록</h2>
    <form action="/register" method="POST">
      <input name="name" placeholder="이름"><br>
      <input name="email" placeholder="메일 주소"><br>
      <input name="password" type="password" placeholder="비밀번호"><br>
      <button type="submit">등록</button>
    </form>
  `);
});

// 4) 등록 API
app.post(
  "/register",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("name, email, password는 필수입니다");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered", user });
  })
);

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});
