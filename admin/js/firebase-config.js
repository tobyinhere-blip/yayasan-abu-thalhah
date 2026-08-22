// Firebase Configuration - Yayasan Islamic Center Abu Thalhah Al Anshari
const firebaseConfig = {
  apiKey: "AIzaSyDv3QiI8QWDvd_CS5c03PWLhtxhaOcDwgw",
  authDomain: "yayasan-abu-thalhah.firebaseapp.com",
  databaseURL: "https://yayasan-abu-thalhah-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yayasan-abu-thalhah",
  storageBucket: "yayasan-abu-thalhah.firebasestorage.app",
  messagingSenderId: "607430170205",
  appId: "1:607430170205:web:26a6ca44311e0f6b349fb4",
  measurementId: "G-BPXCCLSWVB"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = (typeof firebase.database === 'function') ? firebase.database() : null;
const auth = (typeof firebase.auth === 'function') ? firebase.auth() : null;
