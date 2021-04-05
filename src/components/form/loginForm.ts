import { ref } from 'vue'
import { User, LoginRules } from '@/components/types'

//  登录用户
export const loginUser = ref<User>({
  username: '',
  password: '',
})

// 表单校验规则
export const rules = ref<LoginRules>({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 30,
      message: '密码长度必须在6到30个字符之间',
      trigger: 'blur',
    },
  ],
})
