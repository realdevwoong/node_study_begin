const express = require("express");
const app = express();

app.get("/", (req,res)=>{
  res.status(200).send("Welcome");
});

app.get("/about", (req,res)=>{
  res.status(200).send("About Page");
});

app.listen(3000,()=>{
  console.log("3000번 포트에서 서버 실행 중");
});