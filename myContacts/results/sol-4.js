const express = require("express");
const app = express();


const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith"},
  { id: 3, name: "Bob Johnson" }
];  

app.get("/users", (req,res)=>{
  res.json(users);
});   


app.listen(3000, ()=>{
  console.log("3000번 포트에서 서버 실행 중");
});