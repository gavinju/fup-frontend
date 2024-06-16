<template>
  <div>
    <div class="error-page">
      <div>
        <h1 data-h1="403">403</h1>
        <p data-p="FORBIDDEN ERROR">FORBIDDEN ERROR</p>
      </div>
    </div>
    <a class="back" @click='backPage'> GO BACK </a>
  </div>
</template>

<script>
export default {
  methods: {
    backPage () {
      this.$router.go(-1);
    },
  },
}
</script>

<style scoped>
@import './error.css';
</style>