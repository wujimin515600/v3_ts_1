<template>
    <div style="background: #ececec; padding: 30px">
      <a-card :title="title" :bordered="false">
        <slot name="desc"></slot>
        <slot name="info"></slot>
        <slot name="dependencies"></slot>
        <slot name="devDependencies"></slot>
        <slot></slot>
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