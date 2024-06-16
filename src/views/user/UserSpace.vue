<template>
  <div id="space">
    <Card style="min-height: 80vh">
      <Tabs value="name1">
        <TabPane label="基本信息" name="name1">
          <div class="center">
            <Form ref="form" :model="currentUser" label-position="left" style="width: 400px">
              <h4 style="padding: 12px 0">基本信息</h4>
              <FormItem label="登录账号：" prop="userAccount">{{ currentUser.userAccount }}</FormItem>
              <FormItem label="用户名：" prop="userName">
                <Input v-model="currentUser.userName" style="width: 300px" />
              </FormItem>
              <FormItem label="性别：" prop="gender">
                <Select v-model="currentUser.gender" style="width: 300px; height: 10vh">
                  <Option v-for="item in GenderEnum" :value="item.value" :key="item.value">{{ item.text }}</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="saveEdit">保存</Button>
              </FormItem>
            </Form>
          </div>
        </TabPane>
        <TabPane label="其他配置" name="name2">
          <h4 style="padding: 12px 0">其他配置</h4>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import store from '@/store'
import { GenderEnum } from '@/enum'
import { updateUser } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      GenderEnum: GenderEnum,
      currentUser: {
        // id: 1,
        // userAccount: 'admin',
        // userPassword: '3014dcb9ee3639535d5d9301b32c840c',
        // userRole: 'admin',
        // userName: '管理员',
        // avatarUrl: 'https://i.loli.net/2019/04/28/5cc5a71a6e3b6.png',
        // gender: 0,
        // phone: null,
        // email: null,
        // userStatus: 0,
        // createTime: '2023-03-19 09:12:41',
        // updateTime: '2023-05-14 13:53:35',
        // isDelete: 0,
      },
    }
  },
  methods: {
    async saveEdit() {
      const res = await updateUser(this.currentUser)
      if (res.code === 0) {
        this.$Message.success('保存成功')
      }
    },
  },
  mounted() {
    this.currentUser = store.state.user.loginUser
  },
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
