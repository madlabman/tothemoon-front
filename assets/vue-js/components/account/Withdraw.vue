<template lang="jade">
    .payment
        p.v--modal__title Запросить выплату
        p.v--modal__btc-price {{ withdraw.amount }}BTC = {{ ($btcPrice * withdraw.amount).toFixed(2) }}$
        form(@submit.prevent='createWithdraw').payment__form

            input.contact-form__input(
            type='text'
            placeholder='Сумма'
            v-model='withdraw.amount'
            v-bind:class='{ "contact-form__input_error": errors.amount}')
            div(v-for='error in errors.amount')
                p.contact-form__error {{ error }}

            input.contact-form__input(
            type='text'
            placeholder='Кошелек, на который отправить средства'
            v-model='withdraw.wallet'
            v-bind:class='{ "contact-form__input_error": errors.wallet}')
            div(v-for='error in errors.wallet')
                p.contact-form__error {{ error }}

            app-button(text='Вывести средства')
</template>

<script>
    import Button from './../page/Button.vue'

    export default {

        components: {
            'app-button': Button,
        },

        data() {
            return {
                withdraw: {
                    amount: 1,
                    wallet: null,
                },
                errors: {
                    amount: null,
                    wallet: null,
                }
            }
        },

        methods: {

            createWithdraw() {
                let self = this;
                this.$http.post(
                    '/withdraw/create',
                    self.withdraw
                ).then((response) => {
                        if (
                            response.data.status !== undefined &&
                            response.data.status === 'success'
                        ) {
                            self.$notify({
                                group: 'lk',
                                title: 'Успешно!',
                                text: 'Запрос был создан и ждет обработки системой.'
                            });
                            this.$modal.hide('withdraw');
                        } else if (response.data.errors !== undefined) {
                            self.errors = response.data.errors;
                        }
                }).catch((error) => {
                    // TODO: handle error
                })
            },

        }
    }
</script>