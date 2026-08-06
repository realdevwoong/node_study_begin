displayA = ()=> console.log("A");
displayB = ()=> setTimeout(()=>{console.log("B");},2000);
displayC = ()=> console.log("C");

displayA();
displayB();
displayC();

