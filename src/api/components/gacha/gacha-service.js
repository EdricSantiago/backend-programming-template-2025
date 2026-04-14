const gachaRepository = require('./gacha-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getPrizes() {
  return gachaRepository.getPrizes();
}

async function doGacha(username) {
  const today = new Date().toISOString().split('T')[0];

  // Cek kuota harian
  const todayCount = await gachaRepository.countTodayGacha(username, today);
  if (todayCount >= 5) {
  throw errorResponder(errorTypes.BAD_REQUEST, 'Batas gacha harian sudah tercapai (maks 5x)');
  }

  // Ambil semua prize yang masih ada kuota
  const prizes = await gachaRepository.getPrizes();
  const available = prizes.filter(p => p.currentWinners < p.maxWinners);

  // Tentukan menang atau tidak (probabilitas sederhana)
  const won = available.length > 0 && Math.random() < 0.3;

  let prize = null;
  if (won) {
    // Pilih prize random dari yang masih tersedia
    prize = available[Math.floor(Math.random() * available.length)];
    await gachaRepository.updateWinner(prize._id);
  }

  // Simpan log
  await gachaRepository.saveLog(username, prize?._id || null, won, today);

  return {
    won,
    status: won? 'Selamat Anda Menang' : 'Anda Kurang Beruntung Silahkan Coba Lagi!',
    prize: won ? prize.name : null,
    remaining: 5 - (todayCount + 1),
  };
}

async function getHistory(username) {
  return gachaRepository.getHistoryByUsername(username);
}

function maskName(name) {
  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 1) return word;
      return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
    })
    .join(' ');
}

async function getWinners() {
  const winners = await gachaRepository.getWinners();
  return winners.map((log) => ({
    username: maskName(log.username),
    prize: log.prize ? log.prize.name : null,
    date: log.date,
  }));
}

module.exports = {
  getPrizes,
  doGacha,
  getHistory,
  getWinners,
};
