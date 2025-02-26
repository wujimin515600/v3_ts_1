<template>
  <a-space wrap>
    <a-button type="primary" @click="cratePage">创建页面</a-button>
    字典管理
    <RemoteChild v-if="showRemoteChild" />
  </a-space>

</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import * as Vue from 'vue'
import {
		loadModule
	} from 'vue3-sfc-loader'


const showRemoteChild = ref(false);
const cratePage = () => {
    // loadRemoteComponent()
    showRemoteChild.value = true
}

const url = 'http://127.0.0.1:9000/test.vue'
	const options = {
		moduleCache: {
			vue: Vue,
		},
		async getFile(url: string) {
			const res = await fetch(url);
			const code = await res.text();
      console.log('code', code)
			return code;
		},
		addStyle(textContent: any) {
			const style = Object.assign(document.createElement("style"), {
				textContent,
			});
			const ref = document.head.getElementsByTagName("style")[0] || null;
			document.head.insertBefore(style, ref);
		},
	};

	const RemoteChild = defineAsyncComponent(async () => {
		const res = await loadModule(
			url,
			options
		);
		console.log("res", res);
		return res;
	});

</script>

<style lang="scss" scoped></style>
