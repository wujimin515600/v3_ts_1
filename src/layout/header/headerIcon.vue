<template>
  <a-space :size="16" wrap>
    <a-avatar v-if="login" style="background-color: #87d068">
      <template #icon>
        <UserOutlined />
      </template>
    </a-avatar>
    <a-avatar v-else :size="40">去登录</a-avatar>
  </a-space>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
defineProps({
  login: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
