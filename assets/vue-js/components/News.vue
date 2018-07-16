<template lang="jade">
    .news
        h2.lk-block__title Новости
        ul.news__list
            li.news__item(v-for='post in news')
                p.news__item__date {{ post.created_at | formatDate }}
                .news__item__title {{ post.title }}
                .news__item__content(v-html='post.content')
</template>

<script>
    export default {
        name: "News",
        data() {
            return {
                news: [],
            }
        },

        mounted() {
            this.fetchNews();
        },

        methods: {

            fetchNews: function () {
                let self = this;
                self.axios.get('/news')
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.news = response.data.news;
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