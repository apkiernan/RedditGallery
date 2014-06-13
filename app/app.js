function foo (data) {
	App.loadGallery(data);
}

var App = {

	subreddit: '',

	//Keep track of page number for subsequent calls
	counter: '',


	setSubreddit: function () {
		
		var subreddit = document.querySelector( '#subreddit' );
		App.subreddit = subreddit.value;

	},

	getSubreddit: function ( subreddit, counter ) {

		$.ajax({
			
			url: '//reddit.com/r/' + subreddit + '/new.json?jsonp=foo&count=25&after=' + counter,

			dataType: 'jsonp'

		})
		.error ( function ( response ) { console.log( 'Something went wrong. The Response was: ' + response ) } );
	},

	loadGallery: function ( response ) {
		
		//Set the counter to listing's 'after' value for subsequent calls
		App.counter = response.data.after;

		//Get array of listing JSON Objects
		var data = response.data.children;

		//Iterate over listing
		data.forEach( function ( obj ) {

			//Create a link with the thumbnail image inside and add it to the gallery
			var link = document.createElement( 'a' ),
				gallery = document.querySelector( '.gallery' ),
				img = document.createElement( 'img' );

			//Set the link href to fullsize image for lightbox view
			link.setAttribute( 'href', obj.data.url );
			gallery.appendChild( link );
				
			//Set image to thumbnail	
			img.setAttribute( 'src', obj.data.thumbnail );
			img.classList.add( 'image' );

			//Add image to gallery link
			link.appendChild( img ); 
		});
		
	}
};

document.addEventListener( 'DOMContentLoaded', function () {

	var button = document.querySelector('#subreddit-button');
	button.addEventListener( 'click', function ( e ) {
		e.preventDefault();

		//Reset any previous gallery
		$('.gallery').empty();

		//Set methods for new gallery
		App.setSubreddit();
		App.getSubreddit( App.subreddit );
	});

	$(window).on( 'scroll', function ( e ) {
		if ( $(window).scrollTop() == $(document).height() - $(window).height() ) {
			App.getSubreddit( App.subreddit, App.counter );
		};
	});
});

