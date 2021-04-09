const registrarse = document.querySelector("#register-form");
const iniciarSesion = document.querySelector("#login-form");
const cerrarSesion = document.querySelector("#btnLogout");

registrarse.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = $('#r_user').val();
    const email = $('#r_email').val();
    const password = $('#r_password').val();
    
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        registrarse.reset();
    });
});

iniciarSesion.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = $('#user').val();
    const password = $('#clave').val();

    auth.signInWithEmailAndPassword(user, password).then((userCredential) => {
        iniciarSesion.reset();
    });
});

cerrarSesion.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
  });
});

auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("signin");
      $('#btnLogin').hide();
      $('#btnLogup').hide();
      $('#btnLogout').show();
    } else {
      console.log("signout");
      $('#btnLogout').hide();
      $('#btnLogin').show();
      $('#btnLogup').show();
    }
});