import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAqITxSsp6eE_fLwm6ppr22VRBHk0dOUTw",
  authDomain: "catzapptestaccount.firebaseapp.com",
  projectId: "catzapptestaccount",
  storageBucket: "catzapptestaccount.appspot.com",
  messagingSenderId: "756639348164",
  appId: "1:756639348164:web:0ee0ef67fd38abfa13e091",
  measurementId: "G-H7N1QFF7ZF",
  sender_id: 756639348164,
  Key_pair:
    "BH7S3lmJcrMt1SEFG3ygZljFKnV9gR5YniYiiSavNzYPxeK_8n9xGWeN-rxjeht6zoCYcIr8UTls98WWXU1RX5c",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;