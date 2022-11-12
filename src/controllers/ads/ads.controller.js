const {
  getAllAds,
  createAds,
  getOneAd,
  editAds,
  Ad,
  deleteAd,
  findUserAds,
} = require("../../models/ads.model");
const { v4: uuidv4 } = require("uuid");
const {
  saveQuestion,
  getAdQuestion,
  addAnswer,
} = require("../../models/quesiton.model");
async function httpGetAllAds(req, res) {
  const ads = await getAllAds();
  res.render("pages/ads", { ads, user: req.user });
}

async function httpGetPostPage(req, res) {
  const emptyAd = new Ad();
  res.render("pages/post", { user: req.user, caution: "", ad: emptyAd });
}

async function httpGetEditPage(req, res) {
  const adsId = req.params.id;
  const adToEdit = await getOneAd(adsId);
  if (req.user.username === adToEdit.username) {
    res.render("pages/post", { user: req.user, caution: "", ad: adToEdit });
  } else {
    res.redirect("/401");
  }
}
async function httpGetUserAds(req, res) {
  const username = req.user.username;
  const userAds = await findUserAds(username);
  console.log({ userAds });
  res.render("pages/manage", { ads: userAds, user: req.user });
}
async function httpGetOneAd(req, res) {
  const adsId = req.params.id;
  const ad = await getOneAd(adsId);
  const questions = await getAdQuestion(adsId);
  console.log({ user: req.user, questions });
  res.render("pages/display", { ad, user: req.user, questions });
}
async function httpPostCreateAds(req, res) {
  const { title, body, price, end, deliveryMethod } = req.body;
  const username = req.user.username;
  const begin = new Date();
  console.log({ body: req.body });
  const ad = {
    adsId: uuidv4(),
    title,
    username,
    price,
    body,
    begin,
    end,
    deliveryMethod,
  };
  console.log({ ad });
  const createResult = await createAds(ad);
  if (createResult) {
    // What page we can redirect after user create ad successfully?
    res.redirect("/");
  } else {
    // Something went wrong, the ad cannot create
    res.redirect("/");
  }
}

async function httpPostUpdateAds(req, res) {
  const adsId = req.params.id;
  const { title, body, price, end, deliveryMethod } = req.body;
  const updatedAd = { title, body, price, end, deliveryMethod };
  await editAds(adsId, updatedAd);
  res.redirect(`/ads/${adsId}`);
}

async function httpDeleteAd(req, res) {
  const adsId = req.params.id;
  const deleteResult = await deleteAd(adsId);
  if (deleteResult) {
    res.redirect("/ads/manage");
  } else {
    res.redirect(`/ads/${adsId}`);
  }
}

//Q&A Meothds
async function httpPostQuestion(req, res) {
  const adsId = req.params.id;
  const question = req.body.question;
  const questionId = uuidv4();
  const questionToSave = {
    adsId,
    questionId,
    question,
  };
  const saveResult = await saveQuestion(questionToSave);
  res.redirect(`/ads/${adsId}`);
}

async function httpPostAddAnswer(req, res) {
  const qid = req.params.qid;
  const answer = req.body.answer;
  console.log({ qid, answer });
  try {
    await addAnswer(qid, answer);
    res.redirect("/ads");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  httpGetAllAds,
  httpPostCreateAds,
  httpPostUpdateAds,
  httpGetOneAd,
  httpDeleteAd,
  httpGetUserAds,
  httpGetPostPage,
  httpGetEditPage,
  httpPostQuestion,
  httpPostAddAnswer,
};
