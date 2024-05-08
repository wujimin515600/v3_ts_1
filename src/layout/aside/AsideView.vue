<template>
  <div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <template v-for="item in routes" :key="item.name">
        <template v-if="item.children && item.children.length > 0">
            <a-sub-menu :key="item.name">
              <template #title>
                <IconView :icon="item?.meta?.icon" />
                <span>
                  <span>{{item?.meta?.title}}</span>
                </span>
              </template>
              <template v-for="sub_item in item.children" :key="sub_item.name">
                <MenuItem :Item="sub_item" />
              </template>
            </a-sub-menu>
        </template>

        <template v-else>
          <MenuItem :Item="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from './MenuItem.vue'
import IconView from '@/components/IconView.vue';
const selectedKeys = ref<string[]>(['1'])
const routes = useRouter()
  .getRoutes()
  .filter((item) => item.name === 'Layout')[0]?.children

</script>
<style scoped></style>
