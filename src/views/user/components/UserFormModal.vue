<!-- views/user/components/UserFormModal.vue -->
<template>
    <a-modal
      :title="modalTitle"
      :visible="visible"
      @ok="handleSubmit"
      @cancel="handleCancel"
      :confirm-loading="confirmLoading"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
  
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>
  
        <a-form-item label="角色" name="role">
          <a-select v-model:value="formState.role">
            <a-select-option value="admin">管理员</a-select-option>
            <a-select-option value="user">普通用户</a-select-option>
          </a-select>
        </a-form-item>
  
        <a-form-item label="密码" name="password" v-if="mode === 'create'">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
  
        <a-form-item label="状态" name="status">
          <a-radio-group v-model:value="formState.status">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, watch, computed } from 'vue'
  import type { Rule } from 'ant-design-vue/es/form'
  import { FormInstance } from 'ant-design-vue'
  import { message } from 'ant-design-vue'
import { createUser, updateUser } from '@/api'
import type { User } from '@/utils'
  
  const props = defineProps<{
    visible: boolean
    mode: 'create' | 'edit'
    currentData: User | null
  }>()
  
  const emit = defineEmits(['update:visible', 'refresh'])
  
  const formRef = ref<FormInstance>()
  const confirmLoading = ref(false)
  const modalTitle = computed(() => `${props.mode === 'create' ? '新建' : '编辑'}用户`)
  
  const formState = reactive({
    username: '',
    email: '',
    role: 'user',
    password: '',
    status: 1
  })
  
  // 表单验证规则
  const rules: Record<string, Rule[]> = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 12, message: '用户名长度3-12位', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    password: [
      { 
        required: props.mode === 'create',
        message: '请输入密码',
        trigger: 'blur'
      },
      { min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur' }
    ]
  }
  
  // 初始化表单数据
  watch(() => props.currentData, (val) => {
    if (val && props.mode === 'edit') {
      Object.assign(formState, {
        username: val.username,
        email: val.email,
        role: val.role,
        status: val.status
      })
    } else {
      formRef.value?.resetFields()
    }
  })
  
  // 提交表单
  const handleSubmit = async () => {
    try {
      await formRef.value?.validate()
      confirmLoading.value = true
  
      if (props.mode === 'create') {
        await createUser(formState)
        message.success('创建成功')
      } else {
        await updateUser(props.currentData?.id!, formState)
        message.success('更新成功')
      }
  
      emit('update:visible', false)
      emit('refresh')
    } catch (error) {
      console.error(error)
    } finally {
      confirmLoading.value = false
    }
  }
  
  // 取消操作
  const handleCancel = () => {
    emit('update:visible', false)
    formRef.value?.resetFields()
  }
  
</script>