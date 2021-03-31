import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './index.css';
import firebase from 'firebase';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(fas)

createApp(App)
  .use(store)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount("#app");


// Firebase
var firebaseConfig = {
  apiKey: "AIzaSyB1fMvbA69v1C75pXIsMf7jmeeLksy0rxQ",
  authDomain: "visionary-time.firebaseapp.com",
  projectId: "visionary-time",
  storageBucket: "visionary-time.appspot.com",
  messagingSenderId: "1042030097229",
  appId: "1:1042030097229:web:e3bc4c87f8c5a94c89bd04"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);