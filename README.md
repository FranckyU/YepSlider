# Yet another content slider as a jQuery plugin. 
## But it would make you happy  
*YepSlider allows you to "slidify" your custom design without polluting it with extra html elements or classnames*  

### GENERAL USE CASE  

Given you have a HTML structure like this and you want to turn it into a slider

    <div id="slider">
      <div class="slide-box"></div>
      <div class="slide-box"></div>
      <div class="slide-box"></div>
      <div class="slide-box"></div>

      <a href="#" id="left_arrow"><img src="any_path/any_left_arrow_file.png" /></a>
      <a href="#" id="right_arrow"><img src="any_path/any_right_arrow_file.png" /></a>
    </div>

It is up to you to set your custom CSS styles, along with left/right arrows positionning.  
*Note that all HTML element ID and class values are not tied to Yep*


### SIMPLE SLIDER

To turn it into a simple slider, you have to inject a wrapper element around the slide boxes  

    <div id="slider">
      <div id="slide-boxes-wrapper">
        <div class="slide-box"></div>
        <div class="slide-box"></div>
        <div class="slide-box"></div>
        <div class="slide-box"></div>
      </div>

      <a href="#" id="left_arrow"><img src="any_path/any_left_arrow_file.png" /></a>
      <a href="#" id="right_arrow"><img src="any_path/any_right_arrow_file.png" /></a>
    </div>

**Take a note from your mockups the width of the slider box, in our example we will say 450px**  

Now, add this in your application js file

    $("#slider").yepSlider ({
      childrenBoxClass: ".slide-box",
      childrenBoxWidth: 450, // the width of a slide
      showMultiple: 1,
      changeBy: 1,
      wrapperElement: "#slide-boxes-wrapper",
      arrowLeftElement: "#left_arrow",
      arrowRightElement: "#right_arrow"
    }) ;

That'all ! you cal test your page and you'll see.

Notes:
- slider boxes MUST be displayed inline, use float:left, or add any class from your CSS library (We use bootstrap so it should be something like `col` or `span`)
- Don't forget setting the slider element and slider boxes height in your CSS (idealy equals)

### ADDING SHORTCUTS

If you wanna add a navigation links to your slider, just add an ul element

    <div id="slider">
      <div id="slide-boxes-wrapper">
        <div class="slide-box"></div>
        <div class="slide-box"></div>
        <div class="slide-box"></div>
        <div class="slide-box"></div>
      </div>
    
      <ul id="slide-nav"></ul>

      <a href="#" id="left_arrow"><img src="any_path/any_left_arrow_file.png" /></a>
      <a href="#" id="right_arrow"><img src="any_path/any_right_arrow_file.png" /></a>
    </div>

And add to the Yep init object those lines

    shortcutsEnabled: true,
    shortcutsUlElement: "#slide-nav",
    shortcutCurrentElementClass: "current"

Yep will add automatically an unordered list of links  
It's the only time it injects some elements in your design, but don't worry it would be just a very basic structure like   

    <ul id="slide-nav">
      <li><a href="#"></a></li>
      <li><a href="#" class="current"></a></li>
      <li><a href="#"></a></li>
      .
      .
      .
    </ul>

It's also up to you to set the styles and positionning of this nav in your CSS


### ENABLING AUTO SLIDING

If you want your slide boxes sliding automatically, just add these in Yep init object

    autoSlide: true,
    interSlideDuration: 10 // default is 10
   
Where *interSlideDuration* is the time (in seconds) Yep will wait after the last manual click to switch on automatic mode

### CHANGELOG

It's been a long time since we initially created this repo, and technology and tools have evolved since.

- Use of CoffeeScript by default, we're mainly using Yep within a Rails app.


### CONCLUSION

That's all, if you have any suggestions or remarks, you're welcome, just email me at andyu.kifer@gmail.com  
Have fun !