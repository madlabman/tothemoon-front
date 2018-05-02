<template lang="jade">
    .login
        h2.login__title Войти
        a.login__to-register
            router-link(to='/register') или зарегистрироваться
        form.login__form(v-on:submit.prevent='login()')
            input.contact-form__input(type='text' placeholder='Логин' v-model='data.body.username' v-bind:class='{ "contact-form__input_error": errors.username }')
            p(v-show='errors.username').contact-form__error {{ errors.username }}

            input.contact-form__input(type='password' placeholder='Пароль' v-model='data.body.password' v-bind:class='{ "contact-form__input_error": errors.password }')
            p(v-show='errors.password').contact-form__error {{ errors.password }}

            button.button.button_grad-border(type='submit') Вход

</template>

<script>
    export default {
        data() {
            return {
                data: {
                    body: {
                        username: 'admin',
                        password: 'testtest'
                    },
                    rememberMe: false,
                    fetchUser: false
                },
                errors: {
                    username: null,
                    password: null,
                }
            }
        },
        mounted() {
            if (typeof buttonsBorder === "function") buttonsBorder();
        },
        methods: {
            login() {
                let redirect = this.$auth.redirect();
                let self = this;
                this.$auth.login({
                    data: this.data.body,
                    redirect: {name: redirect ? redirect.from.name : 'account'},
                    fetchUser: this.data.fetchUser
                })
                    .then((response) => {
                        let data = response.data;
                        if (data.status === 'error') {
                            self.errors = data.errors;
                        }
                    }, (res) => {
                        //
                    });
            }
        }
    }
</script>