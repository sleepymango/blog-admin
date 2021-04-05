<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useListProvide } from '@/utils/provide';

export default defineComponent({
    name: 'App',
    components: {},
    setup() {
        useListProvide();
    },
});
</script>

<style lang="scss">
#app {
}
</style>