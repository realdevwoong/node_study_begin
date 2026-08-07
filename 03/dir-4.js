const fs = require("fs");

fs.rm("./test2", {recursive:true},(err)=>{
  if(err){
    console.error(err);
  }else{
    console.log("folder deleted");
}
});
