export default class Notification {
    constructor (type, title, message, data) {
        this.type = type
        this.title = title
        this.message = message
        this.data = data
    }

    serialize() {
        return {
            type: this.type,
            title: this.title,
            message: this.message
        }
    }
}