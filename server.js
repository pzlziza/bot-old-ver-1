import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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

// ====== 🖼️ AKSES GAMBAR SOAL & GAMBAR PEMBAHASAN ======
app.use("/gambar_soal", express.static("public/gambar_soal"));
app.use("/gambar_pembahasan", express.static("public/gambar_pembahasan"));

// ====== 🤖 API GEMINI ======
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
  process.env.API_KEY;

// ====== 💬 ROUTE CHATBOT (Gemini + Simpan Riwayat) ======
app.post("/api/chat", async (req, res) => {
  const { contents } = req.body;
  const userMessage = contents?.at(-1)?.parts?.[0]?.text || "";

  try {
    db.query(
      "INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)",
      ["guest", "user", userMessage],
      (err) => {
        if (err) console.error("❌ Gagal simpan chat user:", err.message);
      }
    );

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      console.error("⚠️ Error dari Gemini:", response.statusText);
      return res.status(500).json({
        error: "Gagal mendapat respons dari Gemini.",
      });
    }

    const data = await response.json();
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, saya tidak bisa memproses permintaan Anda.";

    db.query(
      "INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)",
      ["guest", "bot", botReply],
      (err) => {
        if (err) console.error("❌ Gagal simpan chat bot:", err.message);
      }
    );

    res.json({ reply: botReply });
  } catch (err) {
    console.error("🚨 Server Error:", err);
    res.status(500).json({
      error: "Terjadi kesalahan pada server.",
    });
  }
});

// ====== 🧩 ROUTE AMBIL SOAL BERDASARKAN MAPEL ======
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
      if (err) {
        console.error("❌ Gagal mengambil soal:", err.message);
        return res.status(500).json({ error: "Gagal mengambil soal." });
      }

      if (results.length === 0) {
        return res.json({ message: "Soal untuk mapel ini belum tersedia." });
      }

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

// ====== 🧠 ROUTE CEK JAWABAN ======
app.post("/api/cek-jawaban", (req, res) => {
  const { mapel, nomor_soal, jawaban_user } = req.body;

  db.query(
    "SELECT jawaban, pembahasan, gambar_pembahasan FROM soal WHERE LOWER(mata_pelajaran) = ? AND nomor_soal = ?",
    [mapel.toLowerCase(), nomor_soal],
    (err, results) => {
      if (err) {
        console.error("❌ Gagal cek jawaban:", err.message);
        return res.status(500).json({ error: "Gagal memeriksa jawaban." });
      }

      if (results.length === 0) {
        return res.json({ message: "Soal tidak ditemukan." });
      }

      const soal = results[0];
      const benar = soal.jawaban.toUpperCase() === jawaban_user.toUpperCase();

      res.json({
        benar: benar, // 🟢 Tambahkan ini
        pesan: benar
          ? "✔️ Jawaban kamu benar!"
          : `❌ Jawaban kamu salah. Jawaban yang benar adalah ${soal.jawaban}.`,
        pembahasan: soal.pembahasan || "Belum ada pembahasan.",
        gambar_pembahasan: soal.gambar_pembahasan
          ? `/gambar_pembahasan/${soal.gambar_pembahasan}`
          : null,
      });
    }
  );
});

// ====== 🧠 ROUTE UNTUK AMBIL HISTORY CHAT ======
app.get("/api/history", (req, res) => {
  db.query(
    "SELECT * FROM chat_history ORDER BY created_at ASC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Gagal mengambil history." });
      }
      res.json(results);
    }
  );
});

// ====== 🚀 JALANKAN SERVER ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server berjalan di http://localhost:${PORT}`)
);
