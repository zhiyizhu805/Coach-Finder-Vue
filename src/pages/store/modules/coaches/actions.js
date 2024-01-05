export default {
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        areas: data.areas,
        description: data.desc,
        hourlyRate: data.rate,
      };
  
      const response = await fetch(`https://data-c0854-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
        method: 'PUT', //PUT means to override the existing data if it exists// POST means to add new data
        body: JSON.stringify(coachData),
      })
      //   const responseData = await response.json()
        if(!response.ok) {
          throw new Error("Failed to register coach")
        }
      context.commit('registerCoach', {
          ...coachData,
          id: userId});
    },
  };
  