export default{
    setUser(state, payload){
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
    },
    //(auto logout4.2) set mutation to set didAutoLogout state to true 
    setAutoLogout(state){
        state.didAutoLogout = true;
    }
}