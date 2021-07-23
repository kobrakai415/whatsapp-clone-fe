
const activeChat = {
    get value() {
        return sessionStorage.getItem('ACTIVE_CHAT')
    },
    set (newValue) {
        sessionStorage.setItem('ACTIVE_CHAT', newValue)
    }
}

export default activeChat