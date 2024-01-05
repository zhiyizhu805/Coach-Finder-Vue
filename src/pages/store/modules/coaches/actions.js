export default {
    registerCoach(context, data) {
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            areas: data.areas,
            description: data.desc,
            hourlyRate: data.rate,
        };
        context.commit('registerCoach', coachData);
    }

}