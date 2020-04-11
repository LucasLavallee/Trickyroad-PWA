<template>
    <div>
        <section id="result">
            <h1 class="bold">{{win ? 'Congratulations' : 'So close...'}}</h1>
            <p id="score">{{score}}</p>
        </section>
        <section id="leaderboard">
            <div id="saveScore" v-if="win" @click="saveScore">
                <p class="bold">Save your score</p>
            </div>
            <h2 class="bold">Leaderboard</h2>
            <Ladder 
                :scores="scores"
            />
        </section>
        <section id="buttons">
            <img src="../assets/icons/home.png" alt="backHome" class="icons bottomIcons" @click="$router.push('/')">
            <img src="../assets/icons/return.png" alt="return" class="icons bottomIcons" @click="goToPreviousMode">
        </section>
    </div>
</template>

<script>
import Ladder from '../components/Ladder'
import db from '../../base'
import { mapGetters } from 'vuex'
import Notification from '../class/model/Notification'

export default {
    name: 'Result',
    components: {
        Ladder
    },
    data() {
        return {
            score: null,
            win: true, 
            scores: [],
            users: null
        }
    },
    methods: {
        parseTime(time) {
            const min = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)
            const sec = time % 60 < 10 ? '0' + time % 60 : time % 60 
            return min + ':' + sec
        },
        goToPreviousMode() {
            this.$router.push('/' + this.$route.query.from)
        },
        saveScore() {
            const pseudo = this.getPseudo
            const score = this.$route.query.score
            const playerInfo = this.users[pseudo]

            const userScores = playerInfo.scores ? playerInfo.scores : []

            //Updating current player on firebase
            let updates = {}
            updates[`users/${pseudo}`] = {
                scores: [
                    ...userScores,
                    {
                        date: new Date().toString(),
                        value: score,
                        user: pseudo
                    }
                ],
                bestScore: {
                    date: new Date().toString(),
                    value: !playerInfo.bestScore ? score : ( playerInfo.bestScore > score ? playerInfo.bestScore : score),
                    user: pseudo
                },
                lastGame: new Date().toString(),
                badges: playerInfo.badges 
            }
            db.ref().update(updates,(error) => {
                if (error) {
                    this.getNotificationManager.addNotification(new Notification('error', 'Error on save', 'Your score hasn\'t been saved'))
                    this.$router.push('/')
                } else {
                    this.getNotificationManager.addNotification(new Notification('success', 'Score saved', 'Your score has been saved'))
                    this.$router.push('/')
                }
            })
            
        }
    },
    mounted() {
        this.score = this.parseTime(this.$route.query.score)
    },
    computed: {
        ...mapGetters([
            'getPseudo',
            'getNotificationManager'
        ])
    },
    firebase: {
        users: db.ref('users')
    },
    watch: {
        users: {
            handler () {
                const keys = Object.keys(this.users)
                let allScore = []

                for(let i = 0; i < keys.length; i++) {
                    if(this.users[keys[i]].bestScore)
                        allScore = allScore.concat(this.users[keys[i]].bestScore)
                }

                if(this.win) {
                    allScore.push({
                        value: this.$route.query.score,
                        user: this.getPseudo,
                        endGame: true
                    })
                }

                allScore = allScore.sort((a,b) => a.value > b.value)
                for(let j=0; j<allScore.length; j++) {
                    allScore[j].value = this.parseTime(allScore[j].value)
                    allScore[j].rank = j + 1
                }
                
                this.scores = allScore
            }
        }
    }
}
</script>

<style lang="stylus">
    #result
        h1
            font-size 2.5em
            margin 0

        #score
            font-size 3.5em
            margin 0

    #saveScore
        display inline-block
        color #623231
        background rgba(255,255,255,0.6)
        padding 10px 20px
        border-radius 50px
        font-size 1.2em
        margin-top 25px
        cursor pointer

        p 
            margin 0

    #buttons
        position fixed
        bottom 20px
        display flex
        width 100%
        justify-content center

    .bottomIcons
        background rgba(255,255,255,0.8)
        border-radius 50px
        padding 10px
        margin 0 15px
</style>