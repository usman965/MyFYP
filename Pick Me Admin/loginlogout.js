	var firebaseConfig = {
		apiKey: "AIzaSyB1wpdKFg7F6hCjhHcaQLy2KYp8rjj9nsE",
		authDomain: "smart-pick-and-drop.firebaseapp.com",
		databaseURL: "https://smart-pick-and-drop.firebaseio.com",
		projectId: "smart-pick-and-drop",
		storageBucket: "smart-pick-and-drop.appspot.com",
		messagingSenderId: "641981555588",
		appId: "1:641981555588:web:07d934608a8a22a47933d1"
	};
	// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/*firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
			
		
	} else {
		
		
	}
});*/

function signIn(){
	var l_email=document.getElementById("email").value;
	var l_password=document.getElementById("password").value;
firebase.auth().signInWithEmailAndPassword(l_email,l_password).then(function(){
window.location.replace("index.html");}).catch(function(error) {
	var errorCode = error.code;
	var errorMessage = error.message;
	alert(""+errorMessage);

});
}

function signout()
    {
         firebase.auth().signOut().then(function() {
         	 window.location.replace("signin.html");
         });
    }


