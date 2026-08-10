const express = require("express");
const app = express();


app.get("/square/:number", (req,res)=>{
  const number = req.params.number;
  const square = number * number;
  res.status(200).send(`The square of ${number} is ${square}`);
});

app.listen(3000,()=>{
  console.log("3000번 포트에서 서버 실행 중");
});