(function( $ ){
	
	/*  Scroll Down - On Click Event To Scroll Down (Button) */

	$(".mu-scrolldown").click(function(event){
         event.preventDefault();
         //calculate destination place
         var dest=0;
         if($(this.hash).offset().top > $(document).height()-$(window).height()){
              dest=$(document).height()-$(window).height();
         }else{
              dest=$(this.hash).offset().top;
         }
         //go to destination
         $('html,body').animate({scrollTop:dest}, 1000,'swing');
		 });
		 
		 /*Search Bar Function */
		 document.querySelector('.searchbox [type="reset"]').addEventListener('click', function() {  this.parentNode.querySelector('input').focus();});
	    

	/*  2. Playlist Slick Slider */


		$('.mu-playlists-slide').slick({
			arrows: false,
			dots: true,
			infinite: true,
			speed: 500,
			autoplay: true,
			cssEase: 'linear'
		});

  	/*  Scroll Top On Click Function */

	    jQuery(window).scroll(function(){
	      if (jQuery(this).scrollTop() > 300) {
	        jQuery('.scrollToTop').fadeIn();
	      } else {
	        jQuery('.scrollToTop').fadeOut();
	      }
	    });
	     
	    //Click event to scroll to top

	    jQuery('.scrollToTop').click(function(){
	      jQuery('html, body').animate({scrollTop : 0},800);
	      return false;
	    });
	  
	
	/*  Playlist Slider */


		$('.mu-playlists-slider').slick({
		  slidesToShow: 5,
		  responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: true,
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: true,
		        slidesToShow: 2
		      }
		    }
		  ]
		});

	
	
})( jQuery );



  
	