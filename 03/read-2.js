//동기 파일 읽기, 인코딩 형식 지정해주기 때문에 정상출력
const fs = require("fs");

const data = fs.readFileSync("./example.txt", "utf8");
console.log(data);
