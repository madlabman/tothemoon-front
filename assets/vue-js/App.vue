<template lang="jade">
    .lk
        section.page-block.lk-block.page-block_bordered
            .container.container_with-sidebar
                // Навигационное меню
                aside.lk-menu(v-if='$auth.ready() && loaded && $auth.check()')
                    h2.lk-menu__title.lk-block__title Личный кабинет
                    nav.lk-menu__main-nav
                        ul.lk-menu__main-nav__list
                            li.lk-menu__main-nav__item
                                router-link(to='/account') Мой счет
                            li.lk-menu__main-nav__item
                                a.lk-menu__main-nav__link(href='#') Партнерская программа
                            li.lk-menu__main-nav__item
                                a.lk-menu__main-nav__link(href='#') Полезные материалы
                    nav.lk-menu__bottom-nav
                        ul.lk-menu__bottom-nav__list
                            li.lk-menu__bottom-nav__item.lk-menu__bottom-nav__item_settings
                                a.lk-menu__bottom-nav__link(href='#') Настройки
                            li.lk-menu__bottom-nav__item.lk-menu__bottom-nav__item_logout
                                a.lk-menu__bottom-nav__link(v-on:click='logout()' href='javascript:void(0);') Выход
                // Область страницы
                main.lk-page
                    router-view
</template>

<script>
    export default {
        data() {
            return {
                loaded: false
            }
        },
        mounted() {
            let app = this;

            // Set up $auth.ready with other arbitrary loaders (ex: language file).
            setTimeout(function () {
                app.loaded = true;
            }, 500);
        },
        methods: {
            logout() {
                let app = this;
                this.$auth.logout({
                    makeRequest: true,
                    success() {
                        app.$router.push({ name: 'login', query: { redirect: '/login' } });
                    },
                    error() {
                        console.log('Error in logout...');
                    }
                });
            },
        }
    }
</script>