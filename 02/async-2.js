displayA = ()=> console.log("A");
displayB = (callback)=> setTimeout(()=>{console.log("B"); callback();},2000);
displayC= ()=> console.log("C");

displayA();
displayB(displayC);

