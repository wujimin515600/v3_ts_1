<template>
  <div class="login-container">
    <a-card title="登录" class="login-card">
      <a-form
        :model="formValues"
        @submit="handleSubmit"
        :rules="rules"
        class="login-form"
      >
        <a-form-item label="用户名" name="username" :rules="rules.username">
          <a-input v-model:value="formValues.username" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="rules.password">
          <a-input-password v-model:value="formValues.password" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading"> 登录 </a-button>
          <a-link class="login-form-forgot" @click="handleForgot"> 忘记密码？ </a-link>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { Login } from '@/api'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/utils'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const useStore = useUserStore()
const formValues = ref({
  username: '',
  password: ''
})
const loading = ref(false)
const rules = ref({
  username: [{ required: true, message: '请输入用户名!', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码!', trigger: 'blur' }]
})

const handleSubmit = async (values: any) => {
  loading.value = true
  try {
    // 在这里发送登录请求到后端服务器
    // const response = await axios.post('/api/login', values);
    // 根据响应结果处理登录成功逻辑
    // 例如：保存用户信息、导航到首页等
    const { username, password } = formValues.value
    if (username.length ===0 || password.length === 0) {
      message.error('用户名或者密码不能为空')
      return
    }
    // 缓存数据，跳转页面
    const res: User = (await Login({ username, password })) as User
    console.log('log', res)
    useStore.setUser(res)
    router.push('/')
    // console.log('登录成功', values)
  } catch (error) {
    // 处理登录失败逻辑
    console.error('登录失败', error)
    message.error('登录失败')
  } finally {
    loading.value = false
  }
}

const handleForgot = () => {
  // 处理忘记密码的逻辑
  console.log('处理忘记密码')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 300px;
}

.login-form {
  margin-top: 24px;
}

.login-form-forgot {
  float: right;
}
</style>
