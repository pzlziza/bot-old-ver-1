const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");

let jumlahBenar = 0; // hitung jawaban benar
let totalSoal = 0; // total soal di mapel aktif

// Simpan status soal yang sedang aktif
let currentSoal = null;
let currentMapel = null;
let allSoal = []; // semua soal dari mapel aktif

const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const scrollToBottom = () => {
  setTimeout(() => {
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }, 100);
};

// ⭐ Ubah sub-point * menjadi emoji bintang
function formatBotText(text) {
  if (!text) return "";

  let output = text;

  // **bold** → <b>bold</b>
  output = output.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // * item list → ⭐ item list
  output = output.replace(/^\s*\*\s+/gm, "⭐ ");

  // Markdown link: [teks](url)
  output = output.replace(
    /\[(.*?)\]\((.*?)\)/g,
    `<a href="$2" target="_blank">$1</a>`
  );

  // Replace newline dengan <br>
  output = output.replace(/\n/g, "<br>");

  return output;
}

// 🔹 Fungsi bantu buat render tampilan soal
function renderSoal(soal, mapel) {
  const gambarHTML = soal.gambar_soal
    ? `<figure style="margin-top:10px;">
         <img 
           src="/gambar_soal/${soal.gambar_soal}"
           alt="Gambar Soal ${soal.nomor_soal}"
           style="max-width:100%; border-radius:10px;"
         >
       </figure>`
    : "";

  return `
    📘 <b>${mapel}</b> — Soal ${soal.nomor_soal}<br><br>
    ${soal.pertanyaan}<br>
    ${gambarHTML}<br>
    A. ${soal.opsi_a}<br>
    B. ${soal.opsi_b}<br>
    C. ${soal.opsi_c}<br>
    D. ${soal.opsi_d}<br>
    E. ${soal.opsi_e}
  `;
}

// ========== 🔹 FUNGSI AMBIL SOAL DARI DATABASE ==========
async function ambilSoal(mapel) {
  try {
    const res = await fetch(
      `/api/soal?mapel=${encodeURIComponent(mapel)}`
    );
    const result = await res.json();

    if (!result.success) {
      return result.message || "Soal tidak ditemukan.";
    }

    allSoal = result.data;
    totalSoal = allSoal.length;
    currentMapel = mapel;
    currentSoal = parseInt(allSoal[0].nomor_soal);

    return renderSoal(allSoal[0], mapel);
  } catch (err) {
    console.error(err);
    return "Gagal mengambil soal dari server.";
  }
}

// ========== 🔹 FUNGSI CEK JAWABAN DARI DATABASE ==========
async function cekJawaban(jawaban) {
  if (!currentSoal || !currentMapel) {
    return "Tidak ada soal aktif. Ketik 'Tampilkan soal [mapel]' dulu.";
  }

  try {
    const res = await fetch("/api/cek-jawaban", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mapel: currentMapel,
        nomor_soal: currentSoal,
        jawaban_user: jawaban,
      }),
    });

    const data = await res.json();

    if (data.benar === true) {
      jumlahBenar++;
    }

    let hasilHTML = `
      ${data.pesan}<br><br>
      <b>Pembahasan:</b><br>
      ${data.pembahasan || "-"}
    `;

    // ✅ FIX UTAMA DI SINI
    if (data.gambar_pembahasan) {
  hasilHTML += `
    <figure style="margin-top:12px;">
      <img 
        src="${data.gambar_pembahasan}"
        alt="Gambar Pembahasan"
        style="
          max-width:100%;
          border-radius:12px;
          box-shadow:0 4px 12px rgba(0,0,0,.15);
        "
      >
    </figure>
  `;
}

    hasilHTML += `
      <br>👉 Ketik "<b>next</b>" untuk lanjut ke soal selanjutnya.
    `;

    return hasilHTML;
  } catch (err) {
    console.error(err);
    return "Gagal memeriksa jawaban dari server.";
  }
}

