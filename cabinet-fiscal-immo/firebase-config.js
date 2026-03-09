/**
 * firebase-config.js — Configuration Firebase pour Cabinet Fiscal Immo
 *
 * ─── SETUP FIRESTORE (à faire une seule fois) ────────────────────────────
 *
 * 1. Allez sur https://console.firebase.google.com
 * 2. Créez un projet (ex: "cabinet-fiscal-immo")
 * 3. Dans le projet : Settings ⚙️ → "Vos applications" → ajoutez une app Web (</>)
 * 4. Copiez les valeurs du SDK config ci-dessous (apiKey, projectId, etc.)
 * 5. Activez Firestore Database → Créez en mode Production
 * 6. Dans Firestore → Rules → collez le contenu de firestore.rules
 *
 * ─── MOT DE PASSE ADMIN ─────────────────────────────────────────────────
 *
 * Changez ADMIN_PASSWORD ci-dessous. C'est le seul mot de passe pour accéder
 * à /admin/. Pas de compte Firebase à créer.
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

// Mot de passe pour accéder à l'espace admin (/admin/)
window.ADMIN_PASSWORD = "changez-ce-mot-de-passe";
