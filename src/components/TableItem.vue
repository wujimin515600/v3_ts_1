<template>
  <a-table :columns="columns" :data-source="table">

  </a-table>
</template>

<script setup lang='ts'>
import { ref, reactive, inject } from 'vue'
interface Item {
    [x: string]: string
}

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})
console.log('props', props)
const columns: Item[]= [];
const table: Item[]= [];
props.data.forEach((item: any) => {
    // return {
    //     title: 'Age',
    //     dataIndex: 'age',
    //     key: 'age',
    // }
    // const column = {
    //     title: item.title,
    //     dataIndex: 'age',
    //     key: 'age',
    // }
    columns.push({
        title: item.title,
        dataIndex: item.title,
        key: item.title,
    })

    table.push({
        key: item.desc,
        name: item.desc,
    })
})

const columns1 = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle', customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' },
  },
];

const data1 = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


</script>


<style lang='scss' scoped>

</style>