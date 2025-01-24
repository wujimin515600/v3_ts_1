<template>
  <CardView title="数据中心">
    <div style="background: #ececec; padding: 30px">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card>
            <a-statistic
              title="Feedback"
              :value="11.28"
              :precision="2"
              suffix="%"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            >
              <template #prefix>
                <arrow-up-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <a-statistic
              title="Idle"
              :value="9.3"
              :precision="2"
              suffix="%"
              class="demo-class"
              :value-style="{ color: '#cf1322' }"
            >
              <template #prefix>
                <arrow-down-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </CardView>
</template>
<script lang="ts" setup>
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
import CardView from '@/components/CardView.vue'
import { reactive } from 'vue';

const data = reactive({
  head: [
  {
    title: '当前登录',
    num: 10
  },{
    title: '本周访问量',
    num: 10
  },{
    title: '本月访问量',
    num: 10
  },
  {
    title: '本年访问量',
    num: 10
  }
  ]
})
</script>
