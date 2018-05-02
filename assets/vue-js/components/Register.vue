<template lang="jade">
    .login
        h2.login__title Зарегистрироваться
        a.login__to-register
            router-link(to='/login') или войти
        form.login__form(v-on:submit.prevent='register()')
            input.contact-form__input(type='text' placeholder='Имя' v-model='data.body.name' required=true v-bind:class='{ "contact-form__input_error": errors.name }')
            p(v-show='errors.name').contact-form__error {{ errors.name }}

            input.contact-form__input(type='text' placeholder='Телефон' v-model='data.body.phone' required=true v-bind:class='{ "contact-form__input_error": errors.phone }')
            p(v-show='errors.phone').contact-form__error {{ errors.phone }}

            input.contact-form__input(type='text' placeholder='Логин' v-model='data.body.username' required=true v-bind:class='{ "contact-form__input_error": errors.username }')
            p(v-show='errors.username').contact-form__error {{ errors.username }}

            input.contact-form__input(type='password' placeholder='Пароль' v-model='data.body.password' required=true v-bind:class='{ "contact-form__input_error": errors.password }')
            p(v-show='errors.password').contact-form__error {{ errors.password }}

            input.contact-form__input(type='text' placeholder='Промокод' v-model='data.body.promo')
            button.button.button_grad-border(type='submit') Регистрация

</template>

<script>
    export default {
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
        mounted() {
            if (typeof buttonsBorder === "function") buttonsBorder();
        },
        methods: {
            register() {
                let self = this;
                // let form_data = new FormData();
                // Object.entries(self.data.body).forEach((k) => form_data.append(k[0], k[1]));
                self.axios({
                    method: 'post',
                    url: '/auth/register',
                    data: self.data.body
                }).then(function (response) {
                    let data = response.data;
                    if (data.status !== false) {
                        self.$router.push({ name: 'login', query: { redirect: '/login' } });
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