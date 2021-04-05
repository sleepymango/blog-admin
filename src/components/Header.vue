<template>
        <div class="userInfo">
            <Avatar />
            <DropDown />
        </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import Avatar from '@/components/header/Avatar.vue';
import DropDown from '@/components/header/DropDown.vue';

export default defineComponent({
    name: '',
    components: { DropDown, Avatar },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.userInfo {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
