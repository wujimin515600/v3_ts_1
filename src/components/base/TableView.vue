<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :loading="loading"
    :pagination="pagination"
    @change="$emit('handleTableChange')"
    :row-selection="rowSelection"
    bordered
  >
    <template #bodyCell="{ column, record }">
      <template v-if="type === 'dictionary'"> </template>
      <template v-if="type === 'menu'">
        <template v-if="column.dataIndex === 'menu_type'">
          <span>
            <a-tag :color="record.menu_type === '目录' ? 'cyan' : 'green'">
              {{ record.menu_type }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.dataIndex === 'menu_visible'">
          <span>
            <a-tag :color="record.menu_visible === 1 ? 'purple' : 'blue'">
              {{ record.menu_visible === 1 ? '显示' : '隐藏' }}
            </a-tag>
          </span>
        </template>
      </template>
      <!-- 公共  start-->
      <template v-if="column.dataIndex === 'operation'">
        <a-space>
          <a-button
            type="primary"
            size="small"
            ghost
            @click="$emit('showModal', 'edit', record, columns)"
            >编辑
          </a-button>
          <a-button type="primary" size="small" danger ghost @click="$emit('showConfirm', record)"
            >删除</a-button
          >
        </a-space>
      </template>
      <!-- 公共  end-->
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    deafult: () => [],
    required: true
  },
  data: {
    type: Array,
    deafult: () => [],
    required: true
  },
  loading: {
    type: Boolean,
    deafult: () => false,
    required: true
  },
  pagination: {
    type: Object,
    default: () => {}
  },
  type: {
    type: String,
    default: () => 'menu'
  }
})

const rowSelection = ref({
  checkStrictly: false
  //   onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  //   },
  //   onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
  //     console.log(record, selected, selectedRows)
  //   },
  //   onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
  //     console.log(selected, selectedRows, changeRows)
  //   }
})

// const handleTableChange: TableProps['onChange'] = (pag, filters, sorter) => {
//   // queryParams.page = pag.current!
//   // queryParams.pageSize = pag.pageSize!
//   // queryParams.role = filters.role?.[0]
//   // store.getUsers(queryParams)
// }
</script>

<style lang="scss" scoped></style>
