const { Img, getImgById, uploadImg } = require("../../models/img.model");

async function httpApiPostImg(req, res) {
  const img = req.body.img;
  const doc = await uploadImg(img);
  if (doc) {
    res.status(200).json({
      success: true,
      message: "uploaded",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "unload failed.",
    });
  }
}
async function httpApiGetImg(req, res) {
  const adsid = req.params.id;
  const data = await getImgById(adsid);
  if (data) {
    res.status(200).json({
      success: true,
      message: "uploaded",
      data,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
}

module.exports = {
  httpApiGetImg,
  httpApiPostImg,
};
