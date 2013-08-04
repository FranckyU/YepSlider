/**
 * This is your application coffee file
 * You can create any instances of YepSlider here
 */

$->
  yepInitData = 
    childrenBoxClass: ".slide-box"
    childrenBoxWidth: 450
    showMultiple: 1
    changeBy: 1
    wrapperElement: "#slide-boxes-wrapper"
    arrowLeftElement: "#left-arrow"
    arrowRightElement: "#right-arrow"

    shortcutsEnabled: true
    shortcutsUlElement: "#slide-nav"
    shortcutCurrentElementClass: "current"

    circularEnabled: true
    
    autoSlide: true
    interSlideDuration: 10

  $("#slider").yepSlider (yepInitData) 