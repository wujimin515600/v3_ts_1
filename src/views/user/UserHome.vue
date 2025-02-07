<template>
  <TableView />
</template>
<script setup lang="ts">
import TableView from '@/components/TableView.vue'
import { getUsers } from '@/api'
import { onMounted, provide, ref } from 'vue'
import type { User } from '@/utils'

interface Response {
  items: User[]
}

const list = ref<User[]>([])
provide('userTableData', list)
onMounted(async () => {
  const res: Response = (await getUsers({})) as Response
  list.value = res.items
})
</script>
<style scoped></style>
