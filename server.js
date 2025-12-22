import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/admin", express.static("admin"));

// ====== 🗄️ KONEKSI DATABASE MYSQL ======
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "ypbuddies",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke MySQL:", err.message);
  } else {
    console.log("✅ Terhubung ke MySQL Database!");
  }
});

// ====== 🖼️ AKSES GAMBAR SOAL & PEMBAHASAN ======
app.use("/gambar_soal", express.static("public/gambar_soal"));
app.use("/gambar_pembahasan", express.static("public/gambar_pembahasan"));

// ====== 🤖 API GEMINI ======
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
  process.env.API_KEY;

// ====== 💬 CHATBOT ======
app.post("/api/chat", async (req, res) => {
  const { contents } = req.body;
  const userMessage = contents?.at(-1)?.parts?.[0]?.text || "";

  try {
    db.query(
      "INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)",
      ["guest", "user", userMessage]
    );

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, saya tidak bisa memproses permintaan Anda.";

    db.query(
      "INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)",
      ["guest", "bot", botReply]
    );

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
});

// ====== 📚 AMBIL SOAL ======
app.get("/api/soal/:mapel", (req, res) => {
  const mapel = req.params.mapel.toLowerCase();

  db.query(
    `SELECT nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, 
            jawaban, pembahasan, gambar_soal, gambar_pembahasan
     FROM soal
     WHERE LOWER(mata_pelajaran) = ?
     ORDER BY nomor_soal ASC`,
    [mapel],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Gagal mengambil soal." });

      const formatted = results.map((s) => ({
        ...s,
        gambar_soal: s.gambar_soal ? `/gambar_soal/${s.gambar_soal}` : null,
        gambar_pembahasan: s.gambar_pembahasan
          ? `/gambar_pembahasan/${s.gambar_pembahasan}`
          : null,
      }));

      res.json(formatted);
    }
  );
});

// ====== ✅ CEK JAWABAN ======
app.post("/api/cek-jawaban", (req, res) => {
  const { mapel, nomor_soal, jawaban_user } = req.body;

  db.query(
    `SELECT jawaban, pembahasan, gambar_pembahasan
     FROM soal
     WHERE LOWER(mata_pelajaran) = ? AND nomor_soal = ?`,
    [mapel.toLowerCase(), nomor_soal],
    (err, results) => {
      if (err || results.length === 0) {
        return res.json({ message: "Soal tidak ditemukan." });
      }

      const soal = results[0];
      const benar =
        soal.jawaban.toUpperCase() === jawaban_user.toUpperCase();

      res.json({
        benar,
        pesan: benar
          ? "✔️ Jawaban kamu benar!"
          : `❌ Jawaban kamu salah. Jawaban yang benar adalah ${soal.jawaban}.`,
        pembahasan: soal.pembahasan,
        gambar_pembahasan: soal.gambar_pembahasan
          ? `/gambar_pembahasan/${soal.gambar_pembahasan}`
          : null,
      });
    }
  );
});

// ====== 🧠 HISTORY CHAT ======
app.get("/api/history", (req, res) => {
  db.query(
    "SELECT * FROM chat_history ORDER BY created_at ASC",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Gagal ambil history." });
      res.json(results);
    }
  );
});

// ====== 🗑️ DELETE SEMUA HISTORY CHAT ======
app.delete("/api/history", (req, res) => {
  db.query("DELETE FROM chat_history", err => {
    if (err) {
      console.error(err);
      return res.json({ success: false });
    }
    res.json({ success: true });
  });
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false });
      }

      if (result.length === 0) {
        return res.json({
          success: false,
          message: "Email atau password salah",
        });
      }

      res.json({ success: true });
    }
  );
});

app.post("/api/admin/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email dan password wajib diisi",
    });
  }

  db.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],
    (err, result) => {
      if (result.length > 0) {
        return res.json({
          success: false,
          message: "Email sudah terdaftar",
        });
      }

      db.query(
        "INSERT INTO admin (email, password) VALUES (?, ?)",
        [email, password],
        () => {
          res.json({ success: true });
        }
      );
    }
  );
});

// ====== 📤 UPLOAD GAMBAR SOAL ======
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "gambar_soal") {
      cb(null, "public/gambar_soal");
    } else if (file.fieldname === "gambar_pembahasan") {
      cb(null, "public/gambar_pembahasan");
    }
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ================= ADMIN CRUD SOAL =================

// Ambil semua soal
// ================= ADMIN CRUD SOAL =================

// GET semua soal
app.get("/api/admin/soal", (req, res) => {
  db.query("SELECT * FROM soal ORDER BY id DESC", (err, result) => {
    if (err) return res.json({ success: false });
    res.json(result);
  });
});

