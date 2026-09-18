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
const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("🔥 FORM SUBMIT");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  // VALIDASI
  if (!email || !password || !confirmPassword) {
    alert("Semua field wajib diisi!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password tidak sama!");
    return;
  }

  try {

    console.log("📤 Kirim data ke server...");

    const res = await fetch("/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    console.log("📥 STATUS:", res.status);

    const text = await res.text();

    console.log("📥 RESPONSE:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      alert("❌ Response bukan JSON");
      return;
    }

    if (data.success) {
      alert("✅ Akun berhasil dibuat");

      window.location.href = "/admin/login.html";
    } else {
      alert("❌ " + data.message);
    }

  } catch (err) {

    console.error("❌ FETCH ERROR:", err);

    alert("❌ Gagal konek ke server");
  }
});