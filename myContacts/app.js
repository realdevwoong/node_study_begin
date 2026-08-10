const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req,res)=>{
  res.status(200);
  res.send("Hello Node!");
});

app.get("/contacts", (req,res)=>{
  res.status(200).send("Contacts Page");
});

app.post("/contacts",(req,res)=>{
  res.status(201).send("Create Contacts");
});

app.get("/contacts/:id",(req,res)=>{
  res.status(200).send(`View Contact for ID ${req.params.id}`);
});

app.get("/contacts/:id",(req,res)=>{
  res.status(200).send(`View Contact for ID ${req.params.id}`);
});

app.put("/contacts/:id",(req,res)=>{
  res.status(200).send(`Update Contact for ID ${req.params.id}`);
});

app.delete("/contacts/:id",(req,res)=>{
  res.status(200).send(`Delete Contact for ID ${req.params.id}`);
});

app.listen(port,()=>{
  console.log(`${port}번 포트에서 서버 실행 중`);
});
