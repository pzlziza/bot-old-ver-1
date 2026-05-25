// const form = document.getElementById("registerForm");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const confirmPassword = document.getElementById("confirmPassword").value;

//   if (!email || !password || !confirmPassword) {
//     alert("Semua field wajib diisi!");
//     return;
//   }

//   if (password !== confirmPassword) {
//     alert("Password tidak sama!");
//     return;
//   }

//   try {
//     const res = await fetch("/api/admin/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert("✅ Akun berhasil dibuat");
//       window.location.href = "login.html";
//     } else {
//       alert("❌ " + data.message);
//     }
//   } catch (err) {
//     alert("❌ Gagal konek ke server");
//     console.error(err);
//   }
// });
/* ================= ADMIN REGISTER ================= */
app.post("/api/admin/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi"
    });
  }

  // cek email sudah ada atau belum
  db.query(
    "SELECT id FROM admin WHERE email = ?",
    [email],
    (err, rows) => {
      if (err) {
        console.error("❌ Register check error:", err);
        return res.status(500).json({
          success: false,
          message: "Server error"
        });
      }

      if (rows.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email sudah digunakan"
        });
      }

      // insert admin baru
      db.query(
        "INSERT INTO admin (email, password) VALUES (?, ?)",
        [email, password],
        err => {
          if (err) {
            console.error("❌ Register insert error:", err);
            return res.status(500).json({
              success: false,
              message: "Gagal membuat akun"
            });
          }

          res.json({
            success: true,
            message: "Akun berhasil dibuat"
          });
        }
      );
    }
  );
});