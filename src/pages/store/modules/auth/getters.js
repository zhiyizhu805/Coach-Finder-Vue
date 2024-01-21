export default {
    userId(state){
        return state.userId;
    },
    token(state){
        return state.token;
    },
    // (Update UI based on Auth state 1)
    isAuthenticated(state){
        // !! converts to boolean
        // if we have a token, we are authenticated
        // if we don't have a token, we are not authenticated
        return !!state.token;
    },
    //(auto logout4.4)since we need to watch the state in app.vue, we need to add a getter 
    didAutoLogout(state){
        return state.didAutoLogout;
    }
}