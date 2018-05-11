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
            if (typeof initPriceChart === 'function') {
                initPriceChart();
            }
            if (typeof AOS !== 'undefined') {
                AOS.init();
            }
        }
    }
</script>