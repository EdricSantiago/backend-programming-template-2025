module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema({
      name: String,
      maxWinners: Number,
      currentWinners: { type: Number, default: 0 },
    })
  );
