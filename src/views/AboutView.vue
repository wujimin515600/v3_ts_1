<template>
  <div class="about">
    <CardView :title="info.desc.title">
      <template #desc>
        <p>{{ info.desc.desc }}</p>
      </template>
    </CardView>
    <CardView :title="info.info.title">
      <template #info>
        <template v-for="(item, index) in info.info.list" :key="index">
          <a-card-grid style="width: 50%; text-align: center" >{{ item.title }}</a-card-grid>
          <a-card-grid style="width: 50%; text-align: center" >{{ item.desc }}</a-card-grid>
        </template>
      </template>
    </CardView>
    <CardView :title="info.dependencies.title">
      <template #dependencies>
        <template v-for="(item, index) in info.dependencies.list" :key="index">
          <a-card-grid style="width: 25%; text-align: center" >{{ item.title }}</a-card-grid>
          <a-card-grid style="width: 25%; text-align: center" >{{ item.desc }}</a-card-grid>
        </template>
      </template>
    </CardView>

    <CardView :title="info.devDependencies.title">
      <template #devDependencies>
        <template v-for="(item, index) in info.devDependencies.list" :key="index">
          <a-card-grid style="width: 25%; text-align: center" >{{ item.title }}</a-card-grid>
          <a-card-grid style="width: 25%; text-align: center" >{{ item.desc }}</a-card-grid>
        </template>
      </template>
    </CardView>

  </div>
</template>

<script lang="ts" setup>
import CardView from '@/components/CardView.vue'
import { reactive } from 'vue'
import {data} from '../data'
const info = reactive(data)
// provide('aboutData', info)
</script>

<style>
</style>
