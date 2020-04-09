<template>
    <div id="firstConnection">
        <div id="connectionContainer">
            <h1>TRICKYROAD</h1>
            <p>Welcome to the Trickyroad app. Please enter your username in order to start playing.</p>
            <div id="inputContainer">
                <h3 class="bold">Enter your pseudo</h3>
                <input type="text" placeholder="Pseudo" id="pseudoInput" ref="pseudoInput">
                <div id="submitPseudo" @click="savePseudo">
                    <p class="bold">Save</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import db from '../../base'
import { mapActions } from 'vuex'

export default {
    name: "FirstConnection",
    data() {
        return {
            users: [],
            existingUsers: []
        }
    },
    methods: {
        savePseudo() {
            const pseudo = this.$refs.pseudoInput.value
            if(pseudo != '' && !this.existingUsers.includes(pseudo)) {
                db.ref(`users/${pseudo}`).set({
                    badges: ['firstConnection']
                })
                this.setPseudo(pseudo)
                this.$router.push('/')
            }
        },
        ...mapActions([
            'setPseudo'
        ])
    },
    firebase: {
        users: db.ref('users')
    },
    watch: {
        users: {
            handler () {
                let playersPseudos = []
                playersPseudos = this.users.map(user => user['.key'])

                this.existingUsers = playersPseudos
            }
        }
    }
}
</script>

<style lang="stylus">
    #connectionContainer
        position fixed
        top 50%
        left 50%
        width 80%
        transform translate3d(-50%,-50%,0)

    #pseudoInput
        background rgba(0,0,0,0.6)
        color inherit
        width 80%
        padding 15px
        border-radius 15px
        border none
        text-align center

    #inputContainer
        margin-top 40px
        display flex
        flex-direction column
        align-items center

    #submitPseudo
        margin-top 20px
        background-color #fff
        width 150px
        color #954F43
        border-radius 15px
</style>