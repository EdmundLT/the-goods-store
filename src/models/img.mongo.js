// Project Name: Used Goods Store
// Date: Dec 02 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna
const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  adsId: String,
  imgBase64: String,
});

module.exports = mongoose.model("Img", imgSchema);
