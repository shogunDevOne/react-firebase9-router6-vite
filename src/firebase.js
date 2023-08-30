
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBxs14oR8g4TnE-X-bjSV2V6JOM_fTEvog",
  authDomain: "react-v1-758fd.firebaseapp.com",
  projectId: "react-v1-758fd",
  storageBucket: "react-v1-758fd.appspot.com",
  messagingSenderId: "750797476901",
  appId: "1:750797476901:web:9daa9711a4cdd7aa485bcc"

  // apiKey: "AIzaSyDM11MK7Ay3DMVLwKR0Hk3P6h2wUDoBe-s",
  // authDomain: "prometeus-web.firebaseapp.com",
  // projectId: "prometeus-web",
  // storageBucket: "prometeus-web.appspot.com",
  // messagingSenderId: "956094793019",
  // appId: "1:956094793019:web:a47a44e721fa4189a5a31e"
};

// Inicializando  firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db };

