
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCEo9zM4m2THc6pLSK4WqRVF_uELe_8KPs",
    authDomain: "fighting-game-e99fb.firebaseapp.com",
    projectId: "fighting-game-e99fb",
    storageBucket: "fighting-game-e99fb.firebasestorage.app",
    messagingSenderId: "670643582694",
    appId: "1:670643582694:web:c6e0d6c18c46736c1d6d27",
    measurementId: "G-W3X7QHBSZ6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'it';
  const provider = new GoogleAuthProvider();


  //sign in with googly googly
  const Googlelogin = document.getElementById("login-google")
  Googlelogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        window.location.href = "../fight.html"
    }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        
    });
  })


  const login = document.getElementById("login")
  const register = document.getElementById("register")

  login.addEventListener("click", function(event){
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.location.href="fight.html"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error);
        });

  })

  register.addEventListener("click", function(event){
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Signed up Succesfully")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
  });
  })

  

