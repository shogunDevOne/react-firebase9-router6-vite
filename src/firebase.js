
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBxs14oR8g4TnE-X-bjSV2V6JOM_fTEvog",
  authDomain: "react-v1-758fd.firebaseapp.com",
  projectId: "react-v1-758fd",
  storageBucket: "react-v1-758fd.appspot.com",
  messagingSenderId: "750797476901",
  appId: "1:750797476901:web:9daa9711a4cdd7aa485bcc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };

