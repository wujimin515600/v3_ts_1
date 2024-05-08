<template>
    <a-table :columns="columns" :data-source="data" bordered>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
      <template #title>用户列表</template>
      <template #footer>Footer</template>
    </a-table>
  </template>
  <script lang="ts" setup>
  const columns = [
    {
      title: '昵称',
      dataIndex: 'name',
    },
    {
      title: '角色',
      className: 'column-money',
      dataIndex: 'money',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'wujimin',
      money: 'admin',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  </script>
  <style scoped>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
  </style>
  