<template>
  <ul
    class="company-selector__list"
    :class="{
      'company-selector__list--loading': isLoading
    }"
  >
    <p
      v-if="items.length <= 0"
      class="company-selector__empty"
      v-text="$t('NO_RESULT')"
    />
    <company-list-item
      v-for="item in items"
      :key="item.objectID"
      :item="item"
      :class="{
        'company-selector__item--selected': (item.user_uid === selectedCompanyId),
      }"
      @click.native="setSelectedCompany(item)"
    />
  </ul>
</template>

<script>
import CompanyListItem from './CompanyListItem.vue';

export default {
  name: "CompanyList",
  props: {
    items: {
      type: Array,
      required: true
    },
  },
  components: {
    CompanyListItem,
  },
  data() {
    return {
      selectedCompanyId: null,
      selectHelperText: '',
      isLoading: false,
    }
  },
  methods: {
    setSelectedCompany(item) {
      this.selectedCompanyId = item.user_uid;
      this.$emit('set-selected-company', item);
    },
  },
};
</script>

<style lang="scss" scoped>
.company-selector__list {
  background: white;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-height: 200px;
  transition: max-height .3s;
  text-indent: 0px;
  margin: 0;
  padding: 0;

  transition: max-height .8s;
}

.company-selector__empty {
  padding: 10px 20px;
  opacity: .3;
  margin: 0;
}


.company-selector__list--loading {
  position: relative;
  pointer-events: none;
  overflow: hidden;
  min-height: 60px;
  text-indent: -9999px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -12px;
    margin-left: -12px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: var(--dark-black);
    animation: spinner .6s linear infinite;
  }

  > .company-selector__item {
    display: none;
  }
}
</style>
