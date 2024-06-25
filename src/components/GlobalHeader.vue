<template>
  <div id="globalHeader">
    <Row :wrap="false">
      <Col flex="auto">
        <Row :wrap="false">
          <div class="title-bar">
            <div class="title">{{ title }}</div>
          </div>
          <Menu mode="horizontal" theme="dark" @on-select="selectMenu">
            <MenuItem :name="item.name" v-for="item in visibleRoutes" :key="item.name">
              {{ item.name }}
            </MenuItem>
          </Menu>
        </Row>
      </Col>
      <Col flex="140px">
        <Row>
          
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import { appRouter, routes } from '@/router/routes'
import { userLogout } from '@/api/user'
import checkAccess from '@/access/checkAccess'

export default {
  data() {
    return {
      title: 'File Upload',
    }
  },
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    },
    visibleRoutes() {
      return appRouter.filter((item, index) => {
        if (item.meta) {
          if (item.meta.hideInMenu) {
            return false
          }
          //根据权限过滤菜单
          if (!checkAccess(this.$store.state.user.loginUser, item.meta.access)) {
            return false
          }
        }
        return true
      })
    },
  },
  mounted() {},
  methods: {
    selectMenu(active) {
      if (this.$route.name !== active) {
        this.$router.push({
          name: active,
        })
      }
    },
    async handleSelect(v) {
      if (v === '个人中心') {
        this.$router.push({ name: v })
      }
      if (v === '退出账号') {
        const res = await userLogout()
        if (res.code === 0) {
          this.$store.commit('userLogout')
          this.$Message.success('退出成功')
          this.$router.push('/user/login')
        }
      }
    },
  },
}
</script>

<style scoped>
#globalHeader {
  color: #cbced4;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
  margin-right: 48px;
}

.logo {
  height: 36px;
}

.avatar {
  /*margin-top: 16px;*/
  color: #383535;
  background-color: #ffffff;
}
</style>
