<template>
    <div id="touchmode">
        <header>
            <p id="timing" class="bold">{{ currentTime }}</p>
            <img src="../assets/icons/touch.png" alt="touchModeIcon">
        </header>
        <canvas ref="canvas"/>
    </div>
</template>

<script>
import ThreeJsController from './ThreeJsController'

export default {
    name: 'Touchmode',
    data() {
        return {
            currentTime: '--:--',
            threeJsController: null
        }
    },
    mounted() {
        this.threeJsController = new ThreeJsController(this.$refs.canvas)
        this.threeJsController.init(() => {
        })
    }
}
</script>

<style lang="stylus" scoped>
    #touchmode
        width 100%

    header
        position relative
        display flex
        flex-direction column
        img
            position absolute
            right 20px
            top 50%
            transform translate3d(0,-50%,0)
            height 40px
            
    #timing
        font-size 20px


    canvas
        width 100%
        transform translate(0px, 0px)
</style>