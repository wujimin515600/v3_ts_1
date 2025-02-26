<template>
   <a-card>
    <FormView />
    <DataView />
    <!-- <a-table></a-table> -->
  </a-card>
</template>

<script setup lang='ts'>
import { ref, reactive, provide } from 'vue'
import FormView from '@/components/base/BaseFormView.vue'
import DataView from '@/components/base/BaseTableView.vue'
import type { UserQueryParams } from '@/utils'
import { useDictionaryStore } from '@/stores/dictionaryStore'
// import { useDictionaryStore } from '@/stores/dictionaryStore'

const store = useDictionaryStore()

provide('menuList', {
  search: [
    {
      type: 'input',
      title: '字典名称',
      value: ''
    }
  ]
})

provide('Search', () => {
  console.log('menuSearch')
})
provide('menuTable', store)
// 查询参数
const queryParams = reactive<UserQueryParams>({
  page: 1,
  pageSize: 10
})

</script>


<style lang='scss' scoped>

</style>