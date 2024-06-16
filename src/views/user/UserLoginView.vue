<template>
  <div>
    <Form ref="formInline" :model="loginForm" :rules="ruleInline" style="max-width: 480px; margin: 0 auto">
      <FormItem prop="userAccount" label="账号">
        <Input type="text" v-model="loginForm.userAccount" placeholder="请输入账号">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="userPassword" label="密码">
        <Input type="password" v-model="loginForm.userPassword" placeholder="请输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit" style="width: 100%">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { getUserLogin, userLogin } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      loginForm: {
        userAccount: 'admin',
        userPassword: '123456',
      },
      ruleInline: {
        userAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }],
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
          const res = await userLogin(this.loginForm)
          if (res.code === 0) {
            getUserLogin().then((loginRes) => {
              if (loginRes.code === 0) {
                this.$store.commit('updateUser', loginRes.data)
                this.$Message.success('登录成功')
                this.$router.push('/')
              }
            })
          } else {
            this.$Message.error('登录失败!' + res.message)
          }
        }
      })
    },
  },
}
</script>

<style scoped></style>
