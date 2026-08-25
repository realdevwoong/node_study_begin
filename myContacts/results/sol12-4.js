const bcrypt = require("bcrypt");

async function hashAndCheck(){
    try{
        const hashed = await bcrypt.hash("myPassword",10);
        const userInput = "myPassword";
        const isMatch = await bcrypt.compare(userInput, hashed);

        if(isMatch){
            console.log("비밀번호가 일치합니다.");
        }else{
            console.log("비밀번호가 일치하지 않습니다.")
        }
    }catch(error){
        console.log(error);
    }
}

hashAndCheck();