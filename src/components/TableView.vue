<template>
  <a-table :columns="columns" :data-source="tableData" bordered>
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
import { toRefs, watch, type PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

// import { type User } from '@/utils'yo
const props = defineProps({
  data: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: () => {
      return []
    }
  }
  // data: []
})

watch(() => props.data,(a, b) => {
  console.log(a, b, 'watch')
  createData()
}, {deep: true})
// {
//       userId: 1,
//       avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//       username: 'admin',
//       password: '111111',
//       desc: '平台管理员',
//       roles: ['platform'],
//       buttons: ['cuser.detail'],
//       routes: ['home'],
//       token: 'Admin Token'
//     },
// defineProps({
//   data: {
//     type: Object as PropType<RouteRecordRaw>,
//     default: () => ({})
//   }
// })
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
]
console.log('data', props.data)
const tableData = [];
const createData = () => {
  console.log(props.data,'props.data', toRefs(props.data))
//   props.data.forEach(item => {
//   tableData.push({key: item.userId,...item})
// })
// // const tableData = props.data.map(item => {key: item.userId, username.item.username,desc: item.desc, avatar: item.avatar});
// console.log('tableData', tableData)
}

// const data = [
//   {
//     key: '1',
//     name: 'wujimin',
//     money: 'admin',
//     address: 'New York No. 1 Lake Park'
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     money: '￥1,256,000.00',
//     address: 'London No. 1 Lake Park'
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     money: '￥120,000.00',
//     address: 'Sidney No. 1 Lake Park'
//   }
// ]
</script>
<style scoped>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
