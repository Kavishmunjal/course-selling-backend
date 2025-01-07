const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {userRouter} = require("./router/user")
const {courseRouter} = require("./router/course")
const {adminRouter} = require("./router/admin")


app.use("/user",  userRouter );
app.use("/course",  courseRouter );
app.use("/admin" , adminRouter);

function main(){
mongoose.connect("mongodb+srv://admin:Jco7vnzvcORtrrsL@cluster0.zz2sm.mongodb.net/course-selling");
app.listen(3000);
console.log("connected to port")
}

main();