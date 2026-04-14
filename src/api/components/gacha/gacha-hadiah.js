const mongoose = require('mongoose');
const config = require('../../../core/config');
const { Prize } = require('../../../models');

const prizes = [
  { name: 'Emas 10 gram', maxWinners: 1, currentWinners: 0 },
  { name: 'Smartphone X', maxWinners: 5, currentWinners: 0 },
  { name: 'Smartwatch Y', maxWinners: 10, currentWinners: 0 },
  { name: 'Voucher Rp100.000', maxWinners: 100, currentWinners: 0 },
  { name: 'Pulsa Rp50.000', maxWinners: 500, currentWinners: 0 },
];

async function seed() {
  const connectionString = new URL(config.database.connection);
  connectionString.pathname += config.database.name;

  await mongoose.connect(connectionString.toString());

  await Prize.deleteMany({});
  await Prize.insertMany(prizes);

  process.exit(0);
}

seed();
