<template>
    <div id="profile">
        <header>
            <img src="../assets/icons/back.png" alt="return" class="icons" @click="$router.go(-1)">
            <h1>{{this.$route.params.user}}</h1>
        </header>
        <section id="quickInfoContainer">
            <div class="quickInfo">
                <h2>Best Score</h2>
                <p class="bold">{{bestTime ? bestTime : '--:--'}}</p>
            </div>
            <div class="quickInfo">
                <h2>Last Game</h2>
                <p class="bold">{{lastPlay ? lastPlay : '--/--'}}</p>
            </div>
        </section>
        <BadgesList 
            :badges="badges"
            v-if="badges && badges.length != 0"
        />
        <h2>Last scores</h2>
        <Ladder
            :scores="lastScores"
        />
    </div>
</template>

<script>
import db from '../../base'
import BadgesList from '../components/BadgesList'
import Ladder from '../components/Ladder'
import { mapGetters } from 'vuex'

export default {
    name: 'profile',
    props: ['user'],
    components: {
        BadgesList,
        Ladder
    },
    data() {
        return {
            infos: null,
            bestTime: null,
            lastPlay: null,
            lastScores: [],
            badges: null
        }
    },
    methods: {
        parseScore(value) {
            if(!value) return '--:--'

            let date = new Date(0)
            date.setSeconds(parseInt(value)) // specify value for SECONDS here
            return date.toISOString().substr(14, 5)
        },
        parseTime(date) {
            let playDate = new Date(date)
            return (playDate.getDate() < 10 ? '0'+ playDate.getDate() : playDate.getDate()) +'/'+ (playDate.getMonth()+1 < 10 ? '0'+(playDate.getMonth()+1) : playDate.getMonth()+1)
        }
    },
    computed: {
        ...mapGetters([
            'getPseudo',
            'getAchievements'
        ])
    },
    created() {
        const user = this.$route.params.user

        if(user) {
            db.ref('/usersPWA/' + user).once('value').then((snapshot) => {
                const datas = snapshot.val()
                
                if(datas.scores) {
                    let sortedByDate = datas.scores.sort((a, b) => {
                        const dateA = new Date(a.date)
                        const dateB = new Date(b.date)
                        return dateB - dateA
                    })

                    sortedByDate.map(score => {
                        score.rank = this.parseTime(score.date)
                        score.value = this.parseScore(score.value)
                    })
                    this.lastScores = sortedByDate
                }

                this.infos = datas
                this.bestTime = datas.bestScore ? this.parseScore(datas.bestScore.value) : null
                this.lastPlay = datas.lastGame ? this.parseTime(datas.lastGame) : null
                
                this.badges = (this.getPseudo === user) ? this.getAchievements : (datas.badges ? datas.badges : [])
           });
        }
    }
}
</script>

<style lang="stylus" scoped>
    h2
        font-size 1.2em

    header
        position relative
        width 80%
        margin auto
        
        img 
            position absolute
            left 0
            cursor pointer

    #quickInfoContainer
        margin-top 40px
        display flex
        justify-content  space-around

    .quickInfo
        p
            color #FFF737
            font-size 2em
            margin 0
        h2
            margin 5px

</style>