// GET 1 soal (edit)
app.get("/api/admin/soal/:id", (req, res) => {
  db.query(
    "SELECT * FROM soal WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.json({ success: false });
      }
      res.json({ success: true, data: result[0] });
    }
  );
});

// TAMBAH soal
app.post(
  "/api/admin/soal",
  upload.fields([
    { name: "gambar_soal", maxCount: 1 },
    { name: "gambar_pembahasan", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      mata_pelajaran,
      nomor_soal,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      opsi_e,
      jawaban,
      pembahasan,
    } = req.body;

    const gambar_soal = req.files?.gambar_soal?.[0]?.filename || null;
    const gambar_pembahasan =
      req.files?.gambar_pembahasan?.[0]?.filename || null;

    const sql = `
      INSERT INTO soal (
        mata_pelajaran, nomor_soal, pertanyaan,
        gambar_soal,
        opsi_a, opsi_b, opsi_c, opsi_d, opsi_e,
        jawaban,
        pembahasan,
        gambar_pembahasan
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        mata_pelajaran,
        nomor_soal,
        pertanyaan,
        gambar_soal,
        opsi_a,
        opsi_b,
        opsi_c,
        opsi_d,
        opsi_e,
        jawaban,
        pembahasan,
        gambar_pembahasan,
      ],
      err => {
        if (err) return res.json({ success: false });
        res.json({ success: true });
      }
    );
  }
);

// UPDATE soal
app.put(
  "/api/admin/soal/:id",
  upload.fields([
    { name: "gambar_soal", maxCount: 1 },
    { name: "gambar_pembahasan", maxCount: 1 },
  ]),
  (req, res) => {
    const { id } = req.params;

    db.query(
      "SELECT gambar_soal, gambar_pembahasan FROM soal WHERE id = ?",
      [id],
      (err, rows) => {
        if (err || rows.length === 0)
          return res.json({ success: false });

        const old = rows[0];

        const gambar_soal =
          req.files?.gambar_soal?.[0]?.filename || old.gambar_soal;

        const gambar_pembahasan =
          req.files?.gambar_pembahasan?.[0]?.filename ||
          old.gambar_pembahasan;

        // hapus file lama kalau upload baru
        if (req.files?.gambar_soal && old.gambar_soal) {
          fs.unlink(`public/gambar_soal/${old.gambar_soal}`, () => {});
        }

        if (req.files?.gambar_pembahasan && old.gambar_pembahasan) {
          fs.unlink(
            `public/gambar_pembahasan/${old.gambar_pembahasan}`,
            () => {}
          );
        }

        const sql = `
          UPDATE soal SET
            mata_pelajaran = ?,
            nomor_soal = ?,
            pertanyaan = ?,
            opsi_a = ?,
            opsi_b = ?,
            opsi_c = ?,
            opsi_d = ?,
            opsi_e = ?,
            jawaban = ?,
            pembahasan = ?,
            gambar_soal = ?,
            gambar_pembahasan = ?
          WHERE id = ?
        `;

        const data = [
          req.body.mata_pelajaran,
          req.body.nomor_soal,
          req.body.pertanyaan,
          req.body.opsi_a,
          req.body.opsi_b,
          req.body.opsi_c,
          req.body.opsi_d,
          req.body.opsi_e,
          req.body.jawaban,
          req.body.pembahasan,
          gambar_soal,
          gambar_pembahasan,
          id,
        ];

        db.query(sql, data, err => {
          if (err) return res.json({ success: false });
          res.json({ success: true });
        });
      }
    );
  }
);

// DELETE soal + hapus file
app.delete("/api/admin/soal/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT gambar_soal, gambar_pembahasan FROM soal WHERE id = ?",
    [id],
    (err, rows) => {
      if (rows?.length) {
        if (rows[0].gambar_soal)
          fs.unlink(`public/gambar_soal/${rows[0].gambar_soal}`, () => {});
        if (rows[0].gambar_pembahasan)
          fs.unlink(
            `public/gambar_pembahasan/${rows[0].gambar_pembahasan}`,
            () => {}
          );
      }

      db.query("DELETE FROM soal WHERE id = ?", [id], err => {
        if (err) return res.json({ success: false });
        res.json({ success: true });
      });
    }
  );
});

// Tambah soal (A–E)
// Tambah soal + upload gambar
app.post(
  "/api/admin/soal",
  upload.fields([
    { name: "gambar_soal", maxCount: 1 },
    { name: "gambar_pembahasan", maxCount: 1 },
  ]),
  (req, res) => {

  const {
    mata_pelajaran,
    nomor_soal,
    pertanyaan,
    opsi_a,
    opsi_b,
    opsi_c,
    opsi_d,
    opsi_e,
    jawaban,
    pembahasan,
  } = req.body;

  const gambar_soal = req.files?.gambar_soal
  ? req.files.gambar_soal[0].filename
  : null;

const gambar_pembahasan = req.files?.gambar_pembahasan
  ? req.files.gambar_pembahasan[0].filename
  : null;

  const sql = `
  INSERT INTO soal
  (
    mata_pelajaran, nomor_soal, pertanyaan,
    gambar_soal,
    opsi_a, opsi_b, opsi_c, opsi_d, opsi_e,
    jawaban,
    pembahasan,
    gambar_pembahasan
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(
  sql,
  [
    mata_pelajaran,
    nomor_soal,
    pertanyaan,
    gambar_soal,
    opsi_a,
    opsi_b,
    opsi_c,
    opsi_d,
    opsi_e,
    jawaban,
    pembahasan,
    gambar_pembahasan,
  ],
  (err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  }
);
});

// Hapus soal
app.delete("/api/admin/soal/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM soal WHERE id = ?", [id], (err) => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
});

// Ambil 1 soal by ID (untuk edit)
app.get("/api/admin/soal/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM soal WHERE id = ?", [id], (err, result) => {
    if (err || result.length === 0) {
      return res.json({ success: false });
    }
    res.json({ success: true, data: result[0] });
  });
});

