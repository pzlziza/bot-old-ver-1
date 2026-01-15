// ================= STATE =================
let editId = null;

// ================= ELEMENT =================
const form = document.getElementById("soalForm");
const table = document.getElementById("soalTable");
const submitBtn = document.querySelector("#soalForm button");

// input file
const gambarSoalInput = document.getElementById("gambar_soal");
const gambarPembahasanInput = document.getElementById("gambar_pembahasan");
const fileName = document.getElementById("fileName");
const fileNamePembahasan = document.getElementById("fileNamePembahasan");

// ================= FILE PREVIEW =================
const previewSoal = document.getElementById("previewSoal");
const previewPembahasan = document.getElementById("previewPembahasan");

// PREVIEW GAMBAR SOAL
gambarSoalInput?.addEventListener("change", () => {
  const file = gambarSoalInput.files[0];

  if (file) {
    fileName.textContent = file.name;
    previewSoal.src = URL.createObjectURL(file);
    previewSoal.style.display = "block";
  } else {
    fileName.textContent = "Belum ada file";
    previewSoal.src = "";
    previewSoal.style.display = "none";
  }
});

// PREVIEW GAMBAR PEMBAHASAN
gambarPembahasanInput?.addEventListener("change", () => {
  const file = gambarPembahasanInput.files[0];

  if (file) {
    fileNamePembahasan.textContent = file.name;
    previewPembahasan.src = URL.createObjectURL(file);
    previewPembahasan.style.display = "block";
  } else {
    fileNamePembahasan.textContent = "Belum ada file";
    previewPembahasan.src = "";
    previewPembahasan.style.display = "none";
  }
});

// ================= LOAD SOAL =================
async function loadSoal() {
  const res = await fetch("/api/admin/soal");
  const data = await res.json();

  table.innerHTML = "";

  data.forEach((s, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${s.mata_pelajaran}</td>
        <td>${s.pertanyaan}</td>
        <td class="aksi-btn">
          <button class="btn-edit" onclick="editSoal(${s.id})">Edit</button>
          <button class="btn-hapus" onclick="hapusSoal(${s.id})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

// ================= INIT =================
loadSoal();

// ================= EDIT MODE (CRUD)=================
async function editSoal(id) {
  const res = await fetch(`/api/admin/soal/${id}`);
  const result = await res.json();

  if (!result.success) {
    alert("Gagal mengambil data soal");
    return;
  }

  const s = result.data;
  editId = id;

  mapel.value = s.mata_pelajaran;
  nomor.value = s.nomor_soal;
  pertanyaan.value = s.pertanyaan;
  a.value = s.opsi_a;
  b.value = s.opsi_b;
  c.value = s.opsi_c;
  d.value = s.opsi_d;
  e.value = s.opsi_e;
  jawaban.value = s.jawaban;
  pembahasan.value = s.pembahasan;

  // ================= PREVIEW GAMBAR =================
  const previewSoal = document.getElementById("previewSoal");
  const previewPembahasan = document.getElementById("previewPembahasan");

  if (s.gambar_soal) {
    previewSoal.src = `/gambar_soal/${s.gambar_soal}`;
    previewSoal.style.display = "block";
    fileName.textContent = s.gambar_soal;
  } else {
    previewSoal.style.display = "none";
    fileName.textContent = "Belum ada file";
  }

  if (s.gambar_pembahasan) {
    previewPembahasan.src = `/gambar_pembahasan/${s.gambar_pembahasan}`;
    previewPembahasan.style.display = "block";
    fileNamePembahasan.textContent = s.gambar_pembahasan;
  } else {
    previewPembahasan.style.display = "none";
    fileNamePembahasan.textContent = "Belum ada file";
  }

  document.querySelector("#soalForm button").textContent = "Update Soal";

  // auto scroll ke form
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ================= SUBMIT FORM =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("mata_pelajaran", mapel.value);
  formData.append("nomor_soal", nomor.value);
  formData.append("pertanyaan", pertanyaan.value);
  formData.append("opsi_a", a.value);
  formData.append("opsi_b", b.value);
  formData.append("opsi_c", c.value);
  formData.append("opsi_d", d.value);
  formData.append("opsi_e", e.value);
  formData.append("jawaban", jawaban.value);
  formData.append("pembahasan", pembahasan.value);

  if (gambarSoalInput.files[0]) {
    formData.append("gambar_soal", gambarSoalInput.files[0]);
  }
  if (gambarPembahasanInput.files[0]) {
    formData.append("gambar_pembahasan", gambarPembahasanInput.files[0]);
  }

  const url = editId
    ? `/api/admin/soal/${editId}`
    : "/api/admin/soal";

  const method = editId ? "PUT" : "POST";

  const res = await fetch(url, { method, body: formData });
  const result = await res.json();

  if (!result.success) {
    alert("❌ Gagal menyimpan soal");
    return;
  }

  alert(editId ? "✅ Soal berhasil diupdate" : "✅ Soal berhasil ditambahkan");

  resetForm();
  loadSoal();
});

// ================= RESET FORM =================
function resetForm() {
  form.reset();
  editId = null;

  submitBtn.textContent = "Tambah Soal";

  // reset file name text
  fileName.textContent = "Belum ada file";
  fileNamePembahasan.textContent = "Belum ada file";

  // reset input file
  gambarSoalInput.value = "";
  gambarPembahasanInput.value = "";

  // hide preview images
  const previewSoal = document.getElementById("previewSoal");
  const previewPembahasan = document.getElementById("previewPembahasan");

  if (previewSoal) {
    previewSoal.src = "";
    previewSoal.style.display = "none";
  }

  if (previewPembahasan) {
    previewPembahasan.src = "";
    previewPembahasan.style.display = "none";
  }
}

// ================= DELETE =================
async function hapusSoal(id) {
  if (!confirm("Yakin hapus soal ini?")) return;

  const res = await fetch(`/api/admin/soal/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (result.success) {
    alert("✅ Soal dihapus");
    loadSoal();
  } else {
    alert("❌ Gagal hapus soal");
  }
}