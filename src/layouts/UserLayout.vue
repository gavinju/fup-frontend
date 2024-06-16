<template>
  <div id="userLayout">
    <div style="min-height: 100vh">
      <Header class="header">
        <img src="../assets/logo.png" class="logo" />
      </Header>
      <Content class="content">
        <router-view />
      </Content>
      <Footer class="footer"></Footer>
    </div>
  </div>
</template>

<script></script>
<style scoped>
#userLayout {
  text-align: center;
  background: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png') 0 0 / 100% 100%;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

.ivu-layout-header {
  background-color: initial;
}

#userLayout .header {
  padding-top: 16px;
  /*margin-top: 16px;*/
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
