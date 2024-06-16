<template>
  <div>
    <h1>This is a test page</h1>
    <Button @click="test">测试请求</Button>
    <p v-role="['admin','user']">权限可见标签</p>
  </div>
</template>

<script>

export default {
  methods: {
    test() {
      
    },
  },
}
</script>
