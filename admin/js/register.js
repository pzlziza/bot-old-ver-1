const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!email || !password || !confirmPassword) {
    alert("Semua field wajib diisi!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password tidak sama!");
    return;
  }

  try {
    const res = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Akun berhasil dibuat");
      window.location.href = "login.html";
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    alert("❌ Gagal konek ke server");
    console.error(err);
  }
});
