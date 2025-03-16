// إعدادات Firebase الخاصة بالمشروع
const firebaseConfig = {
  apiKey: "AIzaSyCpgfIuw9PPzY1tuYiuAO8aey-Sv3ZIjRc",
  authDomain: "yochat-1ceb4.firebaseapp.com",
  projectId: "yochat-1ceb4",
  storageBucket: "yochat-1ceb4.appspot.com",
  messagingSenderId: "152715104829",
  appId: "1:152715104829:web:98c802cc08712c93c19054",
  measurementId: "G-4XS3YXHXN2"
};

// تهيئة Firebase باستخدام الإعدادات
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
