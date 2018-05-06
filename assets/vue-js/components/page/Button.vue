<template lang="jade">
    button.button.button_grad-border {{ text }}
</template>

<script>
    export default {
        props: ['text'],
        mounted() {
            buttonsBorder();
        }
    }
</script>