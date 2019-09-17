<template>
    <div class="backPage">
        <div class="arrow" @click="goBack"></div>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
export default {
    props:['title'],
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style/backPage.scss';
</style>


