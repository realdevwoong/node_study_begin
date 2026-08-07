//비동기도 동기도 똑같이 existSync로 판단한다.

const fs = require("fs");

const data = fs.readFileSync("example.txt", "utf8");

if(fs.existsSync("text-1.txt")){
	console.log("file is already exist");
}else{
	fs.writeFileSync("text-1.txt",data);
}

