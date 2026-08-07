const fs = require("node:fs");

fs.readdir("./", (err, files)=>{
	if(err){
		conosole.log(err);
	}
	console.log(files);
});

console.log("Code is done.");

