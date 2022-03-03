<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'styles/main.scss';
#app {
  background: var(--primary-color);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // &::after,
  // &::before {
  //   content: "";
  //   background: url('./assets/face-bg-right.svg') no-repeat right center / contain;
  //   display: block;
  //   position: absolute;
  //   height: 100%;
  //   width: 100%;
  //   top: 0;
  //   left: 0;
  //   pointer-events: none;
  //   z-index: 0;
  // }
  // &::before {
  //   content: "";
  //   background: url('./assets/face-bg-left.svg') no-repeat left center / contain;
  // }
}
</style>
