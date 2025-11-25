# 🤖 Chatbot SNBT — AI Chatbot untuk Latihan SNBT

Proyek ini adalah chatbot interaktif untuk membantu siswa mempersiapkan Seleksi Nasional Berbasis Tes (SNBT).  
Chatbot ini memiliki 2 fitur utama:

1. **Chatbot AI (Gemini API)** — Menjawab pertanyaan siswa secara real-time
2. **Latihan Soal SNBT** — Soal pilihan ganda real-time dari database + penilaian otomatis

---

## 🚀 Fitur Utama

### 🔹 1. Chatbot AI (Gemini)

- Menggunakan **Google Gemini Flash API**
- Mendukung percakapan umum & penjelasan materi SNBT
- Jawaban tampil dalam bubble chat seperti messenger
- Thinking indicator (animasi 3 titik)

### 🔹 2. Latihan Soal per Mapel

- Soal ditarik langsung dari **database MySQL**
- Setiap soal berisi:
  - Pertanyaan
  - Pilihan A–E
  - Gambar soal (opsional)
- Cek jawaban otomatis via backend
- Pembahasan lengkap + gambar pembahasan (jika ada)

### 🔹 3. Hasil Latihan (Score Summary)

Setelah user selesai mengerjakan seluruh soal:

- Jumlah benar
- Total soal
- Nilai akhir (persentase)
- Pesan motivasi

### 🔹 4. UI Modern

- Chat UI modern (mirip WhatsApp/ChatGPT)
- Bubble chat user & bot
- Scroll otomatis
- Navbar & sidebar
- Fully responsive

---

## 🏗️ Teknologi yang Digunakan

### **Backend**

- Node.js
- Express.js
- MySQL (mysql2)
- Google Gemini Flash API
- REST API

### **Frontend**

- HTML, CSS, JavaScript (vanilla)
- Animasi typing / thinking indicator

### **Database**

- MySQL dengan tabel:
  - `soal`
  - `pembahasan`
  - (opsional) tabel nilai

---

## 📦 Instalasi & Menjalankan Proyek

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```
