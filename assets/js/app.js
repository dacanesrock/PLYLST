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

    //add event to show sign up menu
    $("#signUpHandler").on('click', e => {
        $("#signUpHandler").hide();
        $("#txtUsername").removeClass("hide");
        $("#btnSignUp").removeClass("hide");
        $("#btnLogin").addClass("hide");
        $("#loginMessage").text("Sign up to get Started!")
    });

    //add login event
    $("#btnLogin").on('click', e => {
        // get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => $("#errorMessage").html("<i class='valign small material-icons'>error</i>" + e.message));
        promise.catch(e => console.log(e.code));
        // fixed this by adding signup prompt on page
        // if (e.code = "auth/user-not-found") {
        //     $("#txtUsername").removeClass("hide");
        //     $("#btnSignUp").removeClass("hide");
        //     $("#btnLogin").addClass("hide");
        //     $("#loginMessage").text("Sign up to get Started!")
        // };
    });

    // add signup event
    $("#btnSignUp").on('click', e => {
        // get email and pass
        // TODO: CHECK EMAIL VALID
        const displayName = txtUsername.value;
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        console.log(displayName);
        // sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => $("#errorMessage").html("<i class='valign small material-icons'>error</i>" + e.message));
    })

    $("#btnLogout").on('click', e => {
        firebase.auth().signOut();
        $("#txtUsername").addClass("hide");
        $("#btnLogin").removeClass("hide");
        $("#loginMessage").text("Login to get Started!")
    })

    // add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);

            //here i was trying to show username but was unable to 
            //keep it consistent across logins :(
            // firebaseUser.updateProfile ({
            //     displayName: txtUsername.value
            // });
            $("#btnLogout").removeClass('hide');
            $("#btnSignUp").addClass('hide');
            $("#userDisplay").html(firebaseUser.email);
            $("#userDisplay").show();
            $("#loginBlock").hide();
            $("#lastBlock").removeClass('hide');
        } else {
            console.log('not logged in');
            $("#btnLogout").addClass('hide');
            $("#userDisplay").hide();
            $("#lastBlock").addClass('hide');
            $("#loginBlock").show();
        }
    });
});
