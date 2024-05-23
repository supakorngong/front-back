// require => ไปอ่านไฟล์มาซะ
//มุดเข้าไปใน nodemodule เเล้วเอา ไฟล์นี้มาอ่าน
require("dotenv").config(); //อยากให่้ตัวเเปรมีผลให้ใส่ด้วย .config()
//เอา callback ไปเเยกไฟล์ ใน middleware
const notFound = require("./middlewares/not-Found");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth-Route");
const toDorouter = require("./routes/todo-Route");
const errMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");

//log ดู .env
// console.log(process.env.port);
// console.log(+process.env.AAA + 1);
// console.log(process.env.JWT_SECRET);

// app.use มองเป็นยาม คนที่1 คนที่2
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// /auth มา ให้ authRouter รับผิดชอบ
app.use("/auth", authRouter);
app.use("/todos", authenticate, toDorouter);
app.use(notFound);
app.use(errMiddleware);
let port = process.env.port || 8000;
app.listen(port, () => console.log(`server ${port} start"`));
