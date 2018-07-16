<template lang="jade">
    .day-change__chart
</template>

<script>
    export default {
        name: "PriceChart",

        mounted() {
            if (document.getElementById('chart-gradient') === null
                && typeof initGradients === 'function') {
                initGradients();
            }
            if (typeof initPriceChart === 'function'
            && typeof toYMD === 'function') {
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
            }
            if (typeof AOS !== 'undefined') {
                AOS.init();
            }
        }
    }
</script>