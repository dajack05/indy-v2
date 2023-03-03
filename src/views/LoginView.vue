<template>
    <h1>Welcome at {{time}}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const time = new Date().toTimeString();
        return{
            time,
        }
    },
})
</script>
