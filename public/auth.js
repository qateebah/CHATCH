// التحقق من حالة تسجيل الدخول
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // إذا كان المستخدم مسجل دخوله بنجاح، يتم توجيههم إلى صفحة الدردشة
    window.location.replace("chat.html");
  } else {
    // إذا لم يكن المستخدم مسجلاً دخوله، لا يحدث شيء
  }
});

// منطق تسجيل الدخول باستخدام حساب Google
document.getElementById("googleSignInBtn").addEventListener("click", function () {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      // عملية تسجيل الدخول تمت بنجاح
      const user = result.user;
      console.log("User signed in: ", user);

      // التوجيه إلى صفحة الدردشة بعد تسجيل الدخول
      window.location.replace("chat.html");
    })
    .catch((error) => {
      // معالجة الأخطاء
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;

      console.log(`Error Code: ${errorCode}`);
      console.log(`Error Message: ${errorMessage}`);
    });
});
