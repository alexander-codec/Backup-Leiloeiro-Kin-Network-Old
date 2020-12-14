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
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return decodeURI(results[1]) || 0;
		}
	}
	var postid = $.urlParam('id');
	if(postid == null){
		$(document).attr("title", "Album não encontrado");
		$(".social-profile__main").hide();
		$(".gallery").html("<main role='main' class='inner cover'><h1 class='cover-heading'>Album não encontrado</h1><p class='lead'>Ao tentar acessar esse link, não foi possivel encontrar esse album.</p><p class='lead py-5'><a href='/' class='btn btn-lg btn-secondary'>Voltar ao inicio</a></p></main>");
	}else{
		var docRef = db.collection("album").doc(postid);
		docRef.get().then(function(doc) {
		    if (doc.exists) {
				var titulo = doc.data().titulo;
				$(document).attr("title", titulo);
				var desc = doc.data().desc;
		        var doctRef = db.collection("album").doc(postid).collection("photos");
				doctRef.get().then(function(querySnapshot) {
			        querySnapshot.forEach(function(photo) {
						$(".gallery").append("<figure><img src='" + photo.data().img + "'><figcaption>" + titulo + " <small>" + desc + "</small></figcaption></figure>");
			        });
					popup.init();
			    })
			    .catch(function(error) {
			        console.log("Error getting documents: ", error);
			    });
		    } else {
				$(document).attr("title", "Album não encontrado");
		        $(".social-profile__main").hide();
				$(".gallery").html("<main role='main' class='inner cover'><h1 class='cover-heading'>Album não encontrado</h1><p class='lead'>Ao tentar acessar esse link, não foi possivel encontrar esse album.</p><p class='lead py-5'><a href='/' class='btn btn-lg btn-secondary'>Voltar ao inicio</a></p></main>");
		    }
		}).catch(function(error) {
		    console.log("Error getting document:", error);
		});
	}