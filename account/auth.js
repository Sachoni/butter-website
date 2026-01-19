import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 REPLACE with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAw1sqpMMBt3zxAf2NggiZsj6rhhXgnE0Y",
  authDomain: "butter-ecommerce.firebaseapp.com",
  projectId: "butter-ecommerce",
  appId: "1:936911351357:web:cb088316107eaa89778454"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ------------------ Register ------------------
window.register = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) return alert("Enter email and password");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "../dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};

// ------------------ Login ------------------
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "../dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};

// ------------------ Google Login ------------------
window.googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    window.location.href = "../dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};

// ------------------ Protect Dashboard ------------------
const currentPath = location.pathname;
if (currentPath.includes("dashboard.html")) {
  onAuthStateChanged(auth, user => {
    if (!user) window.location.href = "../index.html";
    else document.getElementById("welcomeMsg").innerText = `Welcome, ${user.email}`;
  });
}

// ------------------ Logout ------------------
window.logout = async () => {
  await signOut(auth);
  window.location.href = "../index.html";
};
