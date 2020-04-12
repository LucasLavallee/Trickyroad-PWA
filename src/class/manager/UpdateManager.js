import db from '../../../base'
import store from '../../store'

export default class UpdateManager {
    constructor() {
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


    //Push cached achievements updates
    static async pushAchievementsUpdate () {
        const currentPushRequest = store.getters.getPushUpdateRequest

        if(!currentPushRequest.achievements) return
        if(!UpdateManager.isConnected()) {return}
        const pseudo = store.getters.getPseudo
        const achievements = store.getters.getAchievements

        let updates = {}
        updates[`usersPWA/${pseudo}/badges`] = achievements
        const res = await db.ref().update(updates)

        return res
    }

    // Push cached games updates
    static pushGamesUpdate () {
        const currentPushRequest = store.getters.getPushUpdateRequest

        if(!currentPushRequest.games) return
    }

    /*
        Pulling updates
    */

    // Pull all firebase updates
    static pullUpdate () {
        this.pullLeaderboardUpdate()
    }

    //Pull firebase leaderboard updates
    static pullLeaderboardUpdate () {

        this.setLastUpdateTime(true, false)
    }


}