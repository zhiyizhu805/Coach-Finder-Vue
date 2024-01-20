export default {
    //2. add coach to the local coaches data
    registerCoach(state, payload) {
        state.coaches.push(payload);
        console.log('statecoaches',state.coaches)
    },
    //4. set local coaches data to the data from firebase
    setCoaches(state, payload) {
        state.coaches = payload;
    },
    //(4.1) set the last fetch timestamp
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }
}