<template>
  <div class="about">
    <CardView :title="info.title" />
  </div>
</template>

<script lang="ts" setup>
import CardView from '@/components/CardView.vue'
import { reactive } from 'vue'
import {data} from '../data'
console.log('data', data)
const info = reactive({
  title: '简介',
  desc: ''
})
</script>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
