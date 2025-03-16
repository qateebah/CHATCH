// مرجع إلى عنصر واجهة المستخدم حيث يتم عرض الرسائل
const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("message-input");
const sendMessageBtn = document.getElementById("send-message-btn");

// دالة لعرض الرسائل في واجهة المستخدم
function displayMessage(userId, message, timestamp) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // تنسيق النص والوقت
  messageElement.innerHTML = `
    <div class="message-header">
      <strong>${userId}</strong>
      <small>${new Date(timestamp.seconds * 1000).toLocaleString()}</small>
    </div>
    <div class="message-body">
      <p>${message}</p>
    </div>
  `;

  // إضافة الرسالة إلى واجهة المستخدم
  chatContainer.appendChild(messageElement);
}

// دالة لإرسال رسالة جديدة
function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText === "") return;

  const userId = firebase.auth().currentUser.displayName || "مستخدم مجهول"; // معرف المستخدم
  const timestamp = firebase.firestore.FieldValue.serverTimestamp(); // الطابع الزمني للرسالة

  // إضافة الرسالة إلى Firestore
  firebase.firestore().collection("messages").add({
    userId: userId,
    message: messageText,
    timestamp: timestamp
  })
  .then(() => {
    console.log("Message sent successfully");
    messageInput.value = ""; // مسح المدخل بعد الإرسال
  })
  .catch((error) => {
    console.error("Error sending message: ", error);
  });
}

// دالة لاستلام الرسائل وعرضها
function listenForMessages() {
  // الاستماع للتغييرات في Firestore وجلب الرسائل
  firebase.firestore().collection("messages")
    .orderBy("timestamp") // ترتيب الرسائل حسب الوقت
    .onSnapshot(snapshot => {
      chatContainer.innerHTML = ""; // مسح المحتوى الحالي
      snapshot.forEach(doc => {
        const data = doc.data();
        displayMessage(data.userId, data.message, data.timestamp); // عرض الرسالة في واجهة المستخدم
      });
    }, error => {
      console.error("Error fetching messages: ", error);
    });
}

// استماع لحدث إرسال الرسالة
sendMessageBtn.addEventListener("click", sendMessage);

// استماع لحدث ضغط مفتاح "Enter" لإرسال الرسالة
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// بدء الاستماع للرسائل عند تحميل الصفحة
listenForMessages();
