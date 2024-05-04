<template>
    <a-layout class="main">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <Aside />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          Content
          <RouterView />
          <button @click="backHome">404</button>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  import { useRouter, RouterView, useRoute } from 'vue-router'
  import Aside from './aside/AsideView.vue'
  const selectedKeys = ref<string[]>(['1']);
  const collapsed = ref<boolean>(false);
  const router = useRouter();
  
  // const routes = useRouter().getRoutes().filter((item) => item.name === 'Layout')[0]?.children;
  
  // console.log('routes',routes)
  const backHome = () => {
    router.push('/not');
  }
  </script>
  
  <style scoped>
  .main {
    width: 100%;
    min-height: 100vh;
  }
  
  .logo {
    border: 1px solid red;
    height: 40px;
    width: 100%;
  }
  </style>
  <style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }
  
  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
  </style>
  