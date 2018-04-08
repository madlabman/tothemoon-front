"use strict";

let buttons = Array.from(document.getElementsByClassName('button_grad-border'));
buttons.forEach(function (elem) {
	elem.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' viewBox='1 1 152 40' preserveAspectRatio='none'>\n" +
		"    <defs>\n" +
		"      <linearGradient id='border-gradient' gradientUnits='objectBoundingBox' gradientTransform='rotate(68)'>\n" +
		"        <stop offset='0%' stop-color='rgb(0,255,242)' />\n" +
		"        <stop offset='100%' stop-color='rgb(15,163,149)' />\n" +
		"      </linearGradient>\n" +
		"    </defs>\n" +
		"    <path d='M5.000,2.000 L149.000,2.000 C150.657,2.000 152.000,3.343 152.000,5.000 L152.000,37.000 C152.000,38.657 150.657,40.000 149.000,40.000 L5.000,40.000 C3.343,40.000 2.000,38.657 2.000,37.000 L2.000,5.000 C2.000,3.343 3.343,2.000 5.000,2.000 Z' />\n" +
		"  </svg>";
});

// const spy = new ScrollSpy('.page-content', {
//     nav: '.side-nav__scrollspy__item > a',
//     className: 'hidden'
// });

(function($){
    $(window).on("load", () => {
        $(".page-content").mCustomScrollbar({
        	theme: 'minimal'
        });
    });
})(jQuery);