var config = {
    apiKey: "AIzaSyDcPHMXZ_bu8Tz42wH4wG7ZzGtGNBRiB-M",
    authDomain: "kin-network-internaciona.firebaseapp.com",
    databaseURL: "https://kin-network-internaciona.firebaseio.com",
    projectId: "kin-network-internaciona",
    storageBucket: "kin-network-internaciona.appspot.com",
    messagingSenderId: "503112883954"
};
firebase.initializeApp(config);
var db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref().child('leiloeiro/O9kwbJRdd1TIaSqlQHcMmukmgMH3');
var doctRef = db.collection("leiloeiro").doc("O9kwbJRdd1TIaSqlQHcMmukmgMH3");
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		if(user.uid == "O9kwbJRdd1TIaSqlQHcMmukmgMH3"){
			
		}else{
			window.location.href = '/';	
		}
    } else {
        window.location.href = '/';
    }
});