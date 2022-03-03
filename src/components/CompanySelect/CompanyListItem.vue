<template>
  <li
    class="company-selector__item"
  >
    <img :src="getImage" :alt="item.name">
    <p>{{ item.name }}</p>
  </li>
</template>

<script>

export default {
  name: 'CompanyItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getImage() {
      return (this.item.photo_url) ? this.item.photo_url : require('@/assets/user.png');
    },
  },
  methods: {
    setSelectedCompany(item) {
      this.$emit('set-selected-company', item);
    }
  },
}
</script>

<style lang="scss" scoped>
.company-selector__item {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--light-gray);
  cursor: pointer;
  transition: all .3s;
  position: relative;

  &:hover {
    background: rgba(0, 0, 0, .01);
  }

  p {
    margin: 0;
    padding-left: 15px;
  }

  img, svg {
    max-width: 25px;
    height: 25px;
    display: block;
  }

  figure {
    margin: 0;
  }
}

.company-selector__item--selected {
  background: var(--dark-black);
  color: white;

  &:hover {
    background: var(--dark-black);
  }

  &:after {
    content: "";
    width: 62px;
    height: 100%;
    position: absolute;
    background-color: white;
    right: 0;
    -webkit-mask: url('../../assets/check.svg');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 28px 28px;
  }

  img {
    border-radius: 100%;
  }
}
</style>
