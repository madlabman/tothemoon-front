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
                .balance__stat__item.balance__stat__item_usd {{ balance.body.usd }}<br>+{{ balance.bonus.usd }}
                .balance__stat__item.balance__stat__item_btc {{ balance.body.btc }}<br>+{{ balance.bonus.btc }}
                .balance__stat__item.balance__stat__item_rub {{ balance.body.rub | tildaBalance }}<br>+{{ balance.bonus.rub | tildaBalance }}
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
                .stat__select(v-for='view in profit_views')
                    a.stat__select__item(
                    v-bind:class='{ "stat__select__item_active": view.isActive }'
                    v-on:click='changeActiveProfitViewTo(view)'
                    ) {{ view.name }}
                    <!--a.stat__select__item График-->
                    <!--a.stat__select__item.stat__select__item_active Таблица-->
            .stat__view
                component(v-bind:profits='profits' v-bind:sym='current_sym.sym' v-bind:sign='current_sym.name' v-bind:is='profitComponent')
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
    import ProfitTable from './account/ProfitTable.vue'
    import ProfitChart from './account/ProfitChart.vue'

    export default {

        name: 'Account',

        components: {
            'payment-form': Payment,
            'withdraw-form': Withdraw,
            'price-chart': PriceChart,
            'profit-table': ProfitTable,
            'profit-chart': ProfitChart,
        },

        data() {
            return {

                balance: {
                    body: {
                        btc: 0,
                        usd: 0,
                        rub: 0
                    },
                    bonus: {
                        btc: 0,
                        usd: 0,
                        rub: 0
                    }
                },

                profits: [],

                current_sym: {
                    name: '$',
                    sym: 'usd',
                },
                currency_list: [
                    {
                        name: '$',
                        sym: 'usd',
                        isActive: true,
                    },
                ],

                current_profit_view: null,
                profit_views: [
                    {
                        name: 'Таблица',
                        component: 'profit-table',
                        isActive: true,
                    },
                    {
                        name: 'График',
                        component: 'profit-chart',
                        isActive: false,
                    }
                ]

            }
        },

        mounted() {
            this.$auth.fetch();
            this.getBalance();
            this.getProfit();
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

            getProfit() {
                let self = this;
                self.axios.get(
                    '/profit',
                ).then((response) => {
                    let data = response.data;
                    if (data.status === 'success') {
                        self.profits = data.profits;
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
                this.current_sym = item;
            },

            changeActiveProfitViewTo(item) {
                this.profit_views.forEach((elem) => {
                    elem.isActive = (elem.name === item.name);
                })
                this.current_profit_view = item.component;
            },

        },

        computed: {

            profitComponent: function () {
                return this.current_profit_view == null ? 'profit-table' : this.current_profit_view;
            }

        },

        filters: {

            tildaBalance: value => {
                // See https://stackoverflow.com/a/2304062.
                if (value % 1 > 0) {
                    return `~${Math.ceil(value)}`
                }

                return value;
            }

        }
    }
</script>