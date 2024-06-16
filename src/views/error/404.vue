<template>
  <div>
    <div class="error-page">
      <div>
        <h1 data-h1="404">404</h1>
        <p data-p="NOT FOUND">NOT FOUND</p>
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
