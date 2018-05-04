<template lang="jade">
    .account(v-show='$auth.check()')
        // Мой счет
        h2.lk-block__title Мой счет @ {{ $auth.user().login }}
        // Баланс
        .balance
            .balance__act
                button.balance__button.balance__button_pay
                    span.balance__button__sign +
                    | Пополнить счет
                button.balance__button.balance__button_withdraw
                    span.balance__button__sign -
                    | Вывести деньги
            .balance__stat(@click='getBalance()')
                .balance__stat__item.balance__stat__item_usd {{ data.balance.usd }}
                .balance__stat__item.balance__stat__item_btc {{ data.balance.btc }}
                .balance__stat__item.balance__stat__item_rub {{ data.balance.rub }}
        // Статистика
        .stat
            .stat__title Ваша прибыль
            .stat__menu
                .stat__select
                    a.stat__select__item.stat__select__item_active BTC
                    a.stat__select__item $
                    a.stat__select__item P
                .stat__select
                    a.stat__select__item График
                    a.stat__select__item.stat__select__item_active Таблица
            .stat__view
                table.stat__table
                    thead
                        tr
                            td(rowspan=2) Дата
                            td(colspan=2) Прибыль за день
                            td(rowspan=2) Баланс
                        tr
                            td %
                            td BTC
                    tbody
                        tr
                            td 6.08.2018
                            td +1,2
                            td +0,02
                            td 123,45
            a.stat__report-link(href='#') Запросить отчет по операциям
        // График курса
        .plot__title График курса криптовалюты
            .plot__select
                .plot__select_active
                    .plot__select__item BTC
                .plot__select__dropdown
                    .plot__select__dropdown__item BTC
                    .plot__select__dropdown__item BCH
                    .plot__select__dropdown__item LTC
        .day-change__chart
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    balance: {
                        btc: 0,
                        usd: 0,
                        rub: 0
                    }
                }
            }
        },
        mounted() {
            this.$auth.fetch();
            this.getBalance();
        },
        updated() {
            if (typeof initPriceChart === "function") initPriceChart();
        },
        methods: {
            getBalance() {
                let app = this;
                app.axios.get(
                    '/user/balance',
                ).then((response) => {
                    let data = response.data;
                    if (data.status === 'success') {
                        app.data.balance = data.balance;
                    }
                })
            },
        }
    }
</script>