export default {
    // 1. registerCoach action: sending data to firebase
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

      //(3.1) error handling
        if(!response.ok) {
          const error = new Error(response.message || 'Failed to fetch!')
          throw error
        }
      context.commit('registerCoach', {
          ...coachData,
          id: userId});
    },

    //3. loadCoaches action: fetching data from firebase
    async loadCoaches(context) {
        // fetch all coaches from firebase
        const response = await fetch(`https://data-c0854-default-rtdb.firebaseio.com/coaches.json`)
        const responseData = await response.json()

        if (!response.ok) {
            //error handling
        }

        const coaches = []

        // organize the data from firebase
        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
            }
            coaches.push(coach)
        }

        // commit the data to the state
        context.commit('setCoaches', coaches)

  }}
  