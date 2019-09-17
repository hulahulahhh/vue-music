<template>
    <div class="musicInfo" @click="detailClick">
        <img v-if="musicData.cover" :src="musicData.cover" alt="">
        <div>
            <h4>{{musicData.title || musicData.songname}}</h4>
            <p>{{musicData.username || musicData.albumdesc || musicData.albumname}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['musicData'],
    methods: {
        detailClick() {
            this.$emit('goDetail');
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style/musicInfo.scss'
</style>


