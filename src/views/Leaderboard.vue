<template>
    <div id="leaderboard">
        <h1>Leaderboard</h1>
        <input type="text" placeholder="Search player ..." @keyup="searchPlayer" id="searchInput">
        <Ladder
            :scores="scores"
        />
        <img src="../assets/icons/home.png" alt="backHome" class="icons exitIcon" id="backHome" @click="$router.push('/')">
    </div>
</template>

<script>
import Ladder from '../components/Ladder'
import db from '../../base'

export default {
    name: 'leaderboard',
    data() {
        return {
            users: null,
            scores: [],
            allBestScores: []
        }
    },
    components: {
        Ladder
    },
    methods: {
        searchPlayer(event) {
            const searchValue = event.target.value
            const resArr = this.allBestScores.filter((score) => {
                return score.user.toUpperCase().includes(searchValue.toUpperCase())
            })
            this.scores = resArr 
        }
    },
    firebase: {
        users: db.ref('users')
    },
    watch: {
        users: {
            handler () {
                console.log(this.users)
                const keys = Object.keys(this.users)
                let allScore = []

                for(let i = 0; i < keys.length; i++) {
                    if(this.users[keys[i]].bestScore)
                        allScore = allScore.concat(this.users[keys[i]].bestScore)
                }

                allScore = allScore.sort((a,b) => a.value > b.value)
                for(let j=0; j<allScore.length; j++) {
                    let date = new Date(0)
                    date.setSeconds(parseInt(allScore[j].value)) // specify value for SECONDS here
                    let timeString = date.toISOString().substr(14, 5)
                    allScore[j].value = timeString
                    allScore[j].rank = j + 1
                }
                this.allBestScores = allScore
                this.scores = allScore
            }
        }
  },
}
</script>

<style lang="stylus">
    #searchInput
        background rgba(0,0,0,0.6)
        color inherit
        width 80%
        padding 15px
        border-radius 15px
        border none

    .exitIcon
        background rgba(255,255,255,0.8)
        border-radius 50px
        padding 10px
        position fixed
        bottom 30px
        left 50%
        transform translate3d(-50%,0,0)
</style>