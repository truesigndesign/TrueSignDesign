import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBReqCi904u_Lh0jZdAzB-sEsxfIP4FnM",
    authDomain: "truesigndesignauth.firebaseapp.com",
    databaseURL: "https://truesigndesignauth-default-rtdb.firebaseio.com",
    projectId: "truesigndesignauth",
    storageBucket: "truesigndesignauth.firebasestorage.app",
    messagingSenderId: "977508579565",
    appId: "1:977508579565:web:1f83dfce992f0e4b56f4e4"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
    event.preventDefault();

    // Get email and password values after clicking the submit button
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if email and password are not empty
    if (email.trim() === "" || password.trim() === "") {
        alert("Email and password cannot be empty");
        return;
    }

    // Check if the email is in the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return;
    }

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }

    // Sign in the user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Logging in...");
            window.location.href = "/dashboard.html";  // Redirect on successful login
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);  // Display the error message
        });
});
