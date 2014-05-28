var App = {

	subreddit: '',

	//Keep track of page number for subsequent calls
	counter: 0,


	setSubreddit: function () {
		
		var subreddit = document.querySelector( '#subreddit' );
		App.subreddit = subreddit.value;

	},

	getSubreddit: function ( subreddit ) {

		$.ajax({
			
			url: 'src/getSub.php?subreddit=' + subreddit + '&page=' + App.counter,

			dataType: 'json'

		})
		.success( function ( response ) { App.loadImages ( response ) } ) 
		.error ( function ( response ) { console.log( 'Something went wrong. The Response was: ' + response ) } );
	},

	loadImages: function ( response ) {
		var domain = '//i.imgur.com/';

		response.data.forEach( function ( obj ) {
			
			var img = document.createElement('img');
			img.setAttribute( 'src', domain + obj.hash + obj.ext )
			img.classList.add('image');
			document.querySelector('.gallery').appendChild(img);
		});

		//Increment the Counter to get next page on subsequent calls
		App.counter++;
	}
};

window.onload = function () {
	var button = document.querySelector('#subreddit-button');
	button.addEventListener( 'click', function ( e ) {
		e.preventDefault();
		App.setSubreddit();
		App.getSubreddit( App.subreddit );
	});

	$(window).on( 'scroll', function ( e ) {
		if ( $(window).scrollTop() == $(document).height() - $(window).height() ) {
			App.getSubreddit( App.subreddit );
		};
	});
}

