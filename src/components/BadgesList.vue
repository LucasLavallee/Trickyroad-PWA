<template>
    <div id="badgesList">
        <h2>Badges</h2>
        <section id="badgesContainer">
            <div class="badgeCategory" v-for="(category, index) in allBadges" :key="index">
                <h3>{{category.name}}</h3>
                <div class="badges">
                    <img :src="`/badges/${badge.filename}.png`" v-for="(badge, badgeId) in category.badges" :key="badgeId" :class="badges && badges.includes(badge.name) ? 'active' : ''">              
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import existingBadges from '../assets/badges.json'

export default {
    name: 'BadgesList',
    props: ['badges'],
    data() {
        return {
            allBadges: existingBadges.badgesCategory
        }
    },
    created() {
       // console.log(this.badges)
    }
}
</script>

<style lang="stylus">
    h2
        font-size 1.2em
        
    #badgesContainer
        background rgba(0,0,0,0.6)
        text-align left 
        border-radius 20px
        width 80%
        padding 15px
        margin 20px auto

    .badges
        display flex
        justify-content space-between

        img
            width 60px
            height auto
            filter grayscale(1)
        
        .active
            filter grayscale(0)
    
    .badgeCategory
        margin 20px 0
        h3
            margin 0 0 
</style>