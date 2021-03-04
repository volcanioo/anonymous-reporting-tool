<template>
  <footer class="footer">
    <p>Powered by <a href="https://github.com/anonymouslyreportingtool" target="_blank">open-source contributors</a>.</p>
  </footer>
</template>

<script>
  export default {
    name: "BaseFooter",
  }
</script>

<style lang="scss" scoped>
.footer {
  margin: 0;
  background: #F2F2F2;
  line-height: 88px;
  color: var(--dark-black);
  text-align: center;
  p {
    margin: 0;
  }
  a {
    color: var(--dark-black);
    text-decoration: underline;
    font-weight: 600;
  }
}
</style>