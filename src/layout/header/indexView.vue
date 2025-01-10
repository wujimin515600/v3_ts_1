<template>
  <div class="main-header">
    <div class="content"></div>
    <div class="user">
      <!-- <a-popover title="" trigger="hover" arrow-point-at-center>
        <template #content>
          <p>帐号信息</p>
          <p>退出登录</p>
        </template>
        <HeaderIcon :login="login" />
      </a-popover> -->
      <div class="demo-dropdown-wrap">
        <a-dropdown-button>
          {{ user.username }}
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item
                v-for="(item, index) in menus"
                :key="index"
                @click="handleButtonClick(item)"
              >
                <UserOutlined />
                {{ item.title }}
              </a-menu-item>
            </a-menu>
          </template>
          <template #icon><UserOutlined /></template>
        </a-dropdown-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import HeaderIcon from './headerIcon.vue'
// import { useTokenStore } from '@/stores/userStore'
const login = ref(false)
// const {token, removeToken} = useTokenStore();
// const useStore = useUserStore() // 定义 store 接收
// const token: string = useStore.data.user?.token ?? ''
// if (token && token.length > 0) {
//   login.value = true
// }

import router from '@/router'
import { useUserStore } from '@/stores/userStore'
import type { HeaderRightMenu, User } from '@/utils'
import { UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const useStore = useUserStore()
const user: User = useStore.data.user as User

const menus: HeaderRightMenu[] = [
  {
    title: '修改信息',
    path: '/user/adduser',
    type: 'router'
  },
  {
    title: '退出',
    path: '',
    type: 'layout'
  }
]

const handleButtonClick = (menu: HeaderRightMenu) => {
  // console.log('click left button', e, menu)
  const { path, type } = menu
  if (type === 'layout') {
    layout()
  }
  if (path?.length !== 0 && type === 'router') {
    console.log(path)
    router.push({ path })
  }
}
const handleMenuClick = (e: Event) => {
  console.log('click', e)
}

const layout = () => {
  useStore.removeUser()
  message.success('退出成功', 2000)
  setTimeout(() => {
    location.reload()
  }, 2000)
}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 40px;

  .content {
    height: 100%;
    border: 1px solid blue;
    flex: 1;
  }
  .user {
    margin-left: auto;

    // width: 200px;
    border: 1px solid red;
  }

  .demo-dropdown-wrap :deep(.ant-dropdown-button) {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
