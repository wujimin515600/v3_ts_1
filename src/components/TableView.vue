<template>
  <a-table :columns="columns" :data-source="tableData" bordered>
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'username'">
        <a>{{ text }}</a>
      </template>
      <template v-if="column.dataIndex === 'avatar'">
        <a-avatar :src="text" />
      </template>
    </template>
    <template #title>用户列表</template>
    <template #footer>Footer</template>
  </a-table>
</template>
<script lang="ts" setup>
import { inject } from 'vue';


import { type User } from '@/utils'


const columns = [
  {
    title: '昵称',
    dataIndex: 'username'
  },
  {
    title: '角色',
    className: 'column-money',
    dataIndex: 'desc'
  },
  {
    title: '头像',
    dataIndex: 'avatar'
  }
];

const tableData = inject<User[]>('userTableData');

</script>
<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
