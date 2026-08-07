const http = require("http");

const server = http.createServer((req,res)=>{
  console.log("request from clinet");
});

server.listen(3000,()=>{
  console.log("3000번 포트에서 서버 실행 중");
});
