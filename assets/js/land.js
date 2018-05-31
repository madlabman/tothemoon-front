$(document).ready(function() {
    // Init
    initGradients();
    buttonsBorder();
    stepsBorder();
    stepsLines();
    initReplySlider();
    smoothScroll();
    initPriceChart();
    initCapitalizationChart();
    initScrollSpy();

    AOS.init();

    $(window).resize(() => { stepsLines(); })

    // $('.background_promo').YTPlayer({
    //     videoId: 'Z8A1TMxR1_I'
    // });
});