import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { secrets } from "../secrets.js";

initializeApp({ // connect to our firebase PROJECT
  credential: cert(secrets) //USING these credentials
})

export const db = getFirestore() // ONCE connected to project connect us to FIRESTORE DB


// This ALLLL comes from google docs