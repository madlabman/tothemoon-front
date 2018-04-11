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
    $('.side-nav__scrollspy__item > a').each(function() {
        let target = $($(this).attr('href'));
        if ( target.length ) {
            let self = $(this);
            self.scrollspy({
                min: target.offset().top - 65,
                max: target.offset().top + target.height() - 75,
                onEnter: function(element, position) {
                    self.parent().addClass('side-nav__scrollspy__item_active');
                },
                onLeave: function(element, position) {
                    self.parent().removeClass('side-nav__scrollspy__item_active');
                }
            });
        }
    });
}

function sixMonthAgoDate() {
    let d = new Date();
    d.setMonth(d.getMonth() - 6);
    return d;
}

function toYMD(e) {
    return e.toISOString().slice(0, 10)
}

function dayFromDate(e) {
    return e.toISOString().slice(8, 10)
}

function initPriceChart() {
    const current_price_url = `https://api.coindesk.com/v1/bpi/currentprice/USD.json`;
    const yesterday_price_url = `https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday`;

    d3.json(current_price_url, (current_price_json) => {
        d3.json(yesterday_price_url, (yesterday_price_json) => {
            let current_price = current_price_json.bpi.USD.rate_float;
            let yesterday_price = Object.values(yesterday_price_json.bpi)[0];
            if (current_price !== undefined && yesterday_price !== undefined) {
                let price_change = (+current_price - +yesterday_price) / +yesterday_price * 100;
                if (price_change > 0) price_change = `+${price_change.toFixed(2)}`;
                d3.select('.day-change__value').html(`${price_change}%`);
            }
        })
    });

    let width = 1000;
    let height = 350;
    let margin = {top: 20, right: 20, bottom: 50, left: 60};

    let t = d3.transition()
        .duration(750)
        .ease(d3.easeLinear);

    let price_chart = d3.select('.day-change__chart').append('svg')
        .attr('width', width)
        .attr('height', height);

    width -= margin.left + margin.right;
    height -= margin.top + margin.bottom;

    let chart_g = price_chart.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let grad_defs = price_chart.append('defs');
    let gradient = grad_defs.append('linearGradient')
        .attr('id', 'chart-gradient')
        .attr('gradientUnits', 'objectBoundingBox')
        .attr('gradientTransform', 'rotate(90)');
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'rgb(0,255,242)');
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'rgb(0,255,242)')
        .attr('stop-opacity', '0');

    let stop_date = new Date();
    let start_date = sixMonthAgoDate();
    let parse_time = d3.timeParse("%Y-%m-%d");

    // console.log('toYMD: 'toYMD(new Date()));
    // console.log('time_parse: ' + parse_time(toYMD(new Date())));
    // console.log('dateFromDate: ' + dayFromDate(new Date()));

    let x = d3.scaleTime()
        .rangeRound([0, width]);
    let y = d3.scaleLinear()
        .rangeRound([height, 0]);

    d3.json(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${toYMD(start_date)}&end=${toYMD(stop_date)}`,
        // `test.json`,
        // 'https://api.myjson.com/bins/erlyf',
        (data) => {
            // remove unused data
            let dataset = [];
            Object.keys(data.bpi).forEach((elem) => {
                let day = elem.slice(8, 10);        // get date
                if (['01', '15'].includes(day)) {   // keep price on 01 and 15 only
                    // delete data.bpi[elem];
                    dataset.push({
                        date: parse_time(elem),
                        close: +data.bpi[elem]
                    })
                }
            });

            // console.log(dataset);

            x.domain(d3.extent(dataset, function(d) { return d.date; }));

            let y_min = d3.min(dataset, (d) => { return d.close });
            y_min = (Math.round(y_min / 1000)) * 1000;
            y.domain([
                y_min,
                d3.max(dataset, (d) => { return d.close })
            ]);

            let area_back = d3.area()
                .x((d) => { return x(d.date) })
                .y0(y(y_min))
                .y1((d) => {
                    if (dayFromDate(d.date) === '31') return y(y_min);
                    if (d.close < y_min) return y(y_min);
                    return y(d.close);
                });
            let area_front = d3.area()
                .x((d) => { return x(d.date) })
                .y0(y(y_min))
                .y1((d) => {
                    if (dayFromDate(d.date) === '14') return y(y_min);
                    if (d.close < y_min) return y(y_min);
                    return y(d.close);
                });

            chart_g.append('path')
                .datum(dataset)
                .attr('fill', '#1d1d1d')
                .attr('d', area_back);

            chart_g.append('path')
                .datum(dataset)
                .attr('fill', 'url(#chart-gradient)')
                .attr('fill-opacity', '1')
                .attr('d', area_front);

            chart_g.append("g")
                .attr('transform', `translate(0,${height + 20})`)
                .attr('class', 'day-change__chart__axis')
                .call(d3.axisBottom(x).ticks(6))
                .selectAll("text")
                .transition(t)
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr('fill', '#cbcbcb');

            // add the Y gridlines
            chart_g.append("g")
                .attr("class", "grid")
                .call(d3.axisLeft(y).ticks(5)
                    .tickSize(-width)
                    .tickFormat("")
                )
                .selectAll('line')
                .attr('stroke', '#717171')
                .attr('stroke-opacity', '0.51');

            chart_g.append("g")
                .style('transform', `translate(-30px,0)`)
                .attr('class', 'day-change__chart__domain')
                .call(d3.axisLeft(y).ticks(5))
                .selectAll('text')
                .style('text-anchor', 'start')
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr('fill', '#cbcbcb')
                .text((e) => { return `$${d3.format(",")(e)}` });
    })
}

$(document).ready(function() {
    // Init
    buttonsBorder();
    stepsBorder();
    stepsLines();
    initReplySlider();
    smoothScroll();
    initPriceChart();

    $(window).resize(() => { stepsLines(); })
});