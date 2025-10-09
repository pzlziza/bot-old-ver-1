// const messageInput = document.querySelector(".message-input");
// const chatBody = document.querySelector(".chat-body");
// const sendMessageButton = document.querySelector("#send-message");
// const fileInput = document.querySelector("#file-input");

// // API setup (langsung ke Gemini)
// const API_KEY = "AIzaSyCnfWjIfZCPzgsb8IFIWVIcRRcl7-gRO90";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// let chatHistory = [
//   {
//     role: "user",
//     parts: [
//       {
//         text: "Kamu adalah chatbot pembelajaran SNBT untuk siswa SMK YP Colomadu. Hanya jawab pertanyaan seputar SNBT: latihan soal, tips belajar, strategi ujian, dan informasi resmi tentang SNBT 2026. Jika ada pertanyaan di luar itu, jawablah dengan sopan: 'Maaf, saya hanya bisa membantu terkait SNBT.'",
//       },
//     ],
//   },
// ];

// const createMessageElement = (content, ...classes) => {
//   const div = document.createElement("div");
//   div.classList.add("message", ...classes);
//   div.innerHTML = content;
//   return div;
// };

// const scrollToBottom = () => {
//   setTimeout(() => {
//     chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
//   }, 100);
// };

// const allowedKeywords = [
//   "snbt",
//   "soal",
//   "latihan",
//   "belajar",
//   "tips",
//   "utbk",
//   "strategi",
// ];
// function isRelevantQuestion(msg) {
//   msg = msg.toLowerCase();
//   return allowedKeywords.some((kw) => msg.includes(kw));
// }

// const generateBotResponse = async (incomingMessageDiv) => {
//   const messageElement = incomingMessageDiv.querySelector(".message-text");
//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ contents: chatHistory }),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.error?.message || "Error.");

//     let apiResponseText =
//       data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

//     apiResponseText = apiResponseText
//       .replace(/\*\*(.*?)\*\*/g, "$1")
//       .replace(/\*(.*?)\*/g, "$1")
//       .replace(/__(.*?)__/g, "$1")
//       .replace(/^(\s*)\*\s/gm, "$1- ")
//       .trim();

//     messageElement.innerText = apiResponseText;
//     chatHistory.push({ role: "model", parts: [{ text: apiResponseText }] });
//   } catch (error) {
//     console.error(error);
//     messageElement.innerText = "Error processing the request.";
//   } finally {
//     incomingMessageDiv.classList.remove("thinking");
//     scrollToBottom();
//   }
// };

// const handleOutGoingMessage = (e) => {
//   e.preventDefault();
//   const message = messageInput.value.trim();
//   if (!message) return;
//   messageInput.value = "";

//   const outDiv = createMessageElement(
//     `<div class="message-text"></div>`,
//     "user-message"
//   );
//   outDiv.querySelector(".message-text").textContent = message;
//   chatBody.appendChild(outDiv);
//   scrollToBottom();

//   if (!isRelevantQuestion(message)) {
//     const botReply = createMessageElement(
//       `<img class="chatbot-avatar" src="pict/logo-3.jpg" width="50" height="50">
//        <div class="message-text">Maaf, saya hanya bisa membantu terkait SNBT.</div>`,
//       "bot-message"
//     );
//     chatBody.appendChild(botReply);
//     scrollToBottom();
//     return;
//   }

//   chatHistory.push({ role: "user", parts: [{ text: message }] });

//   setTimeout(() => {
//     const thinkingDiv = createMessageElement(
//       `<img class="chatbot-avatar" src="pict/logo-3.jpg" width="50" height="50">
//        <div class="message-text">
//          <div class="thinking-indicator">
//            <div class="dot"></div><div class="dot"></div><div class="dot"></div>
//          </div>
//        </div>`,
//       "bot-message",
//       "thinking"
//     );
//     chatBody.appendChild(thinkingDiv);
//     scrollToBottom();
//     generateBotResponse(thinkingDiv);
//   }, 600);
// };

// messageInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();
//     handleOutGoingMessage(e);
//   }
// });

// sendMessageButton.addEventListener("click", (e) => handleOutGoingMessage(e));
// document
//   .querySelector("#file-upload")
//   .addEventListener("click", () => fileInput.click());

const messageInput = document.querySelector(".message-input");
const chatBody = document.querySelector(".chat-body");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");

// ✅ Gunakan model yang tersedia di AI Studio
const API_KEY = "AIzaSyCnfWjIfZCPzgsb8IFIWVIcRRcl7-gRO90";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

let chatHistory = [
  {
    role: "user",
    parts: [
      {
        text: "Kamu adalah chatbot pembelajaran SNBT untuk siswa SMK YP Colomadu. Fokus pada latihan soal, pembahasan, tips belajar, dan informasi resmi SNBT 2026. Jika ada pertanyaan di luar itu, jawab sopan dengan: 'Maaf, saya hanya bisa membantu terkait SNBT.'",
      },
    ],
  },
];

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

// 🔹 Keyword terkait SNBT
const allowedKeywords = [
  "snbt",
  "soal",
  "latihan",
  "belajar",
  "tips",
  "utbk",
  "strategi",
];
const answerChoices = ["a", "b", "c", "d", "e"]; // 🔹 Tambahkan jawaban quiz

function isRelevantQuestion(msg) {
  msg = msg.toLowerCase();
  // kalau pesan mengandung kata kunci SNBT atau huruf A–E, tetap dianggap relevan
  return (
    allowedKeywords.some((kw) => msg.includes(kw)) ||
    answerChoices.includes(msg)
  );
}

const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatHistory }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error?.message || "Error.");
    }

    let apiResponseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada respons.";
    apiResponseText = apiResponseText
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/^(\s*)\*\s/gm, "$1- ")
      .trim();

    messageElement.innerText = apiResponseText;
    chatHistory.push({ role: "model", parts: [{ text: apiResponseText }] });
  } catch (error) {
    console.error(error);
    messageElement.innerText = "Error processing the request.";
  } finally {
    incomingMessageDiv.classList.remove("thinking");
    scrollToBottom();
  }
};

const handleOutGoingMessage = (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;
  messageInput.value = "";

  // tampilkan pesan user
  const outDiv = createMessageElement(
    `<div class="message-text"></div>`,
    "user-message"
  );
  outDiv.querySelector(".message-text").textContent = message;
  chatBody.appendChild(outDiv);
  scrollToBottom();

  // cek relevansi pesan
  if (!isRelevantQuestion(message)) {
    const botReply = createMessageElement(
      `<img class="chatbot-avatar" src="pict/logo-3.jpg" width="50" height="50">
       <div class="message-text">Maaf, saya hanya bisa membantu terkait SNBT.</div>`,
      "bot-message"
    );
    chatBody.appendChild(botReply);
    scrollToBottom();
    return;
  }

  // masukkan ke history
  chatHistory.push({ role: "user", parts: [{ text: message }] });

  // tampilkan indikator thinking
  const thinkingDiv = createMessageElement(
    `<img class="chatbot-avatar" src="pict/logo-3.jpg" width="50" height="50">
     <div class="message-text">
       <div class="thinking-indicator">
         <div class="dot"></div><div class="dot"></div><div class="dot"></div>
       </div>
     </div>`,
    "bot-message",
    "thinking"
  );

  chatBody.appendChild(thinkingDiv);
  scrollToBottom();

  generateBotResponse(thinkingDiv);
};

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleOutGoingMessage(e);
  }
});

sendMessageButton.addEventListener("click", (e) => handleOutGoingMessage(e));

document
  .querySelector("#file-upload")
  .addEventListener("click", () => fileInput.click());
