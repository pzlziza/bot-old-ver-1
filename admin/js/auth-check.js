// ================= AUTH CHECK =================
function checkAdminSession() {
  fetch("/api/admin/me", { credentials: "include" })
    .then(res => {
      if (!res.ok) {
        window.location.replace("/admin/login.html");
        throw new Error("Session expired");
      }
      return res.json();
    })
    .then(data => {
      const emailEl = document.getElementById("adminEmail");
      if (emailEl && data?.admin) {
        emailEl.innerText = data.admin.email;
      }
    })
    .catch(() => {
      window.location.replace("/admin/login.html");
    });
}

// cek saat page load
checkAdminSession();

// cek juga kalau halaman muncul dari BACK cache
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    checkAdminSession();
  }
});

// ================= DROPDOWN =================
const profileBtn = document.getElementById("adminProfileBtn");
const dropdown = document.getElementById("adminDropdown");
const logoutBtn = document.getElementById("logoutBtn");

profileBtn?.addEventListener("click", e => {
  e.stopPropagation();
  dropdown.classList.toggle("show");
});

// klik di luar → tutup dropdown
document.addEventListener("click", () => {
  dropdown?.classList.remove("show");
});

// ================= LOGOUT =================
logoutBtn?.addEventListener("click", async () => {
  try {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include"
    });
  } finally {
    // hapus dashboard dari history
    window.location.replace("/admin/login.html");
  }
});
