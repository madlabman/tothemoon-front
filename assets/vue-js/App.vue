<template lang="jade">
    .lk
        // Header
        app-header
        // Content
        main.page-content
            section.page-block.lk-block.page-block_bordered
                .container.container_with-sidebar
                    app-nav
                    // Область страницы
                    main.lk-page
                        router-view
            // Уведомления
            notifications(group='lk' position='bottom left')
        // Footer
        app-footer

</template>

<script>
    import Header from "./components/layout/Header.vue";
    import Footer from "./components/layout/Footer.vue";
    import Nav from "./components/layout/Nav.vue"

    export default {
        components: {
            'app-header': Header,
            'app-footer': Footer,
            'app-nav': Nav,
        },
        data() {
            return {
                loaded: false,
            }
        },
        mounted() {
            initGradients();
            let app = this;
            // Set up $auth.ready with other arbitrary loaders (ex: language file).
            setTimeout(function () {
                app.loaded = true;
            }, 100);
        },
        updated() {
            this.$auth.check();
            // this.$initVendorJS();
        },
        methods: {
            logout() {
                let app = this;
                this.$auth.logout({
                    makeRequest: true,
                    success() {
                        app.$router.push({
                            name: 'login',
                            query: {
                                redirect: '/login'
                            }
                        });
                    },
                    error() {
                        // TODO: handle error
                        this.$notifyServerError('lk');
                    }
                });
            }
        }
    }
</script>