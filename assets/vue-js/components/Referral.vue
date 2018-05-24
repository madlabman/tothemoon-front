<template lang="jade">
    .referral
        h2.lk-block__title Партнерская программа
        .referral__block
            p.referral__promo
                | Ваш промокод:
                span.referral__promo__code.referral__label(
                    v-clipboard:copy='promo_code'
                    v-clipboard:success='onCopy'
                    )
                    | {{ $auth.user().promo_code }}
            p.referral__promo
                | Реферальная ссылка:
                span.referral__promo__code.referral__label(
                    v-clipboard:copy='ref_link'
                    v-clipboard:success='onCopy'
                    )
                    | {{ ref_link }}
        .referral__block(v-if='leader')
            p.referral__leader Вы пришли по ссылке пользователя по имени
                span.referral__label {{ leader.name }}
        .referral__block(v-if='ref_count')
            p.referral__leader Вы привели пользователей:
                span.referral__label {{ ref_count }}

</template>

<script>
    export default {

        name: 'Referral',

        data() {
            return {
                leader: null,
                ref_count: null,
            }
        },

        computed: {

            promo_code: function () {
                return this.$auth.user().promo_code;
            },

            ref_link: function () {
                let props = this.$router.resolve({
                    name: 'register',
                });
                return 'http://fund.chtoto.net/lk.html' + props.href + '?r=' + this.$auth.user().promo_code;
            }

        },

        mounted() {
            this.getLeader();
            this.getRefCount();
        },

        methods: {

            onCopy: function () {
                this.$notify({
                    group: 'lk',
                    text: 'Скопировано в буфер обмена!'
                })
            },

            getLeader: function () {
                let self = this;
                self.axios.get('/user/leader')
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.leader = response.data.leader;
                        }
                    })
            },

            getRefCount: function () {
                let self = this;
                self.axios.get('/user/ref_count')
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.ref_count = response.data.ref_count;
                        }
                    })
            },

        },

    }
</script>