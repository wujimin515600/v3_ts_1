<template>
  <!-- <template v-if="data.user.length > 0">  -->
    <TableView  :data="data.user" />
  <!-- </template> -->
  
</template>
<script setup lang="ts">
import TableView from '@/components/TableView.vue'
import { getUser } from '@/api'
import { reactive } from 'vue'
// import type { User } from '@/utils'

const data = reactive({ user: [] })
const getData = async () => {
  const res = await getUser({});
  (data.user as unknown) = res;
  console.log(res, data.user, data.user.length > 0)
}
getData()
</script>
<style scoped></style>
