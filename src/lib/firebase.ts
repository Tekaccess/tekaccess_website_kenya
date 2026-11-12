// Firestore is loaded lazily, only by the Insights data layer, so other pages never pay for it.
// Web config is public by design (it ships in every client bundle, as on the old site); access is
// governed by Firestore rules. Env vars override it, e.g. to point a country site at another project.
const env = import.meta.env;
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyB5-gCHNUrg3KhfvHizZ5GIElf29D996Jg",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "tekaccess-logistics.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "tekaccess-logistics",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "tekaccess-logistics.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "406376882578",
  appId: env.VITE_FIREBASE_APP_ID || "1:406376882578:web:905382f56e3c363626214b",
};

export const firebaseConfigured = Boolean(config.apiKey && config.projectId);

export async function getDb() {
  if (!firebaseConfigured) return null;
  const [{ initializeApp, getApps }, { getFirestore }] = await Promise.all([
    import("firebase/app"),
    import("firebase/firestore"),
  ]);
  const app = getApps()[0] ?? initializeApp(config);
  return getFirestore(app);
}
