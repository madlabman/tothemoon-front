<template lang="jade">
    table.stat__table
        thead
            tr
                th(rowspan=2) Дата
                th(colspan=2) Прибыль за день
            tr
                th %
                th {{ sign }}
        tbody
            tr(v-for='profit in profits')
                td {{ profit.created_at | formatDate }}
                td
                    span(v-if='profit.token_change >= 0') +&nbsp;
                    | {{ (profit.token_change_percent * 100).toFixed(2) }}
                td
                    span(v-if='profit.token_change >= 0') +&nbsp;
                    | {{ profit_value(profit).toFixed(3) }}
</template>

<script>
    export default {

        name: "ProfitTable",

        props: ['profits', 'sym', 'sign'],

        methods: {

            profit_value: function(profit) {
                switch (this.sym) {
                    case 'btc':
                        return profit.btc_change ? profit.btc_change : 0;
                    case 'usd':
                        return profit.usd_change ? profit.usd_change : 0;
                    default:
                        return profit.token_change ? profit.token_change : 0;
                }
            }

        }

    }
</script>