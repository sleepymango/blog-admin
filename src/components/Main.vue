<template>
    <Breadcrumb />
    <router-view />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import Article from '@/components/table/ArticleList.vue';
import Breadcrumb from '@/components/main/Breadcrumb.vue';

export default defineComponent({
    name: 'Main',
    components: { Breadcrumb, Article },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped></style>
