const express = require("express");
// const errorHandler = require("./middlewares/errorhandler");
// const path = require("path");
const dbConnect = require("./config/dbConnect");

const app = express();
const port = 3000;
dbConnect();
const router = express.Router();

// const requestTime = (req,res,next)=>{
//   let today = new Date();
//   let now = today.toLocaleString();
//   req.requestTime = now;
//   console.log(`Request Time: ${req.requestTime}`);
//   next();
// }
// app.use(requestTime);

// app.get("/",(req,res)=>{
//   const requestText = `Hello Node! \n: ${req.requestTime}`;
//   res.set("Content-Type","text/plain");
//   res.send(requestText);
// });

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",require("./routes/contactRoutes"));


app.listen(port,()=>{
  console.log(`${port}번 포트에서 서버 실행 중`);
});
