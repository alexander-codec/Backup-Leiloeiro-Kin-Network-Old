popup = {
				  init: function(){
				    $('figure').click(function(){
				      popup.open($(this));
				    });
				    
				    $(document).on('click', '.popup img', function(){
				      return false;
				    }).on('click', '.popup', function(){
				      popup.close();
				    })
				  },
				  open: function($figure) {
				    $('.gallery').addClass('pop');
				    $popup = $('<div class="popup" />').appendTo($('body'));
				    $fig = $figure.clone().appendTo($('.popup'));
				    $bg = $('<div class="bg" />').appendTo($('.popup'));
				    $close = $('<div class="close"><svg><use xlink:href="#close"></use></svg></div>').appendTo($fig);
				    $shadow = $('<div class="shadow" />').appendTo($fig);
				    src = $('img', $fig).attr('src');
				    $shadow.css({backgroundImage: 'url(' + src + ')'});
				    $bg.css({backgroundImage: 'url(' + src + ')'});
				    setTimeout(function(){
				      $('.popup').addClass('pop');
				    }, 10);
				  },
				  close: function(){
				    $('.gallery, .popup').removeClass('pop');
				    setTimeout(function(){
				      $('.popup').remove()
				    }, 100);
				  }
	}
	var config = {
	    apiKey: "AIzaSyAdt7DQf3k3zzvAq-wV6OK29GDLqMVQBmY",
	    authDomain: "kin-network-me.firebaseapp.com",
	    databaseURL: "https://kin-network-me.firebaseio.com",
	    projectId: "kin-network-me",
	    storageBucket: "kin-network-me.appspot.com",
	    messagingSenderId: "694927497991"
	};
	firebase.initializeApp(config);
	var db = firebase.firestore();
	var doctRef = db.collection("photos");
	doctRef.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
			$(".gallery").append("<figure><img src='" + doc.data().img + "'><figcaption>" + doc.data().titulo + " <small>" + doc.data().desc + "</small></figcaption></figure>");
        });
		popup.init();
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });