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
    var searchLimit = "10";
    var searchPeriod = "overall";
    var searchMethod = "gettopTracks";
    var currentUser = "dacanesrock";
    var trackList = [];

    // change values on dropdown select
    console.log(searchLimit);
    $("select#playlistLength").on("click", function() {
        searchLimit = $("select#playlistLength").val();
        console.log(searchLimit);
    });
    $("select#searchPeriod").on("click", function() {
        searchPeriod = $("select#searchPeriod").val();
        console.log(searchPeriod);
    });
    $("select#searchMethod").on("click", function() {
        searchMethod = $("select#searchMethod").val();
        console.log(searchMethod);
    });

    function displayPlaylist() {
        $("#playlistHeader").empty();
        $("#playlistBody").empty();
        $("#connectSpotify").remove();
        trackList = [];

        var api_KEY = 'cec22954d115479e4a534ed3bd2c0e8e';
        var queryURL = "https://ws.audioscrobbler.com/2.0/?method=user." + searchMethod + "&user=" + currentUser + "&limit=" + searchLimit + "&period=" + searchPeriod + "&api_key=" + api_KEY + "&format=json";
        var rank = "";
        var art = "";
        var track = "";
        var artist = "";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After data comes back from the request
            .done(function(response) {
                for (var i = 0; i < response.toptracks.track.length; i++) {
                    var track = response.toptracks.track[i];
                    addTrack(track['@attr'].rank, track.name, track.artist.name, track.image[1]['#text']);
                    getSpotifyId(track.name, track.artist.name);
                }
                console.log(trackList);
            });
        $("#spotifyArea").append("<button id='connectSpotify' class='waves-effect waves-light btn-large'>Connect to Spotify</button>");
    };

    function addTrack(rank, track, artist, art) {
        $("#playlistHeader").html("<th>#</th><th>Art</th><th>Title</th><th>Artist</th>");
        $("#playlistBody").append("<tr class='playlistData'>");
        $("#playlistBody").append("<td>" + rank + "</td>");
        $("#playlistBody").append("<td><img src='" + art + "'></td>");
        $("#playlistBody").append("<td>" + track + "</td>");
        $("#playlistBody").append("<td>" + artist + "</td>");
    };

    function getSpotifyId(track, artist) {
        var spotifyId = "";
        var queryURL = "https://api.spotify.com/v1/search?q=track%3A" + track + "+artist%3A" + artist + "&type=track&limit=1";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                // console.log(response);
                spotifyId = response.tracks.items["0"].uri;
                trackList.push(spotifyId);
            })
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
        currentuser = txtUsername.value;
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
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
        $("#playlistHeader").empty();
        $("#playlistBody").empty();
    })

    // add click event for username
    $("#userSubmit").on("click", function() {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: txtLastUser.value
        });
        $("#txtLastUser").text(user.displayName);
        $("#usernameContainer").html("<i class='material-icons'>done</i><button class='btn-link'>Saved Username = " + user.displayName + "</button>");
        currentUser = user.displayName;
    });

    // add click event on Playlist Generator
    $("#lastSubmit").on("click", function() {
            displayPlaylist();
    });

    setInterval(function() {
        listener();
    }, 1000);

    // add a realtime listener
    function listener() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                currentUser = firebaseUser.displayName;
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
                $("#usernameContainer").html("<i class='material-icons'>grade</i><button class='btn-link'>Saved Username = " + firebaseUser.displayName + "</button>");
            } else {
                console.log('not logged in');
                $("#btnLogout").addClass('hide');
                $("#userDisplay").hide();
                $("#lastBlock").addClass('hide');
                $("#loginBlock").show();
                $("#usernameContainer").empty();
            }
        });
    };

    listener();
});
