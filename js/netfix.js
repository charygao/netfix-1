var isHome = $('body').is('#page-WiHome');
var isGenre = $('body').is('#page-WiGenre') || $('body').is('#page-WiAltGenre');
var isRoleDisplay = $('body').is('#page-WiRoleDisplay');

function getRating(url,boxArt,callback) {
	$.get(url, function(data){
		var html = jQuery('<div>').html(data);
		var starbar = html.find('.starbar:first').find('span:first');
		boxArt.append(starbar);
		var classes = starbar.find('span').attr('class');
		if (!isRoleDisplay)
			hideBadMovie(classes,boxArt);
		if (isHome)
			hideSelfRated(classes,boxArt);
	});
}

function hideBadMovie(classes,boxArt) {
		if (/sbmf-[01][0-9]|sbmf-2[0-5]/.test(classes)) {
			boxArt.parent().hide();
	}
}

function hideSelfRated(classes,boxArt) {
		if (/sbmfrt/.test(classes)) {
			boxArt.parent().hide();
	}
}

function cleanUpHome() {
	//not sure if I like this
	$('.slider').each(function(){
		$(this).removeClass('triangleBtns');
		$('.boxShotDivider').remove();
		$(this).removeClass('slider');
	});

	// remove the facebook row
	$('.mrow.fb').remove();

	// hide annotations for even rows
	$('.videoAnnotation').hide();
}

function cleanUpURL(url) {
	url = url.replace(/WiPlayer\?movieid=/i, "WiMovie/");
	url = url.replace(/\&/i, "?");
	return url;
}

$(document).ready(function(){
	// Remove all sliders in favour of plain ol' boxes
	
	if (isHome) {
		cleanUpHome();
	}

	if (isHome || isGenre || isRoleDisplay) {
		$('a[href*=WiPlayer]').each(function(){
			var url = cleanUpURL($(this).attr('href'));
			$(this).attr('href',url);
			$(this).css('background-image', 'none');
			getRating(url,$(this).parent());
		});
		if (isHome) {
			$('.agMovieSet').each (function () {
	    	$(this).addClass('truncated');
	    	$(this).after('<a href="#" class="toggleMovies">Show More</a>');
	    	$('.toggleMovies').click( function(e){
	    		e.preventDefault();
	    		$(this).prev('.agMovieSet').toggleClass('truncated');
	    		if ($(this).text() == "Show More")
	    			$(this).text("Hide More");
	    		else
	    			$(this).text("Show More");
	    	});
			});
		}
		
	}

});