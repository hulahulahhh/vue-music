<template>
    <div class="topItem" @click="topItemClick">
        <div class="icon">
            <img :src="topItemData.picUrl" alt="">
        </div>
        <div class="text">
            <div class="name" v-for="(item, index) in topItemData.songList" :key="index">{{index}}. {{item.songname}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['topItemData'],
    methods: {
        topItemClick() {
            this.$emit('topItemClick', this.topItemData.id);
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style/topListItem.scss'
</style>

