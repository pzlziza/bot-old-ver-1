async function loadHistory() {
  const res = await fetch("/api/history");
  const data = await res.json();

  const list = document.getElementById("historyList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p>Tidak ada history chat</p>";
    return;
  }

  data.forEach(chat => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <strong>${chat.role}</strong>
      <p>${chat.message}</p>
      <small>${new Date(chat.created_at).toLocaleString()}</small>
    `;
    list.appendChild(div);
  });
}

const deleteBtn = document.getElementById("deleteHistoryBtn");

deleteBtn.addEventListener("click", async () => {
  if (!confirm("Yakin mau hapus SEMUA history chat?")) return;

  const res = await fetch("/api/history", {
    method: "DELETE",
  });

  const result = await res.json();

  if (result.success) {
    alert("✅ History chat berhasil dihapus");
    loadHistory();
  } else {
    alert("❌ Gagal hapus history");
  }
});

loadHistory();
