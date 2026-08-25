const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override")
// const errorHandler = require("./middlewares/errorhandler");
// const path = require("path");

const app = express();
const router = express.Router();
const port = 3000;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
app.use(methodOverride("_method"));
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
app.use("/", require("./routes/loginRoutes"))
app.use("/",require("./routes/contactRoutes"));


app.listen(port,()=>{
  console.log(`${port}번 포트에서 서버 실행 중`);
});
