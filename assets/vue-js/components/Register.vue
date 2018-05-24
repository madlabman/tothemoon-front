<template lang="jade">
    .login
        h2.login__title Зарегистрироваться
        a.login__to-register
            router-link(to='/login') или войти
        form.login__form(v-on:submit.prevent='register()')
            input.contact-form__input(type='text' placeholder='Имя' v-model='data.body.name' required=true v-bind:class='{ "contact-form__input_error": errors.name }')
            div(v-for='error in errors.name')
                p.contact-form__error {{ error }}

            input.contact-form__input(
                type='text'
                placeholder='Телефон'
                v-model='data.body.phone'
                required=true
                v-bind:class='{ "contact-form__input_error": errors.phone }'
                v-mask="'+7 (999) 999-99-99'"
                )
            div(v-for='error in errors.phone')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='text' placeholder='Email' v-model='data.body.email' required=true v-bind:class='{ "contact-form__input_error": errors.email }')
            div(v-for='error in errors.email')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='text' placeholder='Логин' v-model='data.body.login' required=true v-bind:class='{ "contact-form__input_error": errors.login }')
            div(v-for='error in errors.login')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='password' placeholder='Пароль' v-model='data.body.password' required=true v-bind:class='{ "contact-form__input_error": errors.password }')
            div(v-for='error in errors.password')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='text' placeholder='Промокод' v-model='data.body.promo')
            app-button(text='Регистрация')

</template>

<script>
    import Button from './page/Button.vue'

    export default {

        components: {
            'app-button': Button
        },

        data() {
            return {
                data: {
                    body: {
                        name: '',
                        phone: '',
                        login: '',
                        password: '',
                        promo: '',
                        email: '',
                    },
                },
                errors: {
                    login: null,
                    name: null,
                    phone: null,
                    password: null,
                    email: null,
                }
            }
        },

        mounted() {
            this.checkPromo();
        },

        methods: {

            register() {
                let self = this;
                self.axios({
                    method: 'post',
                    url: '/auth/register',
                    data: self.data.body
                }).then(function (response) {
                    let data = response.data;
                    if (data.status !== 'error') {
                        self.$router.push({
                            name: 'login',
                            query: {
                                redirect: '/login'
                            }
                        });
                    } else {
                        self.errors = data.errors;
                    }
                    console.log(response);
                }).catch(function (response) {
                    console.error(response);
                })
            },

            checkPromo() {
                if (this.$route.query.r !== undefined) {
                    let self = this;
                    self.axios({
                        method: 'post',
                        url: '/auth/promo',
                        data: {
                            promo: this.$route.query.r,
                        }
                    }).then(function (response) {
                        let data = response.data;
                        if (data.status !== 'error' && data.promo) {
                            self.data.body.promo = data.promo;
                        }
                    })
                }
            }

        },

    }
</script>