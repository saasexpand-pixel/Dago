/**
 * firebase-config.js — Configuration Firebase pour Cabinet Fiscal Immo
 *
 * ─── SETUP (à faire une seule fois) ────────────────────────────────────────
 *
 * 1. Allez sur https://console.firebase.google.com
 * 2. Créez un projet (ex: "cabinet-fiscal-immo")
 * 3. Dans le projet : Settings ⚙️ → "Vos applications" → ajoutez une app Web (</>)
 * 4. Copiez les valeurs du SDK config ci-dessous
 * 5. Activez Authentication → Sign-in method → Email/Mot de passe
 * 6. Ajoutez votre compte admin : Authentication → Users → Add user
 * 7. Activez Firestore Database → Créez en mode Production
 * 8. Dans Firestore → Rules → collez le contenu de firestore.rules
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

window.FIREBASE_CONFIG = {
  apiKey:            "VOTRE_API_KEY",
  authDomain:        "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId:         "VOTRE_PROJECT_ID",
  storageBucket:     "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId:             "VOTRE_APP_ID"
};
