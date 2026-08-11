const express = require("express");
const app = express();

app.use(express.json());

let users = { john: { age: 30 } };

app.put("/updateAge", (req, res) => {
    if (users.john) {
        const originalAge = users.john.age;
        users.john.age = req.body.age - 1;
        res.send(`원래 값: ${originalAge}, 수정된 값: ${users.john.age}`);
    }
});

app.listen(5000, () => {
    console.log("서버 실행 중");
});