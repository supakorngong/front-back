const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
const register = tryCatch(async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body;

  //รับ body {username,password,confirmPassword,email}
  console.log(req.body);
  //validation
  if (!username || !password || !confirmPassword) {
    //   const error = new Error("fill all input");
    //   error.statusCode = 400;
    return next(customError("fill all input", 400));
    //   return next(error);
  }
  if (password !== confirmPassword) {
    //   const error = new Error("check confirmPassword");
    //   error.statusCode = 400;
    return next(customError("check confirmPassword", 400));
  }
  const userExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (userExist) {
    return next(customError("username already existed", 409));
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    username: username,
    password: hashedPassword,
    email: email,
  };
  //create user ใน prisma.user
  const rs = await prisma.user.create({
    data: data,
  });
  console.log(rs);
  res.json({ data: "register successful" });
  res.send(req.body);
  // } catch (err) {
  //   next(err);
  // }
});
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // validation
    // find username in prisma.user
    //check password
    //create jwt-token
    //make payload = {id,username}
    // jwt.sign + {expiresIn : '7d'}
    //response jwt-token
    if (!username && !password) return next(customError("fill input", 400));
    const targetUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!targetUser) return next(customError("invalid login", 400));
    //   console.log(gong);
    const passwok = await bcrypt.compare(password, targetUser.password);
    if (!passwok) throw customError("invalid login", 400);
    const payload = { id: targetUser.id };
    //ไม่ต้องrequire('dotenv').config()เพราะทําไปเเล้ว เป็นเรื่อง call stack load รอบเดียวพอ
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};
const getMe = (req, res, next) => {
  res.json({ message: "i am what i am" });
};
module.exports = { register, login, getMe };
