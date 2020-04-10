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
import BluetoothManager from '../class/bluetooth/BluetoothManager'
import { mapGetters, mapActions } from 'vuex'

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
        },
        goGyroMode() {
            this.$router.push('gyromode')
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
            'setBleManager'
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
            'getBleManager'
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