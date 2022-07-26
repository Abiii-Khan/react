import {initializeApp} from "firebase/app";
import "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyCdx0Xktx6HJxvdCNgeA_R-sUJ3iWxTfRg",
  authDomain: "test-chat-274e3.firebaseapp.com",
  databaseURL: "https://test-chat-274e3-default-rtdb.firebaseio.com",
  projectId: "test-chat-274e3",
  storageBucket: "test-chat-274e3.appspot.com",
  messagingSenderId: "207101266203",
  appId: "1:207101266203:web:c4c90275b3baa38d1c6bbe"
})
export default app;