//동기 파일 읽기 ->  인코딩 형식 지정해주지 않으면 바이러리로 출력
const fs = require("fs");

const data = fs.readFileSync("./example.txt");
console.log(data);
