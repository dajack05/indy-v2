<template>
    <div class="card mx-auto pt-6" style="width: 100%; max-width: 30em;">
        <div class="card-body">
            <h2 class="card-title">Login</h2>
            <form>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const time = new Date().toTimeString();
        return {
            time,
        }
    },
})
</script>
