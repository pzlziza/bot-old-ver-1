import express from "express";
import session from "express-session";
import fetch from "node-fetch";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

/* ================= SESSION ================= */
app.use(
  session({
    name: "admin-session",
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC ================= */
app.use(express.static("public"));
app.use("/admin", express.static("admin"));

/* ================= MYSQL ================= */
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "ypbuddies",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("✅ MySQL Connected");

/* ================= AUTH MIDDLEWARE ================= */
const requireAdmin = (req, res, next) => {
  if (!req.session.admin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  next();
};

/* ================= REGISTER ADMIN ================= */
app.post("/api/admin/register", (req, res) => {

  const { email, password } = req.body;

  console.log("📥 REGISTER:", email);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi"
    });
  }

  db.query(
    "SELECT id FROM admin WHERE email = ?",
    [email],
    (err, rows) => {

      if (err) {
        console.error("❌ CHECK ERROR:", err);

        return res.status(500).json({
          success: false,
          message: "Server error"
        });
      }

      if (rows.length > 0) {
        return res.json({
          success: false,
          message: "Email sudah digunakan"
        });
      }

      db.query(
        "INSERT INTO admin (email, password) VALUES (?, ?)",
        [email, password],
        (err, result) => {

          if (err) {
            console.error("❌ INSERT ERROR:", err);

            return res.status(500).json({
              success: false,
              message: "Gagal membuat akun"
            });
          }

          console.log("✅ ADMIN BERHASIL DIBUAT");

          res.json({
            success: true,
            message: "Akun berhasil dibuat"
          });

        }
      );

    }
  );

});

/* ================= LOGIN ADMIN ================= */
app.post("/api/admin/login", (req, res) => {

  const { email, password } = req.body;

  db.query(
    "SELECT id, email FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, rows) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Server error"
        });
      }

      if (rows.length === 0) {
        return res.json({
          success: false,
          message: "Email atau password salah"
        });
      }

      req.session.admin = {
        id: rows[0].id,
        email: rows[0].email
      };

      console.log("✅ LOGIN BERHASIL");

      res.json({
        success: true
      });

    }
  );

});

/* ================= CHECK SESSION ================= */
app.get("/api/admin/me", requireAdmin, (req, res) => {

  res.json({
    success: true,
    admin: req.session.admin
  });

});

/* ================= LOGOUT ================= */
app.post("/api/admin/logout", (req, res) => {

  req.session.destroy(() => {

    res.clearCookie("admin-session");

    res.json({
      success: true
    });

  });

});

/* ================= GEMINI ================= */
const API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`;

/* ================= CHATBOT ================= */
app.post("/api/chat", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.json({
        reply: "Pesan tidak boleh kosong"
      });
    }

    /* ================= FILTER SNBT ================= */

    const allowedKeywords = [
      "snbt",
      "utbk",
      "matematika",
      "fisika",
      "kimia",
      "biologi",
      "bahasa indonesia",
      "bahasa inggris",
      "sejarah",
      "geografi",
      "ekonomi",
      "penalaran",
      "literasi",
      "soal",
      "jawaban",
      "pembahasan",
      "tps",
      "tka",
      "grammar",
      "reading",
      "vektor",
      "trigonometri",
      "peluang",
      "statistika"
    ];

    const isAllowed = allowedKeywords.some(keyword =>
      message.toLowerCase().includes(keyword)
    );

    if (!isAllowed) {
      return res.json({
        reply:
          "Maaf 🙏 Chatbot ini khusus membantu pembelajaran dan latihan soal SNBT/UTBK."
      });
    }

    /* ================= REQUEST GEMINI ================= */

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text:
                  `Kamu adalah chatbot pendidikan khusus SNBT/UTBK.\n\nPertanyaan user: ${message}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    let botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, saya tidak bisa memproses.";

    res.json({
      reply: botReply
    });

  } catch (error) {

    console.error("❌ CHAT ERROR:", error);

    res.status(500).json({
      reply: "Server error"
    });

  }

});

