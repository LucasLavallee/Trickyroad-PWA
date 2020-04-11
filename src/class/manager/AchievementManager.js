/* eslint-disable */

import allAchievements from '../../assets/badges.json'
import Notification from '../model/Notification'
import store from '../../store'

export default class AchievementManager {
    static getAllSerializeAchievements() {
        const achievements = Object.keys(allAchievements.badgesDetails)
        let serializedAchievements = {}

        for(let i = 0; i < achievements.length; i++) {
            serializedAchievements[achievements[i]] = {
                type: allAchievements.badgesDetails[achievements[i]].type,
                data: null,
                success: false
            }
        }

        return serializedAchievements
    }

    static notifyAchievements(achievements) {
        for(let i = 0; i < achievements.length; i++) {
            store.getters.getNotificationManager.addNotification(new Notification('achievement','Badge obtained', allAchievements.badgesDetails[achievements[i]].descr, allAchievements.badgesDetails[achievements[i]].filename))
        }
    }

    static processAchievement(type, name, data) {
        let cachedAchievements = {...store.state.achievements}
        let achievementSuccess = [] // contain reached achievements
        const timingAchievement = ['30s','1min','2min','3min']

        switch(type) {
            case 'time':
                //In this case : data = timer (ex: 200)
                for (let i = 0; i < timingAchievement.length; i++) {
                    if (cachedAchievements[timingAchievement[i]]) {
                        const prevState = cachedAchievements[timingAchievement[i]].success
                        const currentValue = cachedAchievements[timingAchievement[i]].data ? cachedAchievements[timingAchievement[i]].data : data 
                        
                        const bestTime = data < currentValue.data ? data : currentValue
                        
                        const newState = bestTime <= allAchievements.badgesDetails[timingAchievement[i]].condition
                        
                        cachedAchievements[timingAchievement[i]] = { 
                            ...cachedAchievements[timingAchievement[i]],
                            data: bestTime,
                            success: newState
                        }

                        //New achievement unlocked !
                        if(!prevState && newState) { achievementSuccess.push(timingAchievement[i]) }
                    } 
                }

                break;

            case 'count':
                if(!cachedAchievements[name]) return
                const current = cachedAchievements[name]
                const prevState = current.success

                const newCount = current.data ? current.data + 1 : 1
                const newState = newCount >= allAchievements.badgesDetails[name].condition

                cachedAchievements[name] = {
                    ...current,
                    data: newCount,
                    success: newState
                }

                if(!prevState && newState) achievementSuccess.push(name)

                break;
            
            case 'toggle': //true or false
                if(!cachedAchievements[name]) return

                const currentAch = cachedAchievements[name]
                const previousState = currentAch.success

                const newVal = data
                const nowState = data === allAchievements.badgesDetails[name].condition

                cachedAchievements[name] = {
                    ...currentAch,
                    data: newVal,
                    success: nowState
                }

                if(!previousState && nowState) achievementSuccess.push(name) 
                break;

            default:
                break;
        }

        AchievementManager.notifyAchievements(achievementSuccess)
        return cachedAchievements
    }
}