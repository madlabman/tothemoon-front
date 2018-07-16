<template lang="jade">
    .page
        h2.lk-block__title {{ page.title }}
        div.page__content(v-html='page.content')
</template>

<script>
    export default {
        name: "Command",
        data() {
            return {
                page: {
                    title: null,
                    content: null,
                }
            }
        },

        mounted() {
            this.fetchPage();
        },

        methods: {

            fetchPage: function () {
                let self = this;
                self.axios.get('/page/command')
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.page = response.data.page;
                        } else {
                            self.$notify({
                                group: 'lk',
                                type: 'error',
                                content: 'Что-то пошло не так!'
                            })
                        }
                    });
            }

        },

    }
</script>