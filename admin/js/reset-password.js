const form = document.getElementById("resetForm");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;

  if (password !== confirmPassword) {
    alert("Password dan konfirmasi tidak sama!");
    return;
  }

  const res = await fetch("/api/admin/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const data = await res.json();

  if (data.success) {
    alert("✅ Password berhasil diubah!");
    window.location.href = "login.html";
  } else {
    alert(data.message || "Gagal reset password");
  }
});
