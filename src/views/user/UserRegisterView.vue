<template>
  <div>
    <h2>欢迎注册</h2>
    <Form ref="formInline" :model="loginForm" :rules="ruleInline" style="max-width: 480px; margin: 0 auto">
      <FormItem prop="userAccount" label="账号">
        <Input type="text" v-model="loginForm.userAccount" placeholder="请输入账号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="userName" label="用户名">
        <Input type="text" v-model="loginForm.userName" placeholder="请输入用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="userPassword" label="密码">
        <Input type="password" v-model="loginForm.userPassword" placeholder="请输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit" style="width: 100%">注册</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { userRegister } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      loginForm: {
        userAccount: '',
        userName: '',
        userPassword: '',
      },
      ruleInline: {
        userAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '至少6位', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['formInline'].validate(async (valid) => {
        if (valid) {
          const res = await userRegister(this.loginForm)
          if (res.code === 0) {
            this.$Message.success('注册成功')
            this.$router.push('/user/login')
          } else {
            this.$Message.error('注册失败!' + res.message)
          }
        }
      })
    },
  },
}
</script>

<style scoped></style>
