import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-bEtr6vRMIwXYNX2PR1hCL5-G6aHELUw",
    authDomain: "truesignauth-b7dcd.firebaseapp.com",
    projectId: "truesignauth-b7dcd",
    storageBucket: "truesignauth-b7dcd.firebasestorage.app",
    messagingSenderId: "131427590984",
    appId: "1:131427590984:web:fb435ede1d2a1a7e0a497d"
};

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

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Account created! Please check your email for the confirmation link.");

            // Send email verification
            sendEmailVerification(user)
                .then(() => {
                    console.log('Verification email sent!');
                })
                .catch((error) => {
                    console.error('Error sending verification email:', error);
                });

            // Redirect the user to a thank you page or dashboard page
            window.location.href = "/dashboard.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
