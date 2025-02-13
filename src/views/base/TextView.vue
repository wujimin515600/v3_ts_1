<!-- src/components/DynamicPage.vue -->
<template>
    <div>
      <!-- <component 
        v-for="(widget, index) in pageConfig.widgets"
        :is="widgetComponents[widget.type]"
        :key="index"
        :config="widget.config"
      /> -->
      sdsdsd
    </div>
  </template>
  
  <script setup>
//   import DynamicTable from './DynamicTable.vue';
//   import DynamicForm from './DynamicForm.vue';
  
  const props = defineProps(['pageConfig']);
  console.log('porps', props)
//   const widgetComponents = {
//     table: DynamicTable,
//     form: DynamicForm
//   };
  </script>