$(document).ready(function() {
    // Init
    initGradients();
    buttonsBorder();
    stepsBorder();
    stepsLines();
    initReplySlider();
    smoothScroll();
    initDayChange();

    let stop_date = new Date();
    let start_date = sixMonthAgoDate();

    d3.json(
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${toYMD(start_date)}&end=${toYMD(stop_date)}`,
        (data) => {
            let parse_time = d3.timeParse('%Y-%m-%d');
            // remove unused data
            let dataSet = [];
            Object.keys(data.bpi).forEach((elem) => {
                dataSet.push({
                    date: parse_time(elem),
                    close: +data.bpi[elem]
                });
            });
            // console.log(dataSet);
            initPriceChart('.day-change__chart', dataSet);
        });

    initCapitalizationChart();
    initScrollSpy();

    AOS.init();

    $(window).resize(() => { stepsLines(); })

    // $('.background_promo').YTPlayer({
    //     videoId: 'Z8A1TMxR1_I'
    // });
});