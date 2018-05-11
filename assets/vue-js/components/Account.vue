<template lang="jade">
    .account
        // Мой счет
        h2.lk-block__title Мой счет
        // Баланс
        .balance
            modal(name='payment')
                payment-form
            modal(name='withdraw')
                withdraw-form
            .balance__act
                button.balance__button.balance__button_pay(@click='showPayment')
                    span.balance__button__sign +
                    | Пополнить счет
                button.balance__button.balance__button_withdraw(@click='showWithdraw')
                    span.balance__button__sign -
                    | Вывести деньги
            .balance__stat(@click='getBalance')
                .balance__stat__item.balance__stat__item_usd {{ balance.usd }}
                .balance__stat__item.balance__stat__item_btc {{ balance.btc }}
                .balance__stat__item.balance__stat__item_rub {{ balance.rub }}
        // Статистика
        .stat
            .stat__title Ваша прибыль
            .stat__menu
                .stat__select(v-for='currency in currency_list')
                    a.stat__select__item(
                        v-bind:class='{ "stat__select__item_active": currency.isActive }'
                        v-on:click='changeActiveCurrencyTo(currency)'
                        ) {{ currency.name }}
                .stat__spacer
                .stat__select
                    a.stat__select__item График
                    a.stat__select__item.stat__select__item_active Таблица
            .stat__view
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
                        tr
                            td 6.08.2018
                            td +1,2
                            td +0,02
                            td 123,45
                        tr
                            td 6.08.2018
                            td +1,2
                            td +0,02
                            td 123,45
            a.stat__report-link(href='#') Запросить отчет по операциям
        // График курса
        .plot__title График курса криптовалюты
        //    .plot__select
        //        .plot__select_active
        //            .plot__select__item BTC
        //        .plot__select__dropdown
        //            .plot__select__dropdown__item BTC
        //            .plot__select__dropdown__item BCH
        //            .plot__select__dropdown__item LTC
        price-chart
</template>

<script>
    import Payment from './account/Payment.vue'
    import Withdraw from './account/Withdraw.vue'
    import PriceChart from './page/PriceChart.vue'

    export default {

        components : {
            'payment-form': Payment,
            'withdraw-form': Withdraw,
            'price-chart': PriceChart,
        },

        data() {
            return {

                balance: {
                    btc: 0,
                    usd: 0,
                    rub: 0
                },

                currency_list: [
                    {
                        name: 'BTC',
                        isActive: true,
                    },
                    {
                        name: '$',
                        isActive: false,
                    },
                    {
                        name: 'P',
                        isActive: false,
                    },
                ],

            }
        },

        mounted() {
            this.$auth.fetch();
            this.getBalance();
        },

        methods: {

            getBalance() {
                let self = this;
                self.axios.get(
                    '/user/balance',
                ).then((response) => {
                    let data = response.data;
                    if (data.status === 'success') {
                        self.balance = data.balance;
                    }
                })
            },

            showPayment() {
                this.$modal.show('payment');
            },

            showWithdraw() {
                this.$modal.show('withdraw');
            },

            changeActiveCurrencyTo(item) {
                this.currency_list.forEach((elem) => {
                    elem.isActive = (elem.name === item.name);
                })
            },

        }
    }
</script>