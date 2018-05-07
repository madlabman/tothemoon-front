<template lang="jade">
    // Навигационное меню
    aside.lk-menu(v-if='$auth.check()')
        h2.lk-menu__title.lk-block__title Личный кабинет
        nav.lk-menu__main-nav
            ul.lk-menu__main-nav__list
                li.lk-menu__main-nav__item
                    router-link(to='/account') Мой счет
                li.lk-menu__main-nav__item
                    router-link(to='/signals') Сигналы
                li.lk-menu__main-nav__item
                    router-link(to='/referral') Партнерская программа
                li.lk-menu__main-nav__item
                    a.lk-menu__main-nav__link(href='#') Полезные материалы
        nav.lk-menu__bottom-nav
            ul.lk-menu__bottom-nav__list
                li.lk-menu__bottom-nav__item.lk-menu__bottom-nav__item_settings
                        router-link(to='/settings') Настройки
                li.lk-menu__bottom-nav__item.lk-menu__bottom-nav__item_logout
                    a.lk-menu__bottom-nav__link(v-on:click='logout' href='javascript:void(0);') Выход
</template>

<script>
    export default {
        methods: {
            logout() {
                this.$parent.logout();
            }
        }
    }
</script>