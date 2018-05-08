<template lang="jade">
    .settings
        h2.lk-block__title Настройки
        .settings__block
            p.settings__title Профиль
            form(v-on:submit.prevent='updateProfile')
                input.input(placeholder='Имя' v-model='profile.name' v-bind:class='{ "input_error": "errors.name" }')
                div(v-for='error in errors.name')
                    p.input__error {{ error }}
                app-button(text='Обновить профиль')
        .settings__block
            p.settings__title Изменить пароль
            form(v-on:submit.prevent='updatePassword')
                input.input(placeholder='Текущий пароль' type='password' v-model='password.old')
                div(v-for='error in errors.old')
                    p.contact-form__error {{ error }}
                input.input(placeholder='Новый пароль' type='password' v-model='password.new')
                div(v-for='error in errors.new')
                    p.contact-form__error {{ error }}
                app-button(text='Обновить пароль')
</template>

<script>
    import Button from './page/Button.vue'

    export default {

        name: 'Settings',

        components: {
            'app-button': Button
        },

        data() {
            return {
                profile: {
                    name: this.$auth.user().name,
                },
                password: {
                    old: null,
                    new: null,
                },
                errors: {
                    old: null,
                    new: null,
                    name: null,
                },
            }
        },

        methods: {

            updateProfile: function() {
                let self = this;
                self.axios.post('/user/update', self.profile)
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.errors.name = null;
                            self.$notifySuccess('lk', '', 'Данные профиля успешно обновлены!');
                            self.$auth.fetch();
                        } else if(response.data.errors) {
                            self.errors = response.data.errors;
                        } else {
                            self.$notifyServerError('lk');
                        }
                    })
            },

            updatePassword: function () {
                let self = this;
                self.axios.post('/user/password', self.password)
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            // clear error
                            self.errors.old = null;
                            self.errors.new = null;
                            // reset form data
                            self.password = {
                                old: null,
                                new: null,
                            };
                            //notify user
                            self.$notifySuccess('lk', '', 'Пароль изменен!');
                        } else if(response.data.errors) {
                            self.errors = response.data.errors;
                        } else {
                            self.$notifyServerError('lk');
                        }
                    })
            },

        },

    }
</script>