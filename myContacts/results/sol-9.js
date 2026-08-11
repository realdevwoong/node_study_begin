const express = require("express");
const path = require("path");
const app = express();

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/:username", (req,res)=>{
    let username = req.params.username;
    res.render("username",{username:username});
})

app.listen(5000,()=>{
    console.log(`서버 진행 중`);
});

