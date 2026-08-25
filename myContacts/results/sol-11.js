const express = require("express");
const app = express();
const port = 5000;

// 이게 없으면 req.body가 undefined라서 req.body.username에서 에러난다
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send(`
        <h2>form 테스트</h2>
        <form action="/form" method="POST">
            <input type="text" name="username" placeholder="이름 입력">
            <button type="submit">보내기</button>
        </form>
    `);
});

app.post("/form",(req, res) =>{
    console.log(req.body);
    console.log(req.body.username);
    res.send(`받은 username: ${req.body.username}`);
});

app.listen(port,()=>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});
