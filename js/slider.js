;$(function() {

	// CONSTANTS
	var itemscount = $( '#scrollablePhone .items .item' ).length,
	  phoneLandscpeWidth = 320,
	  currentIndex = 0;
	
	function updateHeights() {
		if (window.innerHeight < 768) {
			phoneLandscpeWidth = 255;
		} else {
			phoneLandscpeWidth = 320;
		}
	}
	
	updateHeights();

	// initialize scrollable
	function sliderHandler( ev, idx, el ) {	
		if (textSlider.index !== idx) {
			textSlider.slide(idx);
			$( '.navi a' ).removeClass( 'active' );
			$(  '.navi a' ).eq( idx ).addClass( 'active' );
			
			if( idx !== 0 ) {
				$( '.prev.browse.left, .next.browse.right' ).removeClass( 'disabled' );
				if( idx == (itemscount - 1) ) {
					$( '.next.browse.right' ).addClass( 'disabled' );
				}
			} else {
				$( '.prev.browse.left' ).addClass( 'disabled' );
			}
		}
		currentIndex = idx;
	}
	
	$( '.prev.browse.left' ).click( function() {
		if( currentIndex != 0) {
			currentIndex--;
			sliderHandler( null, currentIndex );
			window.screenSlider.slide( currentIndex );
		}
	});
	
	$( '.next.browse.right' ).click( function() {
		if( currentIndex < (itemscount - 1)) {
			currentIndex++;
			sliderHandler( null, currentIndex );
			window.screenSlider.slide( currentIndex );
		}
	});	
	
	$( '.navi a' ).click( function() {
		if( !$( this ).hasClass( 'active' ) ) {
			currentIndex = $( this ).index();
			sliderHandler( null, currentIndex );
			window.screenSlider.slide( currentIndex );			
		}
	});
	
	function initSliders() {
		window.screenSlider = new Swipe( $( '#scrollablePhone' )[0],{
		  callback: function(ev, idx, el) {

		  },
		  width: phoneLandscpeWidth
		});
		
		if (window.innerWidth > 480) {
			window.textSlider = new Trans($( '#scrollableText' )[0]);
		} else if (window.innerWidth <= 480) {
			window.textSlider = new Swipe($( '#scrollableText' )[0], {
				callback: function(ev, idx, el) {

				}
			});
		}
	}
	initSliders();
	
	$("#scrollablePhone").bind("slideEvent", function(ev, idx) {
		return sliderHandler(ev, idx);
	});

	$(window).bind('orientationchange', function() {
		updateHeights();
		initSliders();
	});
    $(window).smartresize(function(){
        updateHeights();
        initSliders();
        sliderHandler( null, currentIndex );
        window.screenSlider.slide( currentIndex );
    });
});