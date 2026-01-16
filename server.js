import express from "express";
import session from "express-session";
import fetch from "node-fetch";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();
app.set("trust proxy", 1);

/* ================= UTIL ================= */
const safeUnlink = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      console.error("❌ FS unlink error:", filePath, err.message);
    }
  });
};

/* ================= SESSION ================= */
app.use(
  session({
    name: "admin-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60
    }
  })
);

/* ================= GLOBAL MIDDLEWARE ================= */
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ================= DATABASE ================= */
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "ypbuddies"
});

db.connect(err => {
  if (err) console.error("❌ MySQL error:", err.message);
  else console.log("✅ MySQL connected");
});

/* ================= AUTH MIDDLEWARE ================= */
const requireAdmin = (req, res, next) => {
  if (!req.session.admin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
};

/* ================= CHECK ADMIN SESSION ================= */
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi"
    });
  }

  db.query(
    "SELECT id, email FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, rows) => {
      if (err) {
        console.error("❌ Login DB error:", err);
        return res.status(500).json({
          success: false,
          message: "Server error"
        });
      }

      if (rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Email atau password salah"
        });
      }

      req.session.regenerate(err => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Gagal membuat session"
          });
        }

        req.session.admin = {
          id: rows[0].id,
          email: rows[0].email
        };

        res.json({
          success: true,
          admin: req.session.admin
        });
      });
    }
  );
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("admin-session");
    res.json({ success: true });
  });
});

/* ================= CHECK ADMIN SESSION ================= */
app.get("/api/admin/me", requireAdmin, (req, res) => {
  console.log("🧠 SESSION ADMIN:", req.session.admin);
  res.json({
    success: true,
    admin: req.session.admin
  });
});

/* ================= STATIC IMAGE ================= */
["public/gambar_soal", "public/gambar_pembahasan"].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use("/gambar_soal", express.static("public/gambar_soal"));
app.use("/gambar_pembahasan", express.static("public/gambar_pembahasan"));

/* ================= PUBLIC API SOAL (CHATBOT) ================= */
app.get("/api/soal", (req, res) => {
  const { mapel } = req.query;

  if (!mapel) {
    return res.status(400).json({
      success: false,
      message: "Mapel wajib diisi"
    });
  }

  const sql = `
    SELECT
      nomor_soal,
      pertanyaan,
      opsi_a, opsi_b, opsi_c, opsi_d, opsi_e,
      jawaban,
      pembahasan,
      gambar_soal,
      gambar_pembahasan
    FROM soal
    WHERE mata_pelajaran LIKE ?
    ORDER BY nomor_soal ASC
  `;

  db.query(sql, [`%${mapel}%`], (err, rows) => {
    if (err) {
      console.error("❌ DB soal error:", err);
      return res.status(500).json({ success: false });
    }

    if (!rows.length) {
      return res.json({
        success: false,
        message: "Soal tidak ditemukan"
      });
    }

    res.json({
      success: true,
      data: rows
    });
  });
});

/* ================= CEK JAWABAN (CHATBOT) ================= */
app.post("/api/cek-jawaban", (req, res) => {

  const { mapel, nomor_soal, jawaban_user } = req.body;

  if (!mapel || !nomor_soal || !jawaban_user) {
    return res.status(400).json({
      benar: false,
      pesan: "Data jawaban tidak lengkap"
    });
  }

  const sql = `
    SELECT
      jawaban,
      pembahasan,
      gambar_pembahasan
    FROM soal
    WHERE mata_pelajaran LIKE ?
      AND nomor_soal = ?
    LIMIT 1
  `;

  db.query(
    sql,
    [`%${mapel}%`, nomor_soal],
    (err, rows) => {
      if (err) {
        console.error("❌ DB cek jawaban error:", err);
        return res.status(500).json({
          benar: false,
          pesan: "Server error saat cek jawaban"
        });
      }

      if (!rows.length) {
        return res.json({
          benar: false,
          pesan: "Soal tidak ditemukan"
        });
      }

      const soal = rows[0];
      const jawabanBenar = soal.jawaban.toUpperCase();
      const jawabanUser = jawaban_user.toUpperCase();

      const benar = jawabanUser === jawabanBenar;

      res.json({
        benar,
        pesan: benar
          ? "✅ Jawaban kamu BENAR!"
          : `❌ Jawaban kamu SALAH. Jawaban yang benar adalah <b>${jawabanBenar}</b>.`,
        pembahasan: soal.pembahasan,
        gambar_pembahasan: soal.gambar_pembahasan
          ? `/gambar_pembahasan/${soal.gambar_pembahasan}`
          : null
      });
    }
  );
});

/* ================= GEMINI ================= */
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
  process.env.API_KEY;

/* ================= CHATBOT ================= */
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
      body: JSON.stringify({ contents })
    });

    const data = await response.json();
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, saya tidak bisa memproses.";

    db.query(
      "INSERT INTO chat_history (user_id, role, message) VALUES (?, ?, ?)",
      ["guest", "bot", botReply]
    );

    res.json({ reply: botReply });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

