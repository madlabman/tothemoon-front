"use strict";

function buttonsBorder() {
    // Buttons
    let grad_svg = d3.select('body').append('svg')
        .attr('width', '0')
        .attr('height', '0')
        .attr('style', 'position: absolute');
    let grad_defs = grad_svg.append('defs');
    let gradient = grad_defs.append('linearGradient')
        .attr('id', 'border-gradient')
        .attr('gradientUnits', 'objectBoundingBox')
        .attr('gradientTransform', 'rotate(68)');
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'rgb(0,255,242)');
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'rgb(15,163,149)');

    let buttons_svg = d3.selectAll('.button_grad-border').append('svg')
        .attr('viewBox', '1 1 152 40')
        .attr('preserveAspectRatio', 'none');
    buttons_svg.append('path')
        .attr('d', 'M5.000,2.000 L149.000,2.000 C150.657,2.000 152.000,3.343 152.000,5.000 L152.000,37.000 C152.000,38.657 150.657,40.000 149.000,40.000 L5.000,40.000 C3.343,40.000 2.000,38.657 2.000,37.000 L2.000,5.000 C2.000,3.343 3.343,2.000 5.000,2.000 Z');
}

function stepsBorder() {
    // Steps
    let circle_svg = d3.selectAll('.steps__item__number').append('svg')
        .attr('viewBox', '0 0 102 102')
        .attr('width', '102')
        .attr('height', '102')
        .attr('class', 'steps__item__circle');
    circle_svg.append('circle')
        .attr('cx', '51')
        .attr('cy', '51')
        .attr('r', '50')
        .attr('fill-opacity', '0')
        .attr('stroke-width', '2')
        .attr('stroke', 'url(#border-gradient)');
}

function stepsLines() {
    let steps = d3.select('.steps').node().getBoundingClientRect();
    let step_1 = d3.select('.steps__item:nth-child(1) .steps__item__number').node().getBoundingClientRect();
    let step_2 = d3.select('.steps__item:nth-child(2) .steps__item__number').node().getBoundingClientRect();
    let step_3 = d3.select('.steps__item:nth-child(3) .steps__item__number').node().getBoundingClientRect();
    d3.select('.steps__line_left')   // left line
        .attr('style', `left: ${step_1.left + step_1.width - steps.left + 20}px;
                    right: ${steps.right - step_2.right + step_2.width + 20}px`);
    d3.select('.steps__line_right')  // right line
        .attr('style', `left: ${step_2.left + step_2.width - steps.left + 20}px; 
                    right: ${steps.right - step_3.right + step_3.width + 20}px`);

}

function smoothScroll() {
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
                &&
                location.hostname === this.hostname
            ) {
                // Figure out element to scroll to
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        let $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }
        });
}

function initReplySlider() {
    const replySlider = new Swiper('.swiper-reply', {
        slidesPerView: 3,
        // loop: true,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        roundLengths: true,
    });
}

function initScrollSpy() {
    // $('.side-nav__scrollspy__item > a').each(function() {
    //     let target = $($(this).attr('href'));
    //     if ( target.length ) {
    //         let self = $(this);
    //         self.scrollspy({
    //             min: target.offset().top - 65,
    //             max: target.offset().top + target.height() - 75,
    //             onEnter: function(element, position) {
    //                 self.parent().addClass('side-nav__scrollspy__item_active');
    //             },
    //             onLeave: function(element, position) {
    //                 self.parent().removeClass('side-nav__scrollspy__item_active');
    //             }
    //         });
    //     }
    // });
}

$(document).ready(function() {
    // Init
    buttonsBorder();
    stepsBorder();
    stepsLines();
    initReplySlider();
    smoothScroll();

    $(window).resize(() => { stepsLines(); })
});