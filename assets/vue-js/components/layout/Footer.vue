<template lang="jade">
    footer.footer
        .container.container_with-sidebar
            .footer__container
                a.logo(href='#')
                    img.logo__img(src='img/logo.png')
                    p.logo__title
                        | TOTHEMOON
                        span.logo__title__fund FUND
                        span.logo__title__copyright &copy; 2018 tothemoon fund
                .footer__contact
                    p.contact-address г. Астрахань, ул. Полевая 86, офис 854
                    p.contact-mail tothemoon@mail.ru
                .footer__sign
                    div.footer__sign__wrapper(v-show='!$auth.check()')
                        router-link(to='/login')
                            app-button(text='Вход')
                        router-link(to='/register')
                            app-button(text='Регистрация')
                    .footer__sign__bottom
                        .icon-block
                            i.icon.icon_instagram
                            i.icon.icon_fb
                            i.icon.icon_vk
                            i.icon.icon_twitter
                            i.icon.icon_tg
                        a.contact-phone.contact-phone_with-icon(href='tel:88002000600') 8 800 2000 600
</template>

<script>
    import Button from './../page/button.vue'

    export default {
        components: {
            'app-button': Button
        }
    }
</script>