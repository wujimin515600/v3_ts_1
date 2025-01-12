<template>
  <div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :openKeys="openKeys" @openChange="onOpenChange">
      <template v-for="item in routes" :key="item.name">
        <template v-if="item.children && item.children.length > 0">
          <a-sub-menu :key="item.name">
            <template #title>
              <IconView :icon="item?.meta?.icon" />
              <span>
                <span>{{ item?.meta?.title }}</span>
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
import IconView from '@/components/IconView.vue'
const selectedKeys = ref<string[]>(['1'])
const openKeys =  ref<string[]>([]);
const rootSubmenuKeys = ref<string[]>([]);

const routes = useRouter()
  .getRoutes()
  .filter((item) => item.name === 'Layout')[0]?.children;
  console.log(routes)
  routes.forEach(item => rootSubmenuKeys.value.push((item.name) as string));

  const onOpenChange = (keys: string[]) => {
      const latestOpenKey = openKeys.value.find(key => keys.indexOf(key) === -1);
      console.log('latestOpenKey', latestOpenKey, 'keys', keys)
      if (rootSubmenuKeys.value.indexOf(latestOpenKey!) === -1) {
        openKeys.value = keys;
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : [];
      }
    };
</script>
<style scoped></style>
