<template lang="jade">
    .signals
        h2.lk-block__title Сигналы
        ul.signals__list
            li.signals__item(v-for='signal in signals')
                p.signals__item__date
                    span.signals__item__type(v-bind:class='getTypeClass(signal.level)')
                    | {{ signal.created_at | formatDate }}
                .signal__item__infov(v-html='signal.info')
</template>

<script>
    export default {
        name: "Signal",
        data() {
            return {
                signals: [],
            }
        },

        mounted() {
            this.getSignals();
        },

        methods: {

            getTypeClass: function ( type ) {
                switch (type) {
                    case 1: return 'signals__item__type_red';
                    case 2: return 'signals__item__type_yellow';
                    case 4: return 'signals__item__type_green';
                    default: return null;
                }
            },

            getSignals: function () {
                let self = this;
                self.axios.get('/signal')
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.signals = response.data.signals;
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