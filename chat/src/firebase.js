import {initializeApp} from "firebase/app";
import "firebase/auth";
import { getDatabase } from "firebase/database";

const app = initializeApp ({
  apiKey: "AIzaSyC1WxIcni45fUZN_ah9Q_izaLtsZSZ6eVs",
  authDomain: "chat-testing-373b7.firebaseapp.com",
  projectId: "chat-testing-373b7",
  storageBucket: "chat-testing-373b7.appspot.com",
  messagingSenderId: "135857411769",
  appId: "1:135857411769:web:5d83e00eeb5d83f4baed68",
  measurementId: "G-KS7RQS9660"
});
const db = getDatabase(app);

export default app;
export {db};