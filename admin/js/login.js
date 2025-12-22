const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // ✅ SAMAIN DENGAN ID DI HTML
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;

  if (!email || !password) {
    alert("Email dan Password wajib diisi");
    return;
  }

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Login berhasil");
      window.location.href = "/admin/dashboard.html";
    } else {
      alert("❌ " + data.message);
    }
  } catch (error) {
    alert("❌ Gagal konek ke server");
    console.error(error);
  }
});
