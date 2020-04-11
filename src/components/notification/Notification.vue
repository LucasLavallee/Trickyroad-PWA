<template>
    <div id="notification" :class="data.type">
        <img v-if="data.type === 'achievement'" :src="`/badges/${data.data}.png`">
        <div>
            <h1>{{data.title}}</h1>
            <p>{{data.message}}</p>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'
import { mapGetters } from 'vuex'

export default {
    name: 'Notification',
    props: ['data'],
    data() {
        return {
            timeline: null
        }
    },
    methods: {
        animationEnd() {
            this.getNotificationManager.nextNotif()
        }
    },
    computed: {
        ...mapGetters([
            'getNotificationManager'
        ])
    },
    mounted() {
        this.timeline = gsap.timeline({
            onComplete: this.animationEnd
        })
        this.timeline.to('#notification', {y: 0, ease: 'back', duration: 0.5})
        this.timeline.to('#notification', {y: -200, ease: 'back', duration: 0.5, delay: 3})
    }
}
</script>

<style lang="stylus">
    #notification
        position absolute
        transform translate3d(-50%,-200px,0)
        top 20px
        left 50%
        width 90%
        background rgba(0,0,0,0.6)
        display flex
        text-align center
        justify-content space-around
        align-items center

        &.error
            border 4px solid #c72a1b
            justify-content center

        &.success
            border 4px solid #00a655
            justify-content center

        h1
            font-size 1.2em

        p 
            margin-top 0

        img
            width 60px
            height 60px

</style>