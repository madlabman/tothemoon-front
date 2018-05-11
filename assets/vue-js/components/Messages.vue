<template lang="jade">
    .message__block
        h2.lk-block__title Сообщения
        form.message__form(v-on:submit.prevent='sendMessage')
            input.input(v-model='new_message.to' placeholder='Введите номер' required=true v-mask="'+7 (999) 999-99-99'" v-bind:class='{ "input_error": errors.to }')
            div(v-for='error in errors.to')
                p.input__error {{ error }}
            textarea.input(v-model='new_message.text' placeholder='Введите текст' v-bind:class='{ "input_error": errors.text }')
            div(v-for='error in errors.text')
                p.input__error {{ error }}
            app-button(text='Отправить')
        .messages__list
            .message(v-for='message in messages' v-on:mouseover='read(message)')
                .message__date {{ message.created_at }}
                .message__sender(v-on:click='setReceiver(message)') {{ sender(message) }}
                .message__is-read(v-if='!message.is_read') (Не прочитано)
                .message__text {{ message.text }}
</template>

<script>
    import Button from './page/Button.vue'

    export default {
        name: "Messages",

        components: {
            'app-button': Button,
        },

        data() {
            return {
                messages: [],
                new_message: {
                    to: null,
                    text: null,
                },
                timer: null,
                errors: {
                    to: null,
                    text: null,
                }
            }
        },

        mounted() {
            let self = this;
            self.getMessages();
            self.timer = setTimeout(function tick() {
                self.getMessages()
                self.timer = setTimeout(tick, 10000)
            }, 10000)
        },

        methods: {

            getMessages: function () {
                let self = this;
                self.axios.get('/user/chat/all')
                    .then((response) => {
                        if (response.data.status && response.data.status === 'success') {
                            self.messages = response.data.messages;
                        } else {
                            self.$notifyServerError('lk');
                        }
                    });
            },

            sender: function (message) {
                if (message.from_user.id !== this.$auth.user().id) return message.from_user.phone;
                else return 'Вы';
            },

            read: function (message) {
                if (!message.is_read && (message.to_user.id === this.$auth.user().id)) {
                    this.axios.get('/user/chat/read/' + message.id)
                        .then((response) => {
                            if (response.data.status) {
                                if (response.data.status === 'success') {
                                    message.is_read = true;
                                }
                            } else {
                                self.$notifyServerError('lk');
                            }
                        });
                }
            },

            sendMessage: function () {
                let self = this;
                this.axios.post('/user/chat/post', this.new_message)
                    .then((response) => {
                        if (response.data.status) {
                            if (response.data.status === 'success') {
                                self.$notifySuccess('lk', '', 'Сообщение успешно отправлено!');
                                self.getMessages();
                            } else if (response.data.status === 'error' && response.data.errors) {
                                self.errors = response.data.errors;
                            }
                        } else {
                            self.$notifyServerError('lk');
                        }
                    });
            },

            setReceiver: function (message) {
                this.new_message.to = message.from_user.phone;
            }

        },

    }
</script>