/* ================= HISTORY CHAT (ADMIN) ================= */
app.get("/api/history", requireAdmin, (req, res) => {
  db.query("SELECT * FROM chat_history ORDER BY created_at ASC", (err, rows) => {
    if (err) return res.json({ success: false });
    res.json(rows);
  });
});

app.delete("/api/history", requireAdmin, (req, res) => {
  db.query("DELETE FROM chat_history", err => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
});

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      file.fieldname === "gambar_soal"
        ? "public/gambar_soal"
        : "public/gambar_pembahasan"
    );
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

/* ================= CRUD SOAL (ADMIN) ================= */

// GET semua soal
app.get("/api/admin/soal", requireAdmin, (req, res) => {
  db.query("SELECT * FROM soal ORDER BY id DESC", (err, rows) => {
    if (err) return res.json({ success: false });
    res.json(rows);
  });
});

// GET 1 soal
app.get("/api/admin/soal/:id", requireAdmin, (req, res) => {
  db.query(
    "SELECT * FROM soal WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err || rows.length === 0) return res.json({ success: false });
      res.json({ success: true, data: rows[0] });
    }
  );
});

// TAMBAH soal
app.post(
  "/api/admin/soal",
  requireAdmin,
  upload.fields([
    { name: "gambar_soal", maxCount: 1 },
    { name: "gambar_pembahasan", maxCount: 1 }
  ]),
  (req, res) => {
    const gSoal = req.files?.gambar_soal?.[0]?.filename || null;
    const gPemb = req.files?.gambar_pembahasan?.[0]?.filename || null;

    const sql = `
      INSERT INTO soal (
        mata_pelajaran, nomor_soal, pertanyaan,
        gambar_soal,
        opsi_a, opsi_b, opsi_c, opsi_d, opsi_e,
        jawaban, pembahasan, gambar_pembahasan
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        req.body.mata_pelajaran,
        req.body.nomor_soal,
        req.body.pertanyaan,
        gSoal,
        req.body.opsi_a,
        req.body.opsi_b,
        req.body.opsi_c,
        req.body.opsi_d,
        req.body.opsi_e,
        req.body.jawaban,
        req.body.pembahasan,
        gPemb
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
  requireAdmin,
  upload.fields([
    { name: "gambar_soal", maxCount: 1 },
    { name: "gambar_pembahasan", maxCount: 1 }
  ]),
  (req, res) => {
    const id = req.params.id;

    db.query(
      "SELECT gambar_soal, gambar_pembahasan FROM soal WHERE id=?",
      [id],
      (err, rows) => {
        if (err || !rows.length) return res.status(404).json({ success: false });

        const old = rows[0];
        const gSoal = req.files?.gambar_soal?.[0]?.filename || old.gambar_soal;
        const gPemb =
          req.files?.gambar_pembahasan?.[0]?.filename ||
          old.gambar_pembahasan;

        if (req.files?.gambar_soal && old.gambar_soal) {
          safeUnlink(`public/gambar_soal/${old.gambar_soal}`);
        }

        if (req.files?.gambar_pembahasan && old.gambar_pembahasan) {
          safeUnlink(`public/gambar_pembahasan/${old.gambar_pembahasan}`);
        }

        const sql = `
          UPDATE soal SET
            mata_pelajaran=?, nomor_soal=?, pertanyaan=?,
            opsi_a=?, opsi_b=?, opsi_c=?, opsi_d=?, opsi_e=?,
            jawaban=?, pembahasan=?,
            gambar_soal=?, gambar_pembahasan=?
          WHERE id=?
        `;

        db.query(
          sql,
          [
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
            gSoal,
            gPemb,
            id
          ],
          err => {
            if (err) return res.status(500).json({ success: false });
            res.json({ success: true });
          }
        );
      }
    );
  }
);

// DELETE soal
app.delete("/api/admin/soal/:id", requireAdmin, (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT gambar_soal, gambar_pembahasan FROM soal WHERE id=?",
    [id],
    (err, rows) => {
      if (err || !rows.length) return res.status(404).json({ success: false });

      if (rows[0].gambar_soal) {
        safeUnlink(`public/gambar_soal/${rows[0].gambar_soal}`);
      }

      if (rows[0].gambar_pembahasan) {
        safeUnlink(`public/gambar_pembahasan/${rows[0].gambar_pembahasan}`);
      }

      db.query("DELETE FROM soal WHERE id=?", [id], err => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
      });
    }
  );
});

/* ================= STATIC PUBLIC ================= */
app.use(express.static("public"));

/* ================= STATIC ADMIN (NO CACHE HTML ONLY) ================= */
app.use(
  "/admin",
  express.static("admin", {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.set({
          "Cache-Control": "no-store, no-cache, must-revalidate, private",
          "Pragma": "no-cache",
          "Expires": "0"
        });
      }
    }
  })
);

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running http://localhost:${PORT}`)
);
