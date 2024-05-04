<template>
  <div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <template v-for='item in routes' :key="item.name">
            <MenuItem :Item="item" />
          </template>
         
        </a-menu>
        
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import MenuItem from './MenuItem.vue'
const selectedKeys = ref<string[]>(['1']);
  const router = useRouter();

  const routes = useRouter().getRoutes().filter((item) => item.name === 'Layout')[0]?.children;
</script>
<style scoped></style>
