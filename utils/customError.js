module.exports = (msg, statusCode) => {
  const error = new Error(msg);
  //got object error
  error.statusCode = statusCode;
  // เพิ่ม key statuscode มีค่าเป็น status code ที่ส่งมา
  return error;
};
