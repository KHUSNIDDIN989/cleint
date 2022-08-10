import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAO6hC6q2m5Nxa6puytkMkNP9mqlCwQFlk",
  authDomain: "books-f4ebf.firebaseapp.com",
  projectId: "books-f4ebf",
  storageBucket: "books-f4ebf.appspot.com",
  messagingSenderId: "799834647828",
  appId: "1:799834647828:web:7f8f155d5a3b6a3ef42601",
  measurementId: "G-8KKW2NPE5Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