/* ================= CRUD SOAL ================= */

/* GET ALL SOAL */
app.get("/api/admin/soal", requireAdmin, (req, res) => {

  db.query(
    "SELECT * FROM soal ORDER BY id DESC",
    (err, rows) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false
        });
      }

      res.json(rows);

    }
  );

});

/* GET DETAIL SOAL */
app.get("/api/admin/soal/:id", requireAdmin, (req, res) => {

  const { id } = req.params;

  db.query(
    "SELECT * FROM soal WHERE id = ?",
    [id],
    (err, rows) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false
        });
      }

      if (rows.length === 0) {
        return res.json({
          success: false
        });
      }

      res.json({
        success: true,
        data: rows[0]
      });

    }
  );

});

/* TAMBAH SOAL */
app.post("/api/admin/soal", requireAdmin, (req, res) => {

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
    pembahasan
  } = req.body;

  db.query(
    `INSERT INTO soal
    (
      mata_pelajaran,
      nomor_soal,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      opsi_e,
      jawaban,
      pembahasan
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      mata_pelajaran,
      nomor_soal,
      pertanyaan,
      opsi_a,
      opsi_b,
      opsi_c,
      opsi_d,
      opsi_e,
      jawaban,
      pembahasan
    ],
    (err) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false
        });
      }

      res.json({
        success: true
      });

    }
  );

});

/* UPDATE SOAL */
app.put("/api/admin/soal/:id", requireAdmin, (req, res) => {

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
    pembahasan
  } = req.body;

  db.query(
    `UPDATE soal SET
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
    WHERE id = ?`,
    [
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
      id
    ],
    (err) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false
        });
      }

      res.json({
        success: true
      });

    }
  );

});

/* DELETE SOAL */
app.delete("/api/admin/soal/:id", requireAdmin, (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM soal WHERE id = ?",
    [id],
    (err) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false
        });
      }

      res.json({
        success: true
      });

    }
  );

});

/* ================= AMBIL SOAL USER ================= */
app.get("/api/soal", (req, res) => {

  const { mapel } = req.query;

  if (!mapel) {
    return res.json({
      success: false,
      message: "Mapel wajib diisi"
    });
  }

  db.query(
    `SELECT * FROM soal 
     WHERE LOWER(mata_pelajaran) LIKE LOWER(?)
     ORDER BY nomor_soal ASC`,
    [`%${mapel}%`],
    (err, rows) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Server error"
        });
      }

      if (rows.length === 0) {
        return res.json({
          success: false,
          message: "Soal tidak ditemukan"
        });
      }

      res.json({
        success: true,
        data: rows
      });

    }
  );

});

/* ================= CEK JAWABAN ================= */
app.post("/api/cek-jawaban", (req, res) => {

  const {
    mapel,
    nomor_soal,
    jawaban_user
  } = req.body;

  db.query(
    `SELECT * FROM soal
     WHERE LOWER(mata_pelajaran) LIKE LOWER(?)
     AND nomor_soal = ?`,
    [`%${mapel}%`, nomor_soal],
    (err, rows) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false
        });
      }
// pengecekan soal sesuai dengan database
      if (rows.length === 0) {
        return res.json({
          success: false,
          pesan: "Soal tidak ditemukan"
        });
      }

      const soal = rows[0];

      const benar =
        soal.jawaban.toUpperCase() ===
        jawaban_user.toUpperCase();

      res.json({
        success: true,
        benar,
        pesan: benar
          ? "✅ Jawaban Benar!"
          : `❌ Jawaban Salah! Jawaban yang benar adalah ${soal.jawaban}`,

        pembahasan: soal.pembahasan || "-",

        gambar_pembahasan: soal.gambar_pembahasan
          ? `/gambar_pembahasan/${soal.gambar_pembahasan}`
          : null
      });

    }
  );

});

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running http://localhost:${PORT}`);
});