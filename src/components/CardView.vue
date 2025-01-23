<template>
    <div style="background: #ececec; padding: 30px">
      <a-card :title="title" :bordered="false">
        
      </a-card>
    </div>
  </template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: () => ''
  }
})
</script>

<style lang="scss" scoped></style>