<template>
  <header class="header">
    <router-link
      to="/anonymous-login"
      class="header__button z-index-1"
      v-text="$t('anonymous_login')"
    />
    <router-link
      to="/"
      class="header__title z-index-1"
      v-text="$t('name')"
    />
    <router-link
      to="/login"
      class="header__button z-index-1"
      v-text="$t('company_login')"
    />
  </header>
</template>

<script>
  export default {
    name: "BaseHeader",
  }
</script>

<style lang="scss" scoped>
.header {
  padding: 45px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.header__title {
  font-size: 24px;
  line-height: 32px;
  color: var(--dark-black);
  font-weight: 500;
  text-decoration: none;
  padding: 0 80px;
}

.header__button {
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  padding: 12px 24px;
  color: var(--dark-black);
  border: 1px solid var(--dark-black);
  background: transparent;
  font-weight: 500;
  border-radius: 1px;
  cursor: pointer;
  transition: all .2s;
  box-shadow: 5px 5px var(--dark-black);

  &:first-child:hover {
    background: var(--dark-black);
    border-color: var(--dark-black);
    color: white;
  }
  &:last-child:hover {
    color: white;
  }
  &:last-child {
    border-color: var(--secondary-color);
    box-shadow: 5px 5px var(--secondary-color);
  }
  &:hover {
    background: var(--secondary-color);
    border-color: var(--secondary-color);
    color: var(--dark-black);
    box-shadow: 0px 0px var(--dark-black);
  }
}

@media (max-width: 992px) {
  .header {
    padding-top: 45px;
  }

  .header .header__title {
    position: absolute;
    top: 0;
    padding: 0;
    line-height: 45px;
    font-size: 19px;
  }

  .header__button {
    box-shadow: none!important;
    font-size: 13px;
    font-weight: 600;
    margin: 4px;
    padding: 6px 12px;

    &:hover {
      background: var(--dark-black);
      border-color: var(--dark-black);
      color: white;
    }
  }
}
</style>
