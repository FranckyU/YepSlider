/**
 * Flexible Content slider - jQuery plugin
 * Features:
 *   - simple navigation (left to right/right to left)
 *   - circular navigation
 *   - shortcuts
 *
 *
 * Released under the BSD licence
 * Author: RAFIDINIAINA A. Francky
 * Contributors: RAMBININTSOA Jonathan
 * March 2011 & Aug 2013
 */
(function($){
 	$.fn.extend({ 
 		
	  //pass the options variable to the function
 		yepSlider: function(options) {


		  //Set the default values, use comma to separate the settings, example:
		  var defaults = {shortcutsEnabled: false, circularEnabled: false, autoSlide: false, interSlideDuration: 10}
			
		  var options =  $.extend(defaults, options);

    		return this.each(function() {
			    // Set width of the wrapper and the slider
          var wrapper = $(options.wrapperElement) ;
		
          var numOfChildren = wrapper.children(options.childrenBoxClass).length ;

          if ((numOfChildren % options.showMultiple) > 0)
          {
            numOfChildren = Math.ceil(numOfChildren/options.showMultiple) * options.showMultiple ;
          }            
          
          var wrapperWidth = numOfChildren * options.childrenBoxWidth ;

          var screenWidth = options.showMultiple * options.childrenBoxWidth ;

          // irregular behaviour
          if (options.showMultiple > 1)
          {
            screenWidth = screenWidth - 1 ;
          }

          wrapper.css({width: wrapperWidth+"px", position: "relative", left: "0px"}) ;
          $(this).css({width: screenWidth+"px"}) ;

          // set shortcuts navigation
          if (options.shortcutsEnabled)
          {
            $(options.shortcutsUlElement).html('') ;

            for(var i=1; i <= (numOfChildren/options.showMultiple); i++){

              if (i == 1)
              {
                $(options.shortcutsUlElement).append('<li><a href="#" id="' + options.childrenBoxClass + '-shortcut-to-' + i + '" class="' + options.shortcutCurrentElementClass + '"></a></li>') ;
              }
              else
              { 
                $(options.shortcutsUlElement).append('<li><a href="#" id="' + options.childrenBoxClass + '-shortcut-to-' + i + '"></a></li>') ;
              }
            }  
          }

          // slideshow animation
          var maxMargin = 0 ;
          var minMargin = -1 * (Math.ceil(numOfChildren/options.changeBy) - 1) * options.childrenBoxWidth * options.changeBy ;
          var marginStep = options.childrenBoxWidth * options.changeBy ;

          var lastTimeOfAnimation = getNowTime () ;

          $(options.arrowRightElement).click(function(){
            
            var clickTime = getNowTime () ;
            var timeDiff = (clickTime-lastTimeOfAnimation)/1000 ;

            if (timeDiff > 0.9)
            {
              (function() {
                slideToNext() ;
              }).call(this); 

              lastTimeOfAnimation = getNowTime () ;
            }

            return false;
          });

          $(options.arrowLeftElement).click(function(){
            var clickTime = getNowTime () ;
            var timeDiff = (clickTime-lastTimeOfAnimation)/1000 ;

            if (timeDiff > 0.9)
            {
              (function() {
                slideToPrevious () ;
              }).call(this); 
    
              lastTimeOfAnimation = getNowTime () ;
            }

            return false;
          });

          // activate navigation
          if (options.shortcutsEnabled)
          {
            $(options.shortcutsUlElement).children("li").each(function (index, element){
              var link = $($(this).children("a")[0]) ;

              link.click(function(e){
                var clickTime = getNowTime () ;
                var timeDiff = (clickTime-lastTimeOfAnimation)/1000 ;

                if (timeDiff > 0.9)
                {
                  (function() {
                    slideTo(index) ;
                    navigateTo(index) ;
                  }).call($(options.arrowRightElement)); 

                  lastTimeOfAnimation = getNowTime () ;
                }
              }) ;
            }) ;
          }

          // start automatic sliding
          if (options.autoSlide)
          {
            setInterval(function (){
              moveSlide () ;
            }, 4000) ;
          }

          // UTILITY FUNCTIONS

          function moveSlide ()
          {
            var now = getNowTime () ;

            var diff = Math.floor((now - lastTimeOfAnimation) / 1000) ;

            if (diff >= options.interSlideDuration)
            {
              (function() {
                slideToNext() ;
              }).call($(options.arrowRightElement)); 
            }
          }

          function getNowTime ()
          {
            d = new Date();
            var time = d.getTime() ;

            return time ;
          }

          function slideTo(index)
          {
            var newMargin = (-1)*(marginStep*index) ;
            wrapper.animate({left : newMargin+"px"}, 600, 'swing') ;
          }

          function navigateTo(index)
          {
            $(options.shortcutsUlElement).children('li').each(function(i, e){
              var navLink = $(e).children("a")[0] ;

              if (i == index)
              {
                $(navLink).addClass(options.shortcutCurrentElementClass) ;
              }
              else
              {
                $(navLink).removeClass(options.shortcutCurrentElementClass) ;
              }
            });
          }

          function slideToNext()
          {
            var currentMargin = parseInt(wrapper.css("left").slice(0,-2)) ;

            if(currentMargin > minMargin)
            {
              var newMargin = (currentMargin - marginStep) ;

              wrapper.animate({left : newMargin+"px"}, 600, 'swing') ;

              if (newMargin <= minMargin)
              {
                if (!options.circularEnabled)
                {                
                  $(this).fadeTo(100, 0.3) ;
                }
              }

              // set shortcuts navigation animation
              if (options.shortcutsEnabled)
              {
                currentSlideNum = Math.abs(Math.floor(newMargin / marginStep)) ;

                navigateTo(currentSlideNum) ;
              }

            }
            else
            {
              // set circular navigation on
              if (options.circularEnabled)
              {
                var tempChild = $(wrapper.children(options.childrenBoxClass)[0]).clone() ;
                tempChild.appendTo(wrapper) ;

                var tempMargin = currentMargin - marginStep ;
                var tempWrapperWidth = wrapperWidth + options.childrenBoxWidth ;

                wrapper.css({width: tempWrapperWidth+"px"}) ;
                wrapper.animate({left : tempMargin+"px"}, 600, 'swing') ;

                setTimeout(function() {
                  wrapper.css({left : "0px"}) ;
                  tempChild.remove() ;
                  wrapper.css({width: wrapperWidth+"px"}) ;
                }, 1000);

                // set shortcuts navigation animation
                if (options.shortcutsEnabled)
                {
                  navigateTo(0) ;
                }           
              }
              else
              {
                $(this).fadeTo(100, 0.3) ;
              }
            }

            $(options.arrowLeftElement).fadeTo(10, 1) ;
          }

          function slideToPrevious ()
          {
            var currentMargin = parseInt(wrapper.css("left").slice(0,-2)) ;

            if(currentMargin < maxMargin)
            {
              var newMargin = (currentMargin + marginStep) ;

              wrapper.animate({left : newMargin+"px"}, 600, 'swing') ;

              if (newMargin >= maxMargin)
              {
                if (!options.circularEnabled)
                {
                  $(this).fadeTo(100, 0.3) ;
                }
              }

              // set shortcuts navigation animation
              if (options.shortcutsEnabled)
              {
                currentSlideNum = Math.abs(Math.floor(newMargin / marginStep)) ;

                navigateTo(currentSlideNum) ;
              }
            }
            else
            {
              // set circular navigation on
              if (options.circularEnabled)
              {
                var tempMargin = currentMargin - marginStep ;
                var tempWrapperWidth = wrapperWidth + options.childrenBoxWidth ;

                wrapper.css({width: tempWrapperWidth+"px"}) ;
                wrapper.css({left : tempMargin+"px"}) ;

                var tempChild = $(wrapper.children(options.childrenBoxClass).last()).clone() ;
                tempChild.prependTo(wrapper) ;

                wrapper.animate({left : maxMargin+"px"}, 600, 'swing') ;

                setTimeout(function() {
                  wrapper.css({left : minMargin+"px"}) ;
                  tempChild.remove() ;
                  wrapper.css({width: wrapperWidth+"px"}) ;
                }, 1000);

                // set shortcuts navigation animation
                if (options.shortcutsEnabled)
                {
                  var lastChildIndex = $(options.shortcutsUlElement).children('li').length - 1 ;

                  navigateTo(lastChildIndex) ;
                }           
              }
              else
              {
                $(this).fadeTo(100, 0.3) ;
              }
            }

            $(options.arrowRightElement).fadeTo(10, 1) ;
          }


    		});
    	}
  });

})(jQuery);
