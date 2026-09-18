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
# 🤖 Chatbot SNBT — YP Buddies

Aplikasi web chatbot interaktif untuk membantu siswa SMK YP Colomadu mempersiapkan Seleksi Nasional Berbasis Tes (SNBT) secara mandiri.

Aplikasi memiliki dua sisi:

- **Sisi siswa** — chatbot AI tanya-jawab materi SNBT + latihan soal per mata pelajaran dengan pengecekan jawaban otomatis
- **Sisi admin** — dashboard untuk mengelola (CRUD) bank soal

---

## 🚀 Fitur Utama

### 1. Chatbot AI (Google Gemini)
- Menggunakan Gemini 2.5 Flash API untuk menjawab pertanyaan siswa seputar SNBT/UTBK
- Filter topik: chatbot hanya menjawab pertanyaan yang mengandung kata kunci pelajaran SNBT (matematika, fisika, TPS, dsb) — di luar itu akan ditolak
- Tampilan bubble chat dengan animasi thinking indicator

### 2. Latihan Soal per Mata Pelajaran
- Soal diambil langsung dari database MySQL (tabel `soal`)
- Setiap soal berisi pertanyaan, gambar soal (opsional), dan 5 opsi jawaban (A–E)
- Jawaban dicocokkan otomatis oleh backend, lengkap dengan pembahasan dan gambar pembahasan (opsional)

### 3. Dashboard Admin
- Login & registrasi admin dengan sesi (`express-session`)
- CRUD soal (tambah, lihat, ubah, hapus) lengkap dengan upload gambar soal/pembahasan (`multer`)
- Riwayat percakapan siswa (tabel `chat_history`)
- Reset password admin via email (`nodemailer`)

---

## 🏗️ Teknologi yang Digunakan

**Backend**
- Node.js + Express.js 5 (ES Module)
- MySQL2 (connection pool)
- express-session (autentikasi admin)
- multer (upload file)
- node-fetch (request ke Gemini API)
- nodemailer (email reset password)
- dotenv, cors

**Frontend**
- HTML5, CSS3, JavaScript (vanilla, tanpa framework)

**Database & Server Lokal**
- MySQL/MariaDB via **XAMPP** (Apache + MySQL, dikelola lewat phpMyAdmin)
- Database: `ypbuddies`, dengan 3 tabel: `soal`, `admin`, `chat_history`

---

## 📁 Struktur Proyek

```
bot-old-ver-1/
server.js                  # Entry point backend (routing & API)
package.json
.env                       # Konfigurasi rahasia (tidak diunggah ke Git)
ypbuddies.sql              # Dump database untuk diimpor ke phpMyAdmin
public/                    # Halaman & aset untuk siswa
    index.html
    style.css
    newSolutionScript.js   # Logic chat & latihan soal
    pict/                  # Logo aplikasi
    gambar_soal/           # Upload gambar soal
    gambar_pembahasan/     # Upload gambar pembahasan
  admin/                     # Halaman & aset untuk admin
    login.html / register.html / reset-password.html
    dashboard.html         # CRUD soal
    history.html           # Riwayat chat siswa
    css/
    js/                    # login.js, register.js, init.js, history.js, auth-check.js
```

---

# Instalasi & Menjalankan Proyek

# 1. Clone Repository

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

# 2. Install Dependencies

```bash
npm install
```

# 3. Siapkan XAMPP & Database

1. Jalankan **XAMPP Control Panel**, klik **Start** pada modul **Apache** dan **MySQL**
2. Buka `http://localhost/phpmyadmin`
3. Buat database baru bernama `ypbuddies`
4. Import file `ypbuddies.sql` ke database tersebut (tab **Import** di phpMyAdmin)

# 4. Konfigurasi Environment Variable

Buat file `.env` di root folder, isi sesuai konfigurasi lokal:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=ypbuddies
API_KEY=isi_dengan_gemini_api_key_kamu
PORT=3000
EMAIL_USER=email_pengirim@gmail.com
EMAIL_PASS=app_password_email
SESSION_SECRET=isi_dengan_string_rahasia_bebas
```

> `.env` sudah masuk `.gitignore`, jadi tidak akan ikut ter-upload ke GitHub.

# 5. Jalankan Aplikasi

```bash
npm start
```

Jika berhasil, terminal akan menampilkan:

```
✅ MySQL Connected
🚀 Server running http://localhost:3000
```

### 6. Akses Aplikasi

- Halaman siswa (chatbot): `http://localhost:3000`
- Login admin: `http://localhost:3000/admin/login.html`

Akun admin default (dari `ypbuddies.sql`):
```
Email: admin@smk.com
Password: 1234567
```

---

# Ringkasan API Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/api/admin/register` | Registrasi akun admin |
| POST | `/api/admin/login` | Login admin |
| GET  | `/api/admin/me` | Cek sesi admin aktif |
| POST | `/api/admin/logout` | Logout admin |
| GET  | `/api/admin/soal` | Ambil semua soal (admin) |
| GET  | `/api/admin/soal/:id` | Ambil detail satu soal |
| POST | `/api/admin/soal` | Tambah soal baru |
| PUT  | `/api/admin/soal/:id` | Ubah soal |
| DELETE | `/api/admin/soal/:id` | Hapus soal |
| GET  | `/api/soal?mapel=` | Ambil soal berdasarkan mata pelajaran (siswa) |
| POST | `/api/cek-jawaban` | Cek jawaban siswa |
| POST | `/api/chat` | Kirim pertanyaan ke chatbot Gemini |

---

# Catatan

- Proyek ini merupakan bagian dari Tugas Akhir program D4 Teknologi Rekayasa Perangkat Lunak, Politeknik Indonusa Surakarta.
- Untuk keperluan produksi, disarankan menambahkan hashing password (misal `bcrypt`) pada tabel `admin`, karena saat ini password masih disimpan dalam bentuk plain text.