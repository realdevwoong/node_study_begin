const fs = require("fs");
const path = require("path");

fs.readdir("../",(err,files) =>{
if(err){
  console.log(err);
}
  let count=0;
  files.forEach((file)=>{
  const ext = path.extname(file);
  if(ext===".txt"){
    count++;
  }
});
console.log("확장자가 txt인 갯수는", count, "입니다");
});

