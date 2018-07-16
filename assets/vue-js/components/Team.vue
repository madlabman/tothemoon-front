<template lang="jade">
    .team
        h2.lk-block__title Команды
        table.team__table
            thead
                tr
                    th Команда
                    th Лидер
                    th
            tbody
                tr(v-for='team in teams')
                    td {{ team.name }}
                    td {{ team.leader }}
                    td(v-if='team.is_member')
                        | Вы состоите в команде
                    td(v-else-if='!team.is_leader'  v-on:click='joinTeam(team)')
                        app-button(text='Присоединиться' )
                    td(v-else)
</template>

<script>
    import Button from './page/Button.vue'

    export default {

        name: "Team",

        data() {
            return {
                teams: [],
            }
        },

        components: {
            'app-button': Button
        },

        mounted() {
            this.fetchTeams();
        },

        methods: {

            fetchTeams: function () {
                let self = this;
                self.axios.get('/teams')
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.teams = response.data.teams;
                        } else {
                            self.$notify({
                                group: 'lk',
                                type: 'error',
                                content: 'Что-то пошло не так!'
                            })
                        }
                    });
            },

            joinTeam: function(team) {
                let self = this;
                self.axios.get(`/teams/join/${team.id}`)
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.$notify({
                                group: 'lk',
                                title: 'Успешно!',
                                text: response.data.msg
                            });
                            self.fetchTeams();
                        } else {
                            self.$notify({
                                group: 'lk',
                                type: 'error',
                                content: response.data.msg
                            })
                        }
                    })
            }

        },

    }
</script>