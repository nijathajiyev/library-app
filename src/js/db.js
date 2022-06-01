const firebaseConfig = {
  apiKey: "AIzaSyCSOQTfmbpfpJmHCruzd6JvOEi3HTKNyzM",
  authDomain: "team2-library-app.firebaseapp.com",
  databaseURL:"https://team2-library-app-default-rtdb.firebaseio.com/",
  projectId: "team2-library-app",
  storageBucket: "team2-library-app.appspot.com",
  messagingSenderId: "396011353252",
  appId: "1:396011353252:web:17e1c1b95eb1af428c6231"
};
firebase.initializeApp(firebaseConfig)
let db = firebase.database();