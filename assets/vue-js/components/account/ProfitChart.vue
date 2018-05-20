<template lang="jade">
    .profit-chart
</template>

<script>
    export default {

        name: "ProfitChart",

        props: ['profits'],

        mounted() {
            this.drawChart();
        },

        methods: {

            drawChart: function () {


                // if (this.profits.length === 0) {
                //     setTimeout(this.drawChart(), 500);
                //     return;
                // }

                let width = 1000;
                let height = 350;
                let margin = {top: 0, right: 50, bottom: 50, left: 120};

                let cap_chart = d3.select('.profit-chart').append('svg')
                    .attr('class', 'bar-chart__svg')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('viewBox', `0 0 ${width} ${height}`);

                width -= margin.left + margin.right;
                height -= margin.top + margin.bottom;

                let chart_g = cap_chart.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                let x = d3.scaleTime()
                    .rangeRound([0, width]);
                let y = d3.scaleLinear()
                    .rangeRound([height, 0]);

                x.domain(d3.extent(this.profits, (d) => { return Date.parse(d.created_at) }));
                let y_min = d3.min(this.profits, (d) => { return d.token_change });
                y.domain([
                    y_min,
                    d3.max(this.profits, (d) => { return d.token_change })
                ]);

                // Add bars
                let bars = chart_g.append('g')
                    .attr('class', 'bar-chart__bars');
                this.profits.forEach((el) => {
                    let bar_height = y(el.token_change);
                    bars.append('rect')
                        .attr('x', x(Date.parse(el.created_at)))
                        .attr('y', bar_height)
                        .attr('width', '40')
                        .attr('height', height - bar_height)
                        .attr('fill', 'url(#chart-gradient)')
                        .attr('fill-opacity', '0.3')
                });

                // Add axis
                chart_g.append("g")
                    .attr('transform', `translate(0,${height + 20})`)
                    .attr('class', 'day-change__chart__axis')
                    .call(d3.axisBottom(x).ticks(5))
                    .selectAll("text")
                    .style('text-anchor', 'end')
                    .attr('dx', '-.8em')
                    .attr('dy', '.15em')
                    .attr('fill', '#cbcbcb');

                // add the Y gridlines
                chart_g.append('g')
                    .attr('class', 'grid')
                    .call(d3.axisLeft(y).ticks(5)
                        .tickSize(-width)
                        .tickFormat("")
                    )
                    .selectAll('line')
                    .attr('stroke', '#717171')
                    .attr('stroke-opacity', '0.51');
                // Add domain line
                chart_g.append('g')
                    .style('transform', `translate(-90px,0)`)
                    .attr('class', 'bar-chart__domain')
                    .call(d3.axisLeft(y).ticks(5))
                    .selectAll('text')
                    .style('text-anchor', 'start')
                    .attr('dx', '-.8em')
                    .attr('dy', '.15em')
                    .attr('fill', '#cbcbcb')
                    .text((e) => { return `${d3.format(",")(e)}` });
            }

        },

    }
</script>