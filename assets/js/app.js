$(document).ready(function() {
    // alert('hello!');
     //    var config = {
     //        apiKey: "AIzaSyBlrvN583DloygRGjTplYvyIuW3FvcvFlg",
     //        authDomain: "plylst-e3afe.firebaseapp.com",
     //        databaseURL: "https://plylst-e3afe.firebaseio.com",
     //        projectId: "plylst-e3afe",
     //        storageBucket: "plylst-e3afe.appspot.com",
     //        messagingSenderId: "582577491741"
     //    };
     //    firebase.initializeApp(config);
     //    var database = firebase.database();

     //    signInConfig = function() {
     //    // FirebaseUI config.
     //    var uiConfig = {
     //        callbacks: {
     //            signInSuccess: function(currentUser, credential, redirectUrl) {
     //                // Do something.
     //                // Return type determines whether we continue the redirect automatically
     //                // or whether we leave that to developer to handle.
     //                return true;
     //            },
     //            uiShown: function() {
     //                // The widget is rendered.
     //                // Hide the loader.
     //                document.getElementById('loader').style.display = 'none';
     //            }
     //        },
     //        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
     //        // Query parameter name for mode.
     //        queryParameterForWidgetMode: 'mode',
     //        // Query parameter name for sign in success url.
     //        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
     //        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
     //        signInFlow: 'popup',
     //        signInSuccessUrl: 'profile.html',
     //        signInOptions: [
     //            // Leave the lines as is for the providers you want to offer your users.
     // {
     //                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
     //                // Whether the display name should be displayed in the Sign Up page.
     //                requireDisplayName: true
     //            }
     //        ],
     //        // Terms of service url.
     //        tosUrl: 'about.html'
     //    };

     //    // Initialize the FirebaseUI Widget using Firebase.
     //    var ui = new firebaseui.auth.AuthUI(firebase.auth());
     //    // The start method will wait until the DOM is loaded.
     //    ui.start('#firebaseui-auth-container', uiConfig);
     //    };

     //    //track user state across pages
     //    initApp = function() {
     //            firebase.auth().onAuthStateChanged(function(user) {
     //                if (user) {
     //                    // User is signed in.
     //                    var displayName = user.displayName;
     //                    var email = user.email;
     //                    var emailVerified = user.emailVerified;
     //                    var photoURL = user.photoURL;
     //                    var uid = user.uid;
     //                    var providerData = user.providerData;
     //                    user.getToken().then(function(accessToken) {
     //                        document.getElementById('sign-in-status').textContent = displayName;
     //                        document.getElementById('sign-in').textContent = 'Sign out';
     //                    });
     //                } else {
     //                    // User is signed out.
     //                    document.getElementById('sign-in-status').textContent = 'Signed out';
     //                    document.getElementById('sign-in').textContent = 'Sign in';
     //                    signInConfig();
     //                }
     //            }, function(error) {
     //                console.log(error);
     //            });
     //        };

     //    window.addEventListener('load', function() {
     //        initApp()
     //    });

    function displayButton() {
        $('#buttonArea').append('<button class="btn btn-danger" id="artistGenerator">Get Top Artists</button>');
        $('#buttonArea').append('<button class="btn btn-danger" id="albumGenerator">Get Top Albums</button>');
        $('#buttonArea').append('<button class="btn btn-danger" id="trackGenerator">Get Top Tracks</button>');
    };

    $('#submitBtn').on('click', function() {
        // alert('hello!');
        event.preventDefault();
        var username = $('#lastUsername').val().trim();
        console.log(username);
        displayButton();
    })
});