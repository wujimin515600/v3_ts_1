<template>
  <div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :openKeys="openKeys" @openChange="onOpenChange"  @click="handleClick">
      <template v-for="item in routes" :key="item.name">
        <template v-if="item.children && item.children.length > 0">
          <a-sub-menu :key="item.name">
            <template #title>
              <IconView :icon="(item?.meta?.icon) as string" />
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
import type { MenuItemInfo } from '@/utils'
import { useMenuStore } from '@/stores/menuStore'

const selectedKeys = ref<string[]>([])
const openKeys =  ref<string[]>([]);
const rootSubmenuKeys = ref<string[]>([]);
const menuStore = useMenuStore();

const routes = useRouter()
  .getRoutes()
  .filter((item) => item.name === 'Layout')[0]?.children;
  console.log(routes)
  routes.forEach(item => rootSubmenuKeys.value.push((item.name) as string));

  const init = () => {
      // 缓存默认菜单状态
      const openKey = menuStore.openKeys;
      if (openKey) {
          openKeys.value = openKey
      }

    // 设置默认高亮
    const selectKey = menuStore.selectedKey;
    if (selectKey) {
      selectedKeys.value = [selectKey]
    }
  }
  // 设置页面缓存数据
  init()

  const onOpenChange = (keys: string[]) => {
    const keyArr = []
    if (keys.length > 0) {
        //取最后一项，最后一项才是你当前展开的菜单
        keyArr.push(keys[keys.length - 1])
    }
    openKeys.value = keyArr;
    menuStore.setOpenKeys(keyArr);
    };

    const handleClick = (item: MenuItemInfo) => {
      // 缓存高亮状态
      selectedKeys.value = [item.key];
      menuStore.setSelectedKey(item.key)
      //判断是否是一级菜单，一级菜单item.keyPath长度为1，二级菜单item.keyPath长度为2，清空二级菜单展开数组openKeys
      if (item.keyPath.length == 1) {
          menuStore.setOpenKeys([]);
          openKeys.value = []
      }
    };
</script>
<style scoped></style>
