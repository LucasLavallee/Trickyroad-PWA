<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<style lang="stylus">
html
  background url('./assets/img/background.jpg') no-repeat center center fixed
  background-size cover
  height 100%


#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  margin-top 60px
  color #fff

.bold
  font-weight bold

.icons
  width 35px
  height 35px


.exitIcon
  z-index 5
  background rgba(255,255,255,0.8)
  border-radius 50px
  padding 10px
  position fixed
  bottom 30px
  left 50%
  transform translate3d(-50%,0,0)
  cursor pointer

.centeredModal
  z-index 2
  position fixed
  top 0px
  left 0px
  height 100%
  width 100%
  background-color rgba(0,0,0,0.8)

.modalButton
  width 150px
  background #954f43
  margin auto
  color #fff
  padding 15px
  border-radius 10px
  cursor pointer

.innerModal
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
</style>
