/**
 * This is your application js file
 * You create any instance of YepSlider here
 */

$(function() {
  $("#any-element").yepSlider ({
    childrenBoxClass: ".class-of-slide-box",
    childrenBoxWidth: 950,
    showMultiple: 1,
    changeBy: 1,
    wrapperElement: "#id-of-slides-container-element",
    arrowLeftElement: "#id-of-left-nav-link",
    arrowRightElement: "#id-of-right-nav-link",

    shortcutsEnabled: true,
    shortcutsUlElement: "#id-of-ul-element-thet-contains-navigation-shortcuts-links-list",
    shortcutCurrentElementClass: "current",

    circularEnabled: true,
    
    autoSlide: true,
    interSlideDuration: 10
  }) ; 
});
