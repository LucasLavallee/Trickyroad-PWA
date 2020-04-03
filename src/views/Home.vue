<template>
  <div class="home">
    <header>
      <img src="../assets/icons/info.png" alt="info" class="icons icons_top">
      <img src="../assets/icons/speaker.png" alt="soundOn" class="icons icons_top" v-if="getCurrentConfig.sound">
      <img src="../assets/icons/mute.png" alt="soundOff" class="iconsicons_top" v-if="!getCurrentConfig.sound">
    </header>
    <div id="mainHome">
      <h1>TRICKYROAD</h1>
      <canvas ref="canvas"/>
      <!--<img src="../assets/img/map.png" alt="map">-->
      <div id="playButton" @click="goToGameMode">
        <p>Play</p>
      </div>
    </div>
    <footer>
      <img src="../assets/icons/badge.png" alt="badge" class="icons icons_bottom" @click="goToProfile">
      <img src="../assets/icons/ladder.png" alt="ladder" class="icons icons_bottom" @click="goToLeaderboard">
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import ThreeJsController from './ThreeJsController'
import gsap from 'gsap'

export default {
  name: 'Home',
  data() {
    return {
      threeJsController: null,
      info: 'aaa'
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentConfig'
    ])
  },
  methods: {
    goToGameMode() {
      const self = this
      this.fadeOut(() => {self.$router.push('gamemode')})
    },
    goToProfile() {
      this.$router.push('profile')
    },
    goToLeaderboard() {
      this.$router.push('leaderboard')
    },
    fadeOut(callback) {
      const fadeTimeline = gsap.timeline({onComplete: callback})
      fadeTimeline.to('.icons_top', {y: -200, duration: 0.5}, 0.1)
      fadeTimeline.to('.icons_bottom', {y: 200, duration: 0.4}, 0.2)
      fadeTimeline.to('h1', {y: -500, duration: 0.3}, 0.3)
      fadeTimeline.to('#playButton', {y: 500, duration: 0.2}, 0.4)
      fadeTimeline.to(this.$refs.canvas, {scale: 0, duration: 0.1}, 0.5)
    }
  },
  components: {
  },
  mounted() {
    this.threeJsController = new ThreeJsController(this.$refs.canvas)
    this.threeJsController.init(() => {
      this.timeline = gsap.timeline()
      this.timeline.to('.icons_top', {y: -200, duration: 0}, 0)
      this.timeline.to('.icons_bottom', {y: 200, duration: 0}, 0)
      this.timeline.to(this.$refs.canvas, {scale: 0, duration: 0}, 0)
      this.timeline.to('h1', {y: -500, duration: 0}, 0)
      this.timeline.to('#playButton', {y: 500, duration: 0}, 0)

      this.timeline.to('.icons_top', {y: 0, ease: 'back', stagger:{each: 0.05}, duration: 0.6}, 0.1)
      this.timeline.to('.icons_bottom', {y: 0, ease: 'back', stagger:{each: 0.05}, duration: 0.6}, 0.3)
      this.timeline.to('h1', {y: 0, ease: 'back', duration: 0.6}, 0.6)
      this.timeline.to('#playButton', {y: 0, ease: 'back', duration: 0.6}, 0.6)
      this.timeline.to(this.$refs.canvas, {scale: 1, ease: 'back', duration: 0.6}, 1.1)
    })
  }
}
</script>

<style lang="stylus" scoped>
  .home
    overflow hidden
  header
    position fixed
    top 20px
    left 10%
    display flex
    justify-content space-between
    width 80%
    box-sizing content-box
  .icons
    cursor pointer

  #mainHome
    position fixed
    top 50%
    left 50%
    transform translate3d(-50%,-50%,0)
    display flex
    flex-direction column
    align-items center
    width 100%
    max-width 700px

    img 
      width 110%

  #playButton
    background-color #C9C9C9
    color #954F43
    font-size 2.5em
    font-weight bold
    width 50%
    border-radius 15px
    cursor pointer

    p
      margin 0
      padding 5px 20px
  canvas
    width 100%
    background-color:rgba(0,0,0,0)
    transform: scale(0)

  footer 
    position fixed
    bottom 20px
    margin auto
    left 50%
    transform translate3d(-50%,0,0)
    img 
      padding 0 15px

</style>
