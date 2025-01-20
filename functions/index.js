const admin = require("firebase-admin");
const functions = require("firebase-functions/v1"); // Use v1 import here
const { google } = require("googleapis");

admin.initializeApp();

exports.createDriveFolder = functions.auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const email = user.email;

  console.log("Function triggered for user:", uid);

  if (!uid || !email) {
    console.error("User UID or email is missing.");
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/drive"],
    keyFile: "./clientLibraryConfig-driveaccessprovider.json"
  });

  let driveClient;
  try {
    console.log("Initializing Google Auth client...");
    driveClient = await auth.getClient();
    console.log("Google Auth client initialized successfully.");
  } catch (authError) {
    console.error("Error initializing Google Auth client:", authError.message);
    return null;
  }

  google.options({ auth: driveClient });

  try {
    console.log("Attempting to create Drive folder...");
    const folderMetadata = {
      name: `Folder-${uid}`,
      mimeType: "application/vnd.google-apps.folder"
    };

    const drive = google.drive("v3");
    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: "id"
    });

    const folderId = folder.data.id;
    console.log(`Folder created successfully with ID: ${folderId}`);

    console.log("Saving folder ID to Firestore...");
    await admin.firestore().collection("users").doc(uid).set(
      { driveFolderId: folderId },
      { merge: true }
    );

    console.log(`Folder ID saved in Firestore for user: ${uid}`);
  } catch (error) {
    console.error("Error creating folder or saving to Firestore:", error.message);
  }

  console.log("Function execution completed for user:", uid);
  return null;
});
