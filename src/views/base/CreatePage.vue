<template>
  <a-space wrap>
    <a-button type="primary" @click="cratePage">创建页面</a-button>
  </a-space>

</template>

<script setup lang="ts">
import { ref, reactive, defineComponent } from 'vue'


const url = 'http://127.0.0.1:9000//123.vue'

const template = `
    import { defineComponent, ref } from 'vue';

    export default defineComponent({
    name: 'MyComponent',
    templte: '<div>{{message}}</div>'
    setup() {
        const message = ref('Hello from MyComponent!');

        const changeMessage = () => {
        message.value = 'Message changed!';
        };

        return {
        message,
        changeMessage
        };
    }
    });
`
const a = `export default function Home() {
  return {
    template: '<div>Home Page</div>'
  };
}`
const cratePage = () => {
    
}

</script>

<style lang="scss" scoped></style>
