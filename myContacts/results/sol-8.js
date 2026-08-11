const express = require("express");
const app = express();
const path = require("path");

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "../views"));


app.get("/template",(req,res)=>{
    res.render("template");
});

app.listen(5000,()=>{
    console.log(`서버 실행 중`);
})