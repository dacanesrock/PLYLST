$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBlrvN583DloygRGjTplYvyIuW3FvcvFlg",
        authDomain: "plylst-e3afe.firebaseapp.com",
        databaseURL: "https://plylst-e3afe.firebaseio.com",
        projectId: "plylst-e3afe",
        storageBucket: "plylst-e3afe.appspot.com",
        messagingSenderId: "582577491741"
    };
    firebase.initializeApp(config);

    // Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    //add login event
    $("#btnLogin").on('click', e => {
        // get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // add signup event
    $("#btnSignUp").on('click', e => {
        // get email and pass
        // TODO: CHECK EMAIL VALID
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    })

    $("#btnLogout").on('click', e => {
        firebase.auth().signOut();
    })

    // add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            $("#btnLogout").removeClass('hide');
            $("#btnSignUp").addClass('hide');
            $("#userDisplay").html('Hey, ' + firebaseUser.displayName + '!');
            $("#userDisplay").show();
            $("#loginBlock").hide();
            $("#lastBlock").removeClass('hide');
        } else {
            console.log('not logged in');
            $("#btnLogout").addClass('hide');
            $("#btnSignUp").removeClass('hide');
            $("#userDisplay").hide();
            $("#lastBlock").addClass('hide');
            $("#loginBlock").show();
        }
    });
});
