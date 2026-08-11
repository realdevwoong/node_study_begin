const express = require('express');
const app = express();

app.get("/hello/:name",(req,res)=>{
    const name = req.params.name;
    res.send(`Hello,${name}!`);
});

app.listen(5000,()=>{
    console.log("서버 실행 중");
})