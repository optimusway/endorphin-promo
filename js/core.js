;$(function() {
	$('form').focusin(function(){
		$(this).toggleClass('focus');
    }).focusout(function(){
        $(this).toggleClass('focus');
    });
	
	$( '#mc-embedded-subscribe-form' ).submit( function() {
		$.ajax({
			url: 'mail.php',
			type: 'POST',
			data: {
				email: $('#mce-EMAIL').val()
			},
			success: function(data){
                            $('#mc-embedded-subscribe-form').html('<p style="font-family:\'Gloria Hallelujah\' ,cursive; color: #fff; font-size: 1.25em; text-align: center; padding: 0 20px">You will get the invitation<br>as soon as we launch</p>');
			},
			error: function() {
				$('#mce-EMAIL').val('Sorry, an error occurred.').css('color', 'red');
			}
		});	
		return false;
	});
});