// Update soal
app.put(
  "/api/admin/soal/:id",
  upload.fields([
    { name: "gambar_soal", maxCount: 1 },
    { name: "gambar_pembahasan", maxCount: 1 },
  ]),
  (req, res) => {
    const { id } = req.params;

    const {
      mata_pelajaran,
      nomor_soal,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      opsi_e,
      jawaban,
      pembahasan,
    } = req.body;

    const gambar_soal = req.files?.gambar_soal
      ? req.files.gambar_soal[0].filename
      : null;

    const gambar_pembahasan = req.files?.gambar_pembahasan
      ? req.files.gambar_pembahasan[0].filename
      : null;

    let sql = `
      UPDATE soal SET
        mata_pelajaran = ?,
        nomor_soal = ?,
        pertanyaan = ?,
        opsi_a = ?,
        opsi_b = ?,
        opsi_c = ?,
        opsi_d = ?,
        opsi_e = ?,
        jawaban = ?,
        pembahasan = ?
    `;

    const params = [
      mata_pelajaran,
      nomor_soal,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      opsi_e,
      jawaban,
      pembahasan,
    ];

    if (gambar_soal) {
      sql += ", gambar_soal = ?";
      params.push(gambar_soal);
    }

    if (gambar_pembahasan) {
      sql += ", gambar_pembahasan = ?";
      params.push(gambar_pembahasan);
    }

    sql += " WHERE id = ?";
    params.push(id);

    db.query(sql, params, (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    });
  }
);

app.get("/api/admin/soal/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM soal WHERE id = ?",
    [id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).json({ error: "Soal tidak ditemukan" });
      }
      res.json(result[0]);
    }
  );
});

app.put(
  "/api/admin/soal/:id",
  upload.fields([
    { name: "gambar_soal", maxCount: 1 },
    { name: "gambar_pembahasan", maxCount: 1 },
  ]),
  (req, res) => {
    const id = req.params.id;

    const {
      mata_pelajaran,
      nomor_soal,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      opsi_e,
      jawaban,
      pembahasan,
    } = req.body;

    const gambar_soal = req.files?.gambar_soal
      ? req.files.gambar_soal[0].filename
      : null;

    const gambar_pembahasan = req.files?.gambar_pembahasan
      ? req.files.gambar_pembahasan[0].filename
      : null;

    const sql = `
      UPDATE soal SET
        mata_pelajaran = ?,
        nomor_soal = ?,
        pertanyaan = ?,
        opsi_a = ?,
        opsi_b = ?,
        opsi_c = ?,
        opsi_d = ?,
        opsi_e = ?,
        jawaban = ?,
        pembahasan = ?
        ${gambar_soal ? ", gambar_soal = ?" : ""}
        ${gambar_pembahasan ? ", gambar_pembahasan = ?" : ""}
      WHERE id = ?
    `;

    const params = [
      mata_pelajaran,
      nomor_soal,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      opsi_e,
      jawaban,
      pembahasan,
    ];

    if (gambar_soal) params.push(gambar_soal);
    if (gambar_pembahasan) params.push(gambar_pembahasan);

    params.push(id);

    db.query(sql, params, err => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    });
  }
);

// ====== 🚀 JALANKAN SERVER ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server berjalan di http://localhost:${PORT}`)
);
