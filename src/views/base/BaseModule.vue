<!-- <template>
    <div>基础模块</div>
  </template>
  
  <script setup lang='ts'>
  import { ref, reactive } from 'vue'
  
  </script>
  
  
  <style lang='scss' scoped>
  
  </style> -->

<template>
  <div>基础模块</div>
  <a-collapse v-model:activeKey="activeKey" accordion>
    <!-- <a-collapse-panel key="1" header="This is panel header 1">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3">
        <p>{{ text }}</p>
      </a-collapse-panel> -->
    <a-collapse-panel v-for="item in res" :key="item.name" :header="item.name">
      <p>{{ item.name }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const activeKey = ref([])
const res = reactive([
  {
    name: '表单',
    children: [
      {
        name: '单行输入',
        value: ''
      }
    ]
  }
])
const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`
</script>
<!-- <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    setup() {
      const activeKey = ref([]);
      const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
  
      return {
        activeKey,
        text,
      };
    },
  });
  </script> -->
