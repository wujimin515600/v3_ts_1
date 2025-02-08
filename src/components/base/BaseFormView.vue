<!-- views/user/UserList.vue -->
<template>
  <a-card>
    <!-- 搜索区域 -->
    <div class="mb-4 flex justify-between">
      <a-form layout="inline" :model="formState">
        <template v-for="item in menuList.search" :key="item.title">
          <a-form-item :label="item.title" v-if="item.type === 'input'">
            <a-input v-model:value="item.value" :placeholder="`请输入` + item.title" />
          </a-form-item>
        </template>
        <!-- <a-form-item label="角色">
            <a-select
              v-model:value="queryParams.role"
              style="width: 120px"
              allow-clear
            >
              <a-select-option value="admin">管理员</a-select-option>
              <a-select-option value="user">普通用户</a-select-option>
            </a-select>
          </a-form-item> -->
        <a-form-item>
          <a-button type="primary" @click="handleSearch">查询</a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- 用户表单模态框 -->
    
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue'

interface FormState {
  [x: string]: string
}

const menuList = inject('menuList', {})
const formState = reactive<FormState>({
      title: ''
    });
const handleSearch = inject('menuSearch', () => {})



// 表格列配置







// 搜索处理
//   const handleSearch = () => {
//     queryParams.page = 1
//     store.getUsers(queryParams)
//     inject('menuSearch', () => {})
//   }
</script>
