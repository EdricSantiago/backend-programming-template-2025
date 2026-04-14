const { Prize, gachaLog } = require('../../../models');

async function getPrizes() {
  return Prize.find({});
}

async function countTodayGacha(username, date) {
  return gachaLog.countDocuments({ username, date });
}

async function saveLog(username, prizeId, won, date) {
  return gachaLog.create({ username, prize: prizeId, won, date });
}

async function updateWinner(prizeId) {
  return Prize.findByIdAndUpdate(prizeId, { $inc: { currentWinners: 1 } });
}

async function getHistoryByUsername(username) {
  return gachaLog.find({ username }).populate('prize');
}

async function getWinners() {
  return gachaLog.find({ won: true }).populate('prize');
}

module.exports = {
  getPrizes,
  countTodayGacha,
  saveLog,
  updateWinner,
  getHistoryByUsername,
  getWinners,
};
