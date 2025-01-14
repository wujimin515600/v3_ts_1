<template>
  <a-menu-item :key="Item.path" @click="handleMenuClick(Item)">
    <IconView :icon="(Item?.meta?.icon) as string" />
    <span>{{ Item?.meta?.title }}</span>
  </a-menu-item>
</template>
<script setup lang="ts">
import { useRouter, type RouteRecordRaw } from 'vue-router'
import IconView from '@/components/IconView.vue'

defineProps({
  Item: {
    type: Object as () => RouteRecordRaw,
    default: () => ({})
  }
})

const router = useRouter()
const handleMenuClick = (item: RouteRecordRaw) => {
  // 这里不用path主要是因为多级嵌套路由之间path的不好获取，不知道还有没有其他方式获取到不同菜单的path
  // router.push({ path: currentPath });
  router.push({ name: item.name })
}
</script>
<style scoped></style>
