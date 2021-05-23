const registrarse = document.querySelector("#register-form");
const iniciarSesion = document.querySelector("#login-form");
const iniciarSesionPlayer2 = document.querySelector("#login-form-player2");
const cerrarSesion = document.querySelector("#btnLogout");

registrarse.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = $('#r_user').val();
    const email = $('#r_email').val();
    const password = $('#r_password').val();
    
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        registrarse.reset();
        Usuario = new User(null, user, email, password, null).addUser();
    });
});

iniciarSesion.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = $('#user').val();
    const password = $('#clave').val();

    auth.signInWithEmailAndPassword(user, password).then((userCredential) => {
        iniciarSesion.reset();
       
        var UserModel = new User(null, null, user, password, null).getUserByEmail();
    });
});

iniciarSesionPlayer2.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = $('#userPlayer2').val();
  const password = $('#clavePlayer2').val();

    iniciarSesionPlayer2.reset();
     
    var UserModel = new User(null, null, user, password, null).getUserByEmail();

    $('#m_signin_player2').modal('hidden');
});

cerrarSesion.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
  });
});

auth.onAuthStateChanged((user) => {
    if (user) {
      var UserModel = new User(null, null, user.email, null, null).getUserByEmail();
      console.log("signin");
      $('#btnLogin').hide();
      $('#btnLogup').hide();
      $('#btnLogout').show();
    } else {
      console.log("signout");
      window.localStorage.removeItem('user');
      window.localStorage.removeItem("modo");
      window.localStorage.removeItem("mapa");
      $('#btnLogout').hide();
      $('#btnLogin').show();
      $('#btnLogup').show();
    }
});