export default class NotificationManager {
    constructor () {
        this.notifications = [] /* Notifications container */
        this.currentNotification = null
    }

    // Clear current queue
    clearQueue () {
        this.notifications = []
    }

    // Check if queue is empty
    isEmpty () {
        return !!this.notifications.length
    }

    //Remove first notification && go to the next in queue
    nextNotif() {
        this.currentNotification = null
        this.notifications.shift()

        setTimeout(() => {
            if(this.notifications.length>0) {
                this.currentNotification = this.notifications[0]
            }
        }, 500)
    }

    // Add notification to queue
    addNotification(notification) {
        this.notifications.push(notification)
        if(!this.currentNotification) {
            this.currentNotification = notification
        }
    }

    // Display oldest notification
    displayNotification() {
        this.currentNotification = this.notifications[0] ? this.notifications[0] : null
    }

    getCurrentNotification() {
        return this.currentNotification
    }
    
}