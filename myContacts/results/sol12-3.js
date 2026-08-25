const bcrypt = require("bcrypt");

async function hashPassword(){
    const hashed = await bcrypt.hash("myPassword",10);
    console.log(hashed);
}
hashPassword();