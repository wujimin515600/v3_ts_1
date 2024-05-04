<template>
  <a-menu-item :key="Item.path" @click="handleMenuClick(Item)">
    <!-- <user-outlined /> -->
    <component :is="$antIcons[Item?.meta?.icon]"></component>
    <span>{{Item.name}}</span>
  </a-menu-item>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import { useRouter, type RouteRecordRaw } from 'vue-router';

const props = defineProps({
    Item: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
})

const router = useRouter();
const handleMenuClick = (item: {
    path: string | undefined;
}) => {
    router.push({ path: item.path });
}
</script>
<style scoped></style>
