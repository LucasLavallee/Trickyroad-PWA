<template>
    <div id="gameMode">
        <div id="connectionModal" v-if="!isConnected">
            <div id="innerModal">
                <h1 class="bold">Connect to the board</h1>
                <p>To go further, you need to connect to the board via bluetooth.</p>
                <div id="connectButton">Connect</div>
            </div>
        </div>
        <div id="touchMode" class="mode" @click="goTouchMode">
            <img src="../assets/icons/touch.png" alt="touchMode">
        </div>
        <div id="gyroMode" class="mode" @click="goGyroMode">
            <img src="../assets/icons/gyro.png" alt="gyroMode">
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameMode',
    data() {
        return {
            isConnected: false
        }
    },
    methods: {
        goTouchMode() {
            this.$router.push('touchmode')
        },
        goGyroMode() {
            this.$router.push('gyromode')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .mode
        position absolute
        left 0%
        height 50%
        width 100%

        img 
            position absolute
            top 50%
            left 50%
            transform translate3d(-50%,-50%,0)

    #touchMode
        top 0px
        border-bottom 2px solid #fff

    #gyroMode
        bottom 0px

    #connectionModal
        z-index 2
        position fixed
        top 0px
        left 0px
        height 100%
        width 100%
        background-color rgba(0,0,0,0.8)

    #innerModal
        position absolute
        width 80%
        top 50%
        left 50%
        transform translate3d(-50%,-50%,0)
        color #000
        background #fff
        border-radius 15px
        padding 10px

        h1
            font-size 20px

    #connectButton
        width 150px
        background #954f43
        margin auto
        color #fff
        padding 15px
        border-radius 10px
        cursor pointer
</style>