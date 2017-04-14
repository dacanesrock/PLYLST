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

    // variables for last.fm AJAX call
    var searchLimit = "";
    var searchMethod = "";
    var currentUser = "dacanesrock";
    console.log(currentUser);

    // change values on dropdown select
    console.log(searchLimit);
    $("select#playlistLength").on("click", function() {
        searchLimit = $("select#playlistLength").val();
        console.log(searchLimit);
    });
    $("select#searchMethod").on("click", function() {
        searchMethod = $("select#searchMethod").val();
        console.log(searchMethod);
    });

    function displayPlaylist() {
        var api_KEY = 'cec22954d115479e4a534ed3bd2c0e8e';
        var queryURL = "http://ws.audioscrobbler.com/2.0/?method=user." + searchMethod + "&user=" + currentUser + "&limit=" + searchLimit + "&api_key=" + api_KEY + "&format=json";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After data comes back from the request
            .done(function(response) {
                console.log(queryURL);
                console.log(response);
            });
    };

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
        promise.catch(e => $("#errorMessage").html("<div><i class='valign small material-icons'>error</i>" + e.message + "</div>"));
        promise.catch(e => console.log(e.code));
        // fixed this by adding signup prompt on page
        // if (e.code == "auth/user-not-found") {
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

    // add logout event
    $("#btnLogout").on('click', e => {
        firebase.auth().signOut();
        $("#txtUsername").addClass("hide");
        $("#btnLogin").removeClass("hide");
        $("#loginMessage").text("Login to get Started!")
        $("#errorMessage").empty();
        $("#txtPassword").val("");
        $("#txtUsername").val("");
        $("#txtEmail").val("");
        $("#txtLastUser").val("");
        $("#successMessage").empty();
    })

    // add click event for username
    $("#userSubmit").on("click", function() {
        var user = firebase.auth().currentUser;
        console.log(user);

        user.updateProfile({
            displayName: txtLastUser.value
        });
        $("#txtLastUser").text(user.displayName);
        $("#usernameContainer").html("<button class='btn-link'>Saved Username = " + user.displayName + "</button>");
    });

    // add click event on Playlist Generator
    $("#lastSubmit").on("click", function() {
        displayPlaylist();
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
            $("#usernameContainer").html("<button class='btn-link'>Saved Username = " + firebaseUser.displayName + "</button>");
        } else {
            console.log('not logged in');
            $("#btnLogout").addClass('hide');
            $("#userDisplay").hide();
            $("#lastBlock").addClass('hide');
            $("#loginBlock").show();
            $("#usernameContainer").empty();
        }
    });
});
