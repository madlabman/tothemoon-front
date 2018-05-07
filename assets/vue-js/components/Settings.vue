<template lang="jade">
    .settings
        h2.lk-block__title Настройки
        .settings__block
            p.settings__title Профиль
            form(v-on:submit.prevent='updateProfile')
                input.contact-form__input(placeholder='Имя' v-model='profile.name')
                div(v-for='error in errors.name')
                    p.contact-form__error {{ error }}
                app-button(text='Обновить профиль')
        .settings__block
            p.settings__title Изменить пароль
            form(v-on:submit.prevent='updatePassword')
                input.contact-form__input(placeholder='Текущий пароль' type='password')
                div(v-for='error in errors.old')
                    p.contact-form__error {{ error }}
                input.contact-form__input(placeholder='Новый пароль' type='password')
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

            },

            updatePassword: function () {

            },

        },

    }
</script>