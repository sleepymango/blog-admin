<template>
  <login-form />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import LoginForm from '@/components/form/LoginForm.vue'

export default defineComponent({
  name: '',
  components: {LoginForm  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
