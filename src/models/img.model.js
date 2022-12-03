const imgDb = require("./img.mongo");

export class Img {
  adsId;
  imgBase64;

  constructor(asdId, imgBase64) {
    this.adsId = asdId;
    this.imgBase64 = imgBase64;
  }
}

async function getImgById(adsId) {
  const doc = await imgDb.findOne({ adsId });
  return doc;
}

async function uploadImg(img) {
  const doc = await imgDb.create(img);
  return doc;
}

module.exports = {
  getImgById,
  uploadImg,
};
