$(document).ready(function(){
	var FIXED_NAV_HEIGHT = $(document).width() < 768? 0 : 96;

	// Fix landing page height
	var windowHeight = $(window).height();
	if(windowHeight < 800){
		windowHeight = windowHeight.toString() + 'px';
		$('.landing-main-img').css('height', windowHeight);
	}

	// Smooth scroll
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (true) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: (target.offset().top - FIXED_NAV_HEIGHT)
					}, 1000);
					return false;
				}
			}
		});
	});

	var timer;
	$('.down-arrow').on('click', function(){
		clearTimeout(timer);
		$(this).addClass('animated bounceOutDown');
		timer = setTimeout(function(){
			$('.down-arrow').removeClass('animated bounceOutDown');
		}, 2000);
	});

	var handleNavbar = function(dFromTop){
		var landingHeight = $('.landing-main').height();
		if(dFromTop >= (landingHeight - FIXED_NAV_HEIGHT)){
			$('.cb-fixed-nav').css('top', 0)
		} else {
			$('.cb-fixed-nav').css('top', 0 - FIXED_NAV_HEIGHT);
		}
	};

	var handleSectionImages = function(dFromTop) {
		$('.section-img').each(function(i, img){
			var top = $(img).offset().top;
			if((top - 450) < dFromTop) {
				$(img).addClass('saturate');
			}
		});
	};

	// Show/hide fixed navbar
	$(document).on('scroll', function(){
		var dFromTop = $(document).scrollTop();
		handleNavbar(dFromTop);
		handleSectionImages(dFromTop);
	});

	// change fixed nav link color from rgba(44,44,44,0.4) to rgba(44,44,44,1)
	$('a').on('click', function(e){
		var target = $(e.currentTarget).attr('href');
		var links = ['#about', '#build', '#join'];
		links.forEach(function(link){
			$(link+ '-link').css('color', 'rgba(44,44,44,0.4)');
		})
		if(links.indexOf(target)>=0){
			$(target + '-link').css('color', 'rgba(44,44,44,1)');
		}
	});

	// Contact form
	$('#submit').on('click', function(){
		$('input[name="name"]').css('border', '0');
		$('input[name="email"]').css('border', '0');
		$('.bootstrap-select').css('border', '0');
		$('.cb-contact-error').css('display', 'none');
		var position = $('select[name="position"]').val();
		var description = $('textarea[name="description"]').val();
		var email = $('input[name="email"]').val();
		var name = $('input[name="name"]').val();

		var fail = false;
		if (name === '') {
			$('input[name="name"]').css('border', '1px solid red');
			fail = true;
		}

		if (email === '') {
			$('input[name="email"]').css('border', '1px solid red');
			fail = true;
		}

		if (!position || !position.length) {
			$('.bootstrap-select').css('border', '1px solid red')
			fail = true;
		}

		if (fail) {
			$('.cb-contact-error').css('display', 'block');
			return;
		}

		var body = {
			name : name,
			email : email,
			position : position,
			description : description
		};

		$.post('/contact', body, function(data){
			console.log('success!');
			$('#contact-title').html("Thanks, we'll be in touch with you soon!");
			$('#contact-title').css('margin-top', '224px');
			$('form').remove();

		});
	});
});
