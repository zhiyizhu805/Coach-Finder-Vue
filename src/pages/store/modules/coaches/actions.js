export default {
    // 1. registerCoach action: sending data to firebase
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId
      console.log('userId',userId)
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        areas: data.areas,
        description: data.desc,
        hourlyRate: data.rate,
      };
      
      //(auth1) need to access rootGetters to get the token
      const token = context.rootGetters.token
      
      //(auth2) add query parameter with the token for authentication
      const response = await fetch(`https://data-c0854-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=`+token, {
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
    async loadCoaches(context,payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) return
        // fetch all coaches from firebase
        const response = await fetch(`https://data-c0854-default-rtdb.firebaseio.com/coaches.json`)
        const responseData = await response.json()

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!')
            throw error
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
        //(4.2) 
        context.commit('setFetchTimestamp')

  }}
  