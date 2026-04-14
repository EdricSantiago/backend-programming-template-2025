# Gacha Lottery API

## Cara Menjalankan

```bash
npm install
cp .env.example .env 
node src/api/components/gacha/gacha-hadiah.js 
npm start
```

Base URL: `http://localhost:5000/api`

---

## Daftar Endpoint

### 1. Roll Gacha

**POST** `/gacha`

Melakukan satu percobaan gacha. Maksimal 5x per hari per username.

**Request Body:**
```json
{
  "username": "string"
}
```

**Response Sukses (200):**
```json
{
  "won": true,
  "status": "Selamat Anda Menang",
  "prize": "Pulsa Rp50.000",
  "remaining": 3
}
```

**Response Tidak Menang (200):**
```json
{
  "won": false,
  "status": "Anda Kurang Beruntung Silahkan Coba Lagi!",
  "prize": null,
  "remaining": 4
}
```

**Response Batas Harian Tercapai (400):**
```json
{
  "statusCode": 400,
  "error": "BAD_REQUEST_ERROR",
  "description": "Bad request",
  "message": "Batas gacha harian sudah tercapai (maks 5x)"
}
```

**Response Username Kosong (400):**
```json
{
  "statusCode": 400,
  "error": "VALIDATION_ERROR",
  "description": "Invalid request",
  "message": "Username is required"
}
```

---

### 2. Daftar Hadiah & Sisa Kuota

**GET** `/prizes`

Menampilkan semua hadiah beserta kuota maksimal dan sisa kuota pemenang.

**Response (200):**
```json
[
  {
    "_id": "...",
    "name": "Emas 10 gram",
    "maxWinners": 1,
    "currentWinners": 0
  },
  {
    "_id": "...",
    "name": "Smartphone X",
    "maxWinners": 5,
    "currentWinners": 0
  },
  {
    "_id": "...",
    "name": "Smartwatch Y",
    "maxWinners": 10,
    "currentWinners": 0
  },
  {
    "_id": "...",
    "name": "Voucher Rp100.000",
    "maxWinners": 100,
    "currentWinners": 0
  },
  {
    "_id": "...",
    "name": "Pulsa Rp50.000",
    "maxWinners": 500,
    "currentWinners": 0
  }
]
```

---

### 3. Riwayat Gacha User

**GET** `/gacha/history/:username`

Menampilkan seluruh riwayat percobaan gacha milik user tertentu, termasuk hadiah yang didapat (jika menang).

**Contoh Request:**
```
GET /api/gacha/history/testuser
```

**Response (200):**
```json
[
  {
    "_id": "...",
    "username": "testuser",
    "prize": null,
    "won": false,
    "date": "2026-04-14"
  },
  {
    "_id": "...",
    "username": "testuser",
    "prize": {
      "_id": "...",
      "name": "Pulsa Rp50.000",
      "maxWinners": 500,
      "currentWinners": 1
    },
    "won": true,
    "date": "2026-04-14"
  }
]
```

---

### 4. Daftar Pemenang

**GET** `/gacha/winners`

Menampilkan semua pemenang gacha.

**Response (200):**
```json
[
  {
    "username": "t******r",
    "prize": "Pulsa Rp50.000",
    "date": "2026-04-14"
  },
  {
    "username": "j**e D*e",
    "prize": "Emas 10 gram",
    "date": "2026-04-14"
  }
]
```