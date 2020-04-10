<template>
    <div id="countdown" :class="countdown === 0 ? 'hidden' : ''">
        <h2>STARTING IN</h2>
        <p id="countdownValue">{{countdown}}</p>
    </div>
</template>

<script>
export default {
    name: 'countdown',
    data() {
        return {
            interval: null,
            countdown: null
        }
    },
    methods: {
        startCountdown() {
            this.interval = setInterval(() => {
                this.decreaseTime()
            }, 1000)
        },
        decreaseTime() {
            this.countdown--
            if(this.countdown <= 0) {
                clearInterval(this.interval)
                this.$emit('countdownEnd')
            }
        }
    },  
    mounted() {
        this.countdown = 5
        this.startCountdown()
    }
}
</script>

<style lang="stylus">
    #countdown 
        position fixed
        top 50%
        left 50%
        transform translate3d(-50%,-50%,0)
        z-index 2
        color #e9ff00
        width 100%
        background rgba(255,255,255,0.5)

        &.hidden
            display none

        h2
            font-size 2em

        p 
            font-weigth bold
            font-size 6em
            margin 0
</style>