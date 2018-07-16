<template lang="jade">
    .faq
        h2.lk-block__title FAQ
        select(v-model='selected.question')
            option(selected=true disabled=true) Выберите вопрос
            option(v-for='post in faq' v-bind:value='post') {{ post.question }}
        div.faq__answer(v-html='selected.question.answer')
</template>

<script>
    export default {
        name: "FAQ",
        data() {
            return {
                faq: [],
                selected: {
                    question: 'Выберите вопрос',
                }
            }
        },

        mounted() {
            this.fetchFAQ();
        },

        methods: {

            fetchFAQ: function () {
                let self = this;
                self.axios.get('/faq')
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.faq = response.data.faq;
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