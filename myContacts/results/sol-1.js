const express = require("express");
const app = express();


app.get("/users/:name", (req,res)=>{
  res.status(200).send(`Hello ${req.params.name}`);
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

app.listen(3000,()=>{
  console.log("3000번 포트에서 서버 실행 중");
});