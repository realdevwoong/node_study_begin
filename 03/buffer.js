const fs = require("fs");

fs.readFile("example.txt", (err,data)=>{
  if(err){
   console.log(err);
  }else{
   console.log(data);
   console.log("\n");
   console.log(data.toString());
   }
});	
