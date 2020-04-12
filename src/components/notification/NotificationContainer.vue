<template>
    <div id="notificationContainer">
        <Notification 
            v-if="getNotificationManager && getNotificationManager.getCurrentNotification()"
            :data="getNotificationManager.getCurrentNotification().serialize()"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NotificationManager from '../../class/manager/NotificationManager'
import Notification from './Notification'

export default {
    name: 'NotificationContainer',
    components: {
        Notification
    },
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions([
            'setNotificationManager'
        ])
    },
    computed: {
        ...mapGetters([
            'getNotificationManager'
        ])
    },
    mounted() {
        if(this.getNotificationManager) {
            return 
        }

        const notifManager = new NotificationManager()
        this.setNotificationManager(notifManager)   
    }
}
</script>

<style lang="stylus">
    #notificationContainer
        position fixed
        top 0px
        left 0px
        z-index 4
        width 100%
</style>