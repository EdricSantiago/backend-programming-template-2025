module.exports = (db) =>
  db.model(
    'gachaLog',
    db.Schema({
      username: String,
      prize: {
        type: db.Schema.Types.ObjectId,
        ref: 'Prize',
        default: null,
      },
      won: { type: Boolean, default: false },
      date: String,
    })
  );
