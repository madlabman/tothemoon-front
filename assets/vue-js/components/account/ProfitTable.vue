<template lang="jade">
    table.stat__table
        thead
            tr
                th(rowspan=2) Дата
                th(colspan=2) Прибыль за день
                td(rowspan=2) Баланс
            tr
                th %
                th BTC
        tbody
            tr(v-for='profit in profits')
                td {{ profit.created_at | formatDate }}
                td
                    span(v-if='profit.token_change >= 0') +&nbsp;
                    | {{ (profit.token_change_percent * 100).toFixed(2) }}
                td
                    span(v-if='profit.token_change >= 0') +&nbsp;
                    | {{ profit.token_change.toFixed(3) }}
                td
                    span(v-if='profit.balance') {{  profit.balance.toFixed(2) }}
</template>

<script>
    export default {

        name: "ProfitTable",

        props: ['profits'],

    }
</script>

<style scoped>

</style>