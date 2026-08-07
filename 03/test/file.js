const fs = require("fs");

const writeData = (filePath, content) =>{
	fs.writeFileSync(filePath, content);
};
module.exports = writeData;


