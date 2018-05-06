<template lang="jade">
    .payment
        p.v--modal__title Пополнить счет
        form(@submit.prevent='createPayment').payment__form

            input.contact-form__input(
            type='text'
            placeholder='Сумма'
            v-model='payment.amount'
            v-bind:class='{ "contact-form__input_error": errors.amount}')
            div(v-for='error in errors.amount')
                p.contact-form__error {{ error }}

            input.contact-form__input(
            type='text'
            placeholder='Кошелек, с которого поступит отплата'
            v-model='payment.wallet'
            v-bind:class='{ "contact-form__input_error": errors.wallet}')
            div(v-for='error in errors.wallet')
                p.contact-form__error {{ error }}

            app-button(text='Создать платеж')
</template>

<script>
    import Button from './../page/Button.vue'

    export default {

        components: {
            'app-button': Button,
        },

        data() {
            return {
                payment: {
                    amount: null,
                    wallet: null,
                },
                errors: {
                    amount: null,
                    wallet: null,
                }
            }
        },

        methods: {

            createPayment() {
                let self = this;
                this.$http.post(
                    '/payment/create',
                    self.payment
                ).then((response) => {
                        if (
                            response.data.status !== undefined &&
                            response.data.status === 'success'
                        ) {
                            self.$notify({
                                group: 'lk',
                                title: 'Успешно!',
                                text: 'Платеж был создан и ждет обработки системой.'
                            });
                            this.$modal.hide('payment');
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