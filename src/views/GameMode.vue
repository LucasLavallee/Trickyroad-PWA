<template>
    <div id="gameMode">
        <h1>Game mode</h1>
        <p @click="connectToESP">CONNECT</p>
        <p @click="send">SEND DATA</p>
    </div>
</template>

<script>
import BluetoothManager from '../class/bluetooth/BluetoothManager'

export default {
    name: 'GameMode',
    data() {
        return {
            bleManager: null
        }
    },
    methods: {
        connectToESP() {
            this.bleManager.connect()
                .then(() => {
                    console.log(this.bleManager.getDeviceName() + ' is connected')
                })

        },
        send() {
            this.bleManager.send("0,0")
        }
    },
    mounted() {
        this.bleManager = new BluetoothManager()
        this.bleManager.receive = (data) => {
            console.log("RECEIVING")
            console.log(data)
        }
    }
}
</script>