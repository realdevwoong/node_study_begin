const fs = require("fs");

if(fs.existsSync("./mine")){
	console.log("folder is already exists");
}else{
	fs.mkdir("./mine",(err)=>{
	if(err){
		console.log(err);
	}
	console.log("folder created");
	});
}
	
