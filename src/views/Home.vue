<template>
  <div class="home">
    <header>
      <img src="../assets/icons/info.png" alt="info" class="icons">
      <img src="../assets/icons/speaker.png" alt="soundOn" class="icons" v-if="getCurrentConfig.sound">
      <img src="../assets/icons/mute.png" alt="soundOff" class="icons" v-if="!getCurrentConfig.sound">
    </header>
    <div id="mainHome">
      <h1>TRICKYROAD</h1>
      <img src="../assets/img/map.png" alt="map">
      <div id="playButton" @click="goToGameMode">
        <p>Play</p>
      </div>
    </div>
    <footer>
      <img src="../assets/icons/badge.png" alt="badge" class="icons" @click="goToProfile">
      <img src="../assets/icons/ladder.png" alt="ladder" class="icons" @click="goToLeaderboard">
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getCurrentConfig'
    ])
  },
  methods: {
    goToGameMode() {
      this.$router.push('gamemode')
    },
    goToProfile() {
      this.$router.push('profile')
    },
    goToLeaderboard() {
      this.$router.push('leaderboard')
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
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
    width 35px
    height 35px

  #mainHome
    position fixed
    top 50%
    transform translate3d(0,-50%,0)
    display flex
    flex-direction column
    align-items center

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

  footer 
    position fixed
    bottom 20px
    margin auto
    left 50%
    transform translate3d(-50%,0,0)

    img 
      padding 0 15px
</style>
