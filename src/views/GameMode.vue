<template>
    <div id="gameMode">
        <div class="centeredModal" v-if="!isConnected">
            <div class="innerModal">
                <h1 class="bold">Connect to the board</h1>
                <p>To go further, you need to connect to the board via bluetooth.</p>
                <div class="modalButton" @click="connectToESP">Connect</div>
                <div @click="passBleVerif">Debug</div>
            </div>
        </div>
        <div id="touchMode" class="mode" @click="goTouchMode">
            <img src="../assets/icons/touch.png" alt="touchMode">
        </div>
        <div id="gyroMode" class="mode" @click="goGyroMode">
            <img src="../assets/icons/gyro.png" alt="gyroMode">
        </div>
    </div>
</template>

<script>
import BluetoothManager from '../class/manager/BluetoothManager'
import { mapGetters, mapActions } from 'vuex'
import Notification from '../class/model/Notification'
//import AchievementManager from '../class/manager/AchievementManager'
//import store from '../store'

export default {
    name: 'GameMode',
    data() {
        return {
            isConnected: false,
            bleManager: null
        }
    },
    methods: {
        goTouchMode() {
            this.$router.push('touchmode')
            //this.setAchievements(AchievementManager.getAllSerializeAchievements())
            //console.log(AchievementManager.processAchievement('time', null, 50))
            //AchievementManager.processAchievement('time', null, 50)
            //console.log(this.getAchievements)
        },
        goGyroMode() {
            //this.$router.push('gyromode')
            this.getNotificationManager.addNotification(new Notification('error', 'Score saved', 'Your score has been saved'))
        
        },       
        connectToESP() {
            this.bleManager.connect()
            .then(() => {
                console.log(this.bleManager.getDeviceName() + ' is connected')
                this.isConnected = true
                this.setBleManager(this.bleManager)
            })
        },
        passBleVerif() {
            this.isConnected = true
        },
        ...mapActions([
            'setBleManager',
            'setAchievements'
        ])
    },
    mounted() {
        const manager = this.getBleManager
        if(manager) {
            this.bleManager = manager
            return
        }
        this.bleManager = new BluetoothManager()
    },
    computed: {
        ...mapGetters([
            'getBleManager',
            'getNotificationManager',
            'getAchievements'
        ])
    }
}
</script>

<style lang="stylus" scoped>
    .mode
        position absolute
        left 0%
        height 50%
        width 100%

        img 
            position absolute
            top 50%
            left 50%
            transform translate3d(-50%,-50%,0)

    #touchMode
        top 0px
        border-bottom 2px solid #fff

    #gyroMode
        bottom 0px
</style>