<template lang="jade">
    header.header.lk__header
        .container
            .header__container
                //.header__sandwich-container
                    .header__sandwich
                        span.header__sandwich__line
                        span.header__sandwich__line
                        span.header__sandwich__line
                .header__block_left
                    a.logo(href='#')
                        img.logo__img(src='img/logo.png')
                        p.logo__title
                            | TOTHEMOON
                            span.logo__title__fund FUND
                .header__block_right
                    .header__contact
                        a.contact-mail(href='mailto:tothemoon@mail.ru') tothemoon@mail.ru
                        a.contact-phone(href='tel:88002000600') 8 800 2000 600
                    .header__sign(v-if='!$auth.check()')
                        router-link(to='/login')
                            app-button(text='Вход')
                        router-link(to='/register')
                            app-button(text='Регистрация')
                    p(v-else-if='$auth.check()')
                        | Здравствуйте, {{ $auth.user().name }}
</template>

<style lang="scss" scoped>
    .header__block_left {
        padding-left: 152px;
    }
</style>

<script>
    import Button from './../page/Button.vue'

    export default {
        components: {
            'app-button': Button
        }
    }
</script>

<style scoped>

</style>