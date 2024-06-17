<template>
  <div id="basicLayout">
    <Layout style="min-height: 100vh">
      <!--<Sider hide-trigger>Sider</Sider>-->
      <Layout>
        <Header>
          <GlobalHeader />
        </Header>
        <Content id="content">
          <router-view />
        </Content>
        <Footer><a href="#" target="_blank"> </a></Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader'

export default {
  components: { GlobalHeader },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style scoped>
#basicLayout {
}

#content {
  padding: 8px;
}
</style>
