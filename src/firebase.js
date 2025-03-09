import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC7CD-fxFtQR4hKfOq_P7TMur8vnawBot4",
  authDomain: "geo-minder.firebaseapp.com",
  projectId: "geo-minder",
  storageBucket: "geo-minder.firebasestorage.app",
  messagingSenderId: "1000426499844",
  appId: "1:1000426499844:web:c4e678068d04abb4c82a51"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };