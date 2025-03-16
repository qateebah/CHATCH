// إعداد مرجع إلى مجموعة "messages" في Firestore
const messagesRef = firebase.firestore().collection("messages");

// دالة لإرسال رسالة جديدة إلى Firestore
function sendMessage(userId, messageText) {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp(); // الوقت الحالي من الخادم
  messagesRef.add({
    userId: userId,               // معرف المستخدم
    message: messageText,         // النص المرسل
    timestamp: timestamp,         // التاريخ والوقت
  })
  .then(() => {
    console.log("Message sent successfully!");
  })
  .catch((error) => {
    console.error("Error sending message: ", error);
  });
}

// دالة لاستلام الرسائل من Firestore (المراقبة الفورية)
function getMessages(callback) {
  // الاستماع للتغييرات في مجموعة الرسائل
  messagesRef.orderBy("timestamp")
    .onSnapshot((snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push(doc.data()); // إضافة الرسالة إلى المصفوفة
      });
      callback(messages); // استدعاء الكولباك مع الرسائل
    }, (error) => {
      console.error("Error getting messages: ", error);
    });
}

// دالة لعرض الرسائل في واجهة المستخدم
function displayMessages(messages) {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.innerHTML = ''; // مسح المحتوى الحالي

  messages.forEach((msg) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `
      <p><strong>${msg.userId}</strong>: ${msg.message}</p>
      <small>${new Date(msg.timestamp.seconds * 1000).toLocaleString()}</small>
    `;
    chatContainer.appendChild(messageElement);
  });
}

// استلام الرسائل عند تحميل الصفحة
getMessages(displayMessages);

// إضافة حدث إرسال رسالة عند الضغط على زر "Send"
document.getElementById("sendMessageBtn").addEventListener("click", () => {
  const messageText = document.getElementById("messageInput").value;
  const userId = firebase.auth().currentUser.uid; // الحصول على معرف المستخدم الحالي

  if (messageText.trim() !== "") {
    sendMessage(userId, messageText);
    document.getElementById("messageInput").value = ""; // مسح النص بعد الإرسال
  }
});
