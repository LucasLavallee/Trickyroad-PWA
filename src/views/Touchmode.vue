<template>
    <div id="touchmode">
        <header>
            <p id="timing" class="bold">{{ displayedTime }}</p>
            <img src="../assets/icons/touch.png" alt="touchModeIcon">
        </header>
        <div class="centeredModal" v-if="gameState === 'waiting'">
            <div class="innerModal">
                <h1 class="bold">Ready to play ?</h1>
                <div class="modalButton" @click="startCountdown">Start</div>
            </div>
        </div>
        <Countdown v-if="gameState === 'starting'" @countdownEnd="startGame"/>
        <canvas ref="canvas"/>
        <img src="../assets/icons/home.png" alt="backHome" class="icons exitIcon" @click="$router.push('/')">
    </div>
</template>

<script>
import ThreeJsController from '../class/webgl/ThreeJsController'
import Countdown from '../components/Countdown'
import { mapGetters } from 'vuex'

export default {
    name: 'Touchmode',
    components : {
        Countdown
    },
    data() {
        return {
            currentTime: 0,
            displayedTime: '00:00',
            gameState: 'waiting',
            threeJsController: null,
            bleManager: null,
            interval: null
        }
    },
    methods: {
        addWindowListeners() {
            window.addEventListener("touchmove", this.touchMoveListener)
        },
        removeListeners() {
            window.removeEventListener("touchmove", this.touchMoveListener)
        },
        touchMoveListener(e) {
            e.preventDefault()  
            this.threeJsController.setMouse({
                x: e.changedTouches[0].pageX, 
                y: e.changedTouches[0].pageY
            }) 
        },
        startCountdown() {
            this.gameState = 'starting'
        },
        startGame() {
            this.gameState = 'playing'
            this.gameEnd(Math.floor(Math.random() * (250 - 80 + 1)) + 80  ,true)
            this.interval = setInterval(() => {
                this.currentTime++
                this.displayedTime = this.parseTime(this.currentTime)
            }, 1000)
        },
        gameEnd(score, win) {
            this.$router.push({
                path: '/result', 
                query: {
                    score: score,
                    from: 'touchmode',
                    win: win
                }
            })
        },
        parseTime(time) {
            const min = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)
            const sec = time % 60 < 10 ? '0' + time % 60 : time % 60 
            return min + ':' + sec
        }
    },
    computed: {
        ...mapGetters([
            'getBleManager'
        ])
    },
    mounted() {
        this.bleManager = this.getBleManager
        if(this.bleManager) { //Already managed by middleware
            this.bleManager.receive = (data) => {
                console.log("RECEIVING")
                console.log(data)
            }
        }

        this.threeJsController = new ThreeJsController(this.$refs.canvas)
        this.threeJsController.init(() => {
        })

        this.addWindowListeners()
    },
    beforeDestroy() {
        this.removeListeners()
    }
}
</script>

<style lang="stylus" scoped>
    #touchmode
        width 100%

    header
        position fixed
        top 20px
        width 100%
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
        transform translate3d(-50%,-50%,0)
        position fixed
        top 50%
        left 50%
</style>