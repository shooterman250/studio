
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
// Removed: import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined = undefined;
// Removed: let auth: Auth | undefined = undefined;
let db: Firestore | undefined = undefined;

if (typeof window !== 'undefined') {
  // This code will only run on the client side
  if (!firebaseConfig.apiKey) {
    console.error(
      "CRITICAL_FIREBASE_CONFIG_ERROR: Firebase API key (NEXT_PUBLIC_FIREBASE_API_KEY) is missing or undefined. " +
      "Please ensure it is correctly set in your .env.local file and that your Next.js development server has been restarted."
    );
    // Note: Firebase SDK will still attempt to initialize and will likely throw its own 'auth/invalid-api-key' error.
  }

  if (getApps().length === 0) {
    // Only initialize if no apps exist
    try {
      app = initializeApp(firebaseConfig);
    } catch (e) {
      console.error("Firebase initialization error (initializeApp call failed):", e);
      // This is where Firebase SDK might throw 'auth/invalid-api-key' if config is bad
    }
  } else {
    app = getApp(); // Get the default app if already initialized
  }

  if (app) {
    try {
      // Removed: auth = getAuth(app);
      db = getFirestore(app);
    } catch (e) {
      console.error("Error getting Firebase Firestore instance:", e);
    }
  }
}

export { app, db };
