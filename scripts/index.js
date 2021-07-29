( function() {

	var app = {
        initHeader: function(){
			var scrollval = jQuery(window).scrollTop();
			if(scrollval > 100){
			    jQuery('.header').addClass('header--shrink');
			}else{
			    jQuery('.header').removeClass('header--shrink');
			}

			jQuery(document).on("scroll",function(){
			    var scrollval = jQuery(window).scrollTop();
                if(scrollval > 100){
                    jQuery('.header').addClass('header--shrink');
                }else{
                    jQuery('.header').removeClass('header--shrink');
                }
			});

            jQuery('.header__hamburger').on("click",function(){
                jQuery('.header__nav').toggleClass("header__nav--hide");
            });

            jQuery('.header__nav .nav-close').on("click",function(){
                jQuery('.header__nav').toggleClass("header__nav--hide");
            });
            
        },
        initLottie(){
            $('.banner-wave').each(function(){
                var waveFileName = $(this).attr("data-wave-filename");
                lottie.loadAnimation({
                    container: this, // the dom element that will contain the animation
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: `scripts/${waveFileName}` // the path to the animation json
                });
                $(this).removeAttr("data-wave-filename");
            });
        },
        initImageScrollSlider: function(){
            /* Add Separator first */
            $(".image-scroll-slider").append($('<div class="image-scroll-slider__separator"></div>'));
            
            $(window).on("scroll",function(){
                $('.image-scroll-slider').each(function(){  
                    var currentPosition = $(this).offset().top - $(window).scrollTop() - ($(this).height() / 2);
                    var maxPosition = $(this).height();
                    var percentage = Math.abs(currentPosition)/maxPosition*100;
                    if(currentPosition <= 0 && Math.abs(currentPosition) <= $(this).height()){
                        $(this).find('img:nth-child(2)').css({
                            clipPath : `inset(0px ${percentage + "%"} 0px 0px)`,
                        });
                        $(this).find('.image-scroll-slider__separator').css({
                            right: percentage + "%",
                        });
                        $(this).find('.image-scroll-slider__separator').show();
                    }
                    else{
                        $(this).find('.image-scroll-slider__separator').hide(50);
                    }
                });
            });
        },
        initToSlider(){
            var sliderIds = [];
            $('.to-slider').each(function(){
                $(this).clone().appendTo(`#${$(this).attr("data-slider-id")}`);
                if(!sliderIds.includes(`#${$(this).attr("data-slider-id")}`)) sliderIds.push(`#${$(this).attr("data-slider-id")}`);
            });
            $.each(sliderIds,function(i,e){
                $(e).flickity({
                    // options
                    cellAlign: 'center',
                    wrapAround: true,
                    autoPlay: true,
                    prevNextButtons: false,
                    autoPlay: 2000,
                });
            });
        },
        initOurProducts(){
            $('.our-products-main-carousel').flickity({
                cellAlign: 'center',
                autoPlay: false,
                prevNextButtons: false,
                pageDots: false,
            });

            $('.our-products-carousel-nav').flickity({
                asNavFor: '.our-products-main-carousel',
                contain: true,
                pageDots: false,
                prevNextButtons: false,
            });
        },
        initPeopleTestimonials(){
            $('.people-testimonials-carousel').flickity({
                cellAlign: 'center',
                autoPlay: false,
                prevNextButtons: false,
                pageDots: true,
                contain: true,
                freeScroll: true,
            });
        }
    }

	jQuery(document).ready( function() {

        /* Load All Independent Components first */

        /* Initialize Lottie */
        app.initLottie();

        /* Initialize Image Scroll Slider */
        app.initImageScrollSlider();

        /* Initialize To Slider */
        app.initToSlider();



        /* Load per section function after */

		/* Initialize Header */
		app.initHeader();

        /* Initialize Our Products */
        app.initOurProducts();

        /* Initialize People Testimonials */
        app.initPeopleTestimonials();
	});
})();
