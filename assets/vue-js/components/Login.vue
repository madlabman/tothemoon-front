<template lang="jade">
    .login
        h2.login__title Войти
        a.login__to-register
            router-link(to='/register') или зарегистрироваться
        form.login__form(v-on:submit.prevent='login()')
            input.contact-form__input(type='text' placeholder='Логин' v-model='data.body.login' v-bind:class='{ "contact-form__input_error": errors.login }')
            div(v-for='error in errors.login')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='password' placeholder='Пароль' v-model='data.body.password' v-bind:class='{ "contact-form__input_error": errors.password }')
            div(v-for='error in errors.password')
                p.contact-form__error {{ error }}
            p.contact-form__error(v-if='verify_msg') {{ verify_msg }}

            app-button(text='Вход')

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
                        login: '',
                        password: ''
                    },
                    rememberMe: false,
                    fetchUser: false
                },
                errors: {
                    login: null,
                    password: null,
                },
                verify_msg: null,
            }
        },

        mounted() {
            if (this.$route.query.v !== undefined) this.verifyEmail();
        },

        methods: {
            login() {
                this.verify_msg = null;
                let redirect = this.$auth.redirect();
                let app = this;
                this.$auth.login({
                    data: this.data.body,
                    redirect: {name: redirect ? redirect.from.name : 'account'},
                    fetchUser: this.data.fetchUser
                })
                    .then((response) => {
                        console.log(response);
                        let data = response.data;
                        if (data.status === 'error') {
                            app.errors = data.errors;
                        }
                    }, (res) => {
                        // TODO: handle error
                    });
            },

            verifyEmail() {
                let self = this;
                self.axios({
                    method: 'post',
                    url: '/auth/verify',
                    data: {
                        token: this.$route.query.v,
                    }
                }).then(function (response) {
                    let data = response.data;
                    if (data.status !== 'error' && data.msg) {
                        self.verify_msg = data.msg;
                    }
                })
            },

        }
    }
</script>