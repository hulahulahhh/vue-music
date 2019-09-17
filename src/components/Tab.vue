<template>
  <div class="tab">
    <div
      v-for="(item, index) in text"
      :key="index"
      :class="[{currTab: currIndex==index}]"
      @click="itemClick(index)"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      currIndex: 0
    };
  },
  methods: {
      itemClick(index) {
          this.currIndex = index;
          this.$emit('tabClick', index);
      }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/tab.scss";
</style>

