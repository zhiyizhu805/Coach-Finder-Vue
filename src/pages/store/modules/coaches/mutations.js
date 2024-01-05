export default {
    //2. add coach to the local coaches data
    registerCoach(state, payload) {
        state.coaches.push(payload);
    },
    //4. set local coaches data to the data from firebase
    setCoaches(state, payload) {
        state.coaches = payload;
    }
}