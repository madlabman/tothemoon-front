<template lang="jade">
    .profit-chart
</template>

<script>
    export default {
        name: "DayProfitChart",

        mounted() {
            if (document.getElementById('chart-gradient') === null
                && typeof initGradients === 'function') {
                initGradients();
            }
            if (typeof initPriceChart === 'function') {
                d3.json(
                    `https://app.tothemoonfund.com/api/v1/fund/profit`,
                    (data) => {
                        let parse_time = d3.timeParse('%Y-%m-%d');
                        let dataSet = [];
                        data.data.forEach(elem => {
                            dataSet.push({
                                date: parse_time(elem.date),
                                close: +elem.close
                            });
                        });
                        initPriceChart('.profit-chart', dataSet);
                    });
            }
            if (typeof AOS !== 'undefined') {
                AOS.init();
            }
        }
    }
</script>