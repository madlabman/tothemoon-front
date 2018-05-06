<template lang="jade">
    .login
        h2.login__title Зарегистрироваться
        a.login__to-register
            router-link(to='/login') или войти
        form.login__form(v-on:submit.prevent='register()')
            input.contact-form__input(type='text' placeholder='Имя' v-model='data.body.name' required=true v-bind:class='{ "contact-form__input_error": errors.name }')
            div(v-for='error in errors.name')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='text' placeholder='Телефон' v-model='data.body.phone' required=true v-bind:class='{ "contact-form__input_error": errors.phone }')
            div(v-for='error in errors.phone')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='text' placeholder='Логин' v-model='data.body.username' required=true v-bind:class='{ "contact-form__input_error": errors.username }')
            div(v-for='error in errors.username')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='password' placeholder='Пароль' v-model='data.body.password' required=true v-bind:class='{ "contact-form__input_error": errors.password }')
            div(v-for='error in errors.password')
                p.contact-form__error {{ error }}

            input.contact-form__input(type='text' placeholder='Промокод' v-model='data.body.promo')
            button.button.button_grad-border(type='submit') Регистрация

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
                        username: '',
                        password: '',
                        promo: '',
                    },
                },
                errors: {
                    username: null,
                    name: null,
                    phone: null,
                    password: null,
                }
            }
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
            }
        }
    }
</script>