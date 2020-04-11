import db from '../../../base'
import store from '../../store'

export default class UpdateManager {
    constructor() {
        this.status = 'pending'
        this.needPushUpdate = {
            achievements: false,
            games: false
        }
    }

    static isConnected() {
        return navigator.onLine
    }

    setLastUpdateTime (/*achievement, games*/) {
        /*const newUpdateTime = {
            achievements: achievement ? new Date() : 'previous value',
            games: games ? new Date() : 'previous value'
        }*/
    }

    /*
        Pushing updates
    */

    // Push all cached updates
    pushUpdate () {
        this.pushAchievementsUpdate()
        this.pushGamesUpdate()
    }

    //Push cached achievements updates
    pushAchievementsUpdate () {
        if(!UpdateManager.isConnected()) {return}
        const pseudo = store.getters.getPseudo
        const achievements = store.getters.getAchievements

        let updates = {}
        updates[`usersPWA/${pseudo}/badges`] = achievements
        db.ref().update(updates,(error) => {
            if (error) {
                console.log(error)
            } else {
                console.log('success')
            }
        })
    }

    // Push cached games updates
    pushGamesUpdate () {

    }

    /*
        Pulling updates
    */

    // Pull all firebase updates
    pullUpdate () {
        this.pullLeaderboardUpdate()

        this.setLastUpdateTime(true, true)
    }

    //Pull firebase leaderboard updates
    pullLeaderboardUpdate () {

        this.setLastUpdateTime(true, false)
    }


}