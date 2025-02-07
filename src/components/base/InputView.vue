<template>
  <!-- <a-input v-model:value="formState.name" /> -->
  <a-form-item :label="prop.title">
          <a-input v-model:value="formState.name" />
        </a-form-item>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
const formState = reactive({
    name: ''
})

const prop = defineOptions({
    title: {
        type: String,
        default: () => ''
    }
})
</script>


<style lang='scss' scoped>

</style>