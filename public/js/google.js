import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
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

// Google Auth provider
const provider = new GoogleAuthProvider();
auth.languageCode = 'en';

// Get the Google login button
const googleButton = document.getElementById("google");

if (googleButton) {
  googleButton.addEventListener("click", function () {
    // Start the sign-in process
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Google Sign-in successful:", user);

        // Redirect to the dashboard
        window.location.href = "/dashboard.html"; // Ensure this path is correct
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Error during Google Sign-in:", errorCode, errorMessage);
        alert(errorMessage); // Show error message
      });
  });
} else {
  console.error("Google button not found");
}
