<template>
    <div id="ladder">
        <div class="ladderEntry" v-for="(score, index) in scores" :key="index" @click="navigateTo('profile', score.user)">
            <p>{{score.rank}}</p>
            <p class="bold">{{score.user}}</p>
            <p>{{score.value}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ladder',
    props: ['scores'],
    methods: {
        navigateTo(dest, props) {
            this.$router.push('/'+dest+'/'+props)
        }
    }
}
</script>

<style lang="stylus">
    #ladder
        background rgba(0,0,0,0.6)
        border-radius 20px
        width 80%
        margin  20px auto
        padding 15px
        box-sizing content-box

    .ladderEntry
        display grid
        grid-template-columns: 10% 45% 45%
</style>