// ========== 🔹 FUNGSI TAMPILKAN SOAL BERIKUTNYA ==========
function nextSoal() {
  if (!currentMapel || !allSoal.length) {
    return "Tidak ada sesi soal aktif. Ketik 'Tampilkan soal [mapel]' dulu.";
  }

  const nextIndex =
  allSoal.findIndex(
    (s) => s.nomor_soal === currentSoal
  ) + 1;

  const soalBerikut = allSoal[nextIndex];

  if (!soalBerikut) {
    const nilaiAkhir = Math.round((jumlahBenar / totalSoal) * 100);

    const hasilAkhir = `
      🎉 <b>Latihan Selesai!</b><br><br>
      📚 <b>Mata Pelajaran:</b> ${currentMapel}<br>
      ✔️ <b>Jawaban Benar:</b> ${jumlahBenar} dari ${totalSoal}<br>
      🏆 <b>Nilai Akhir:</b> ${nilaiAkhir}<br><br>
      Terus latihan ya! Kamu makin dekat dengan SNBT! 🎯
    `;

    // Reset sesi
    currentSoal = null;
    jumlahBenar = 0;

    return hasilAkhir;
  }

  currentSoal = soalBerikut.nomor_soal;
  return renderSoal(soalBerikut, currentMapel);
}

// ========== 🔹 FUNGSI RESPONS DARI GEMINI ==========
// Buat URL otomatis menjadi link
function convertLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" style="color:#0077cc; text-decoration:underline;">${url}</a>`;
  });
}

async function generateBotResponse(message, incomingMessageDiv) {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }),
    });

    const data = await response.json();
    messageElement.innerHTML = formatBotText(
      data.reply || "Tidak ada respons dari bot."
    );
  } catch (error) {
    console.error(error);
    messageElement.innerText = "Gagal mengambil respons dari server.";
  } finally {
    incomingMessageDiv.classList.remove("thinking");
    scrollToBottom();
  }
}

// ========== 🔹 HANDLE PESAN USER ==========
const handleOutGoingMessage = async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;
  messageInput.value = "";

  // tampilkan pesan user
  const outDiv = createMessageElement(
    `<div class="message-text">${message}</div>`,
    "user-message"
  );
  chatBody.appendChild(outDiv);
  scrollToBottom();

  // tampilkan thinking bot
  const botDiv = createMessageElement(
    `<img class="chatbot-avatar" src="pict/logo-3.png" width="50" height="50">
     <div class="message-text">
       <div class="thinking-indicator">
         <div class="dot"></div><div class="dot"></div><div class="dot"></div>
       </div>
     </div>`,
    "bot-message",
    "thinking"
  );
  chatBody.appendChild(botDiv);
  scrollToBottom();

  const msgLower = message.toLowerCase();

  // Jika user minta soal
  if (msgLower.includes("soal")) {
    const mapel = message.split("soal")[1]?.trim();
    if (!mapel) {
      botDiv.querySelector(".message-text").innerText =
        "Silakan ketik 'Tampilkan soal [mata pelajaran]'.";
      botDiv.classList.remove("thinking");
      return;
    }

    const soalText = await ambilSoal(mapel);
    botDiv.querySelector(".message-text").innerHTML = soalText;
    botDiv.classList.remove("thinking");
    return;
  }

  // Jika user menjawab A–E
  if (["a", "b", "c", "d", "e"].includes(msgLower)) {
    const result = await cekJawaban(msgLower.toUpperCase());
    botDiv.querySelector(".message-text").innerHTML = result;
    botDiv.classList.remove("thinking");
    return;
  }

  // Jika user mengetik next / soal berikutnya / lanjut
  if (["next", "soal berikutnya", "lanjut", "berikutnya"].includes(msgLower)) {
    const soalText = nextSoal();
    botDiv.querySelector(".message-text").innerHTML = soalText;
    botDiv.classList.remove("thinking");
    return;
  }

  // Jika bukan soal / jawaban / perintah khusus → kirim ke Gemini
  await generateBotResponse(message, botDiv);
};

sendMessageButton.addEventListener("click", handleOutGoingMessage);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleOutGoingMessage(e);
  }
});
