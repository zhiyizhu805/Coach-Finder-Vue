export default {
    async contactCoach(context, payload) {    
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };
        const response = await fetch(`https://data-c0854-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,{
            method: 'POST', //add a new data
            body: JSON.stringify(newRequest)
        })

        const responseData = await response.json()
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request')
            throw error
        }

        console.log('responseData',responseData)
        //for the post request, firebase will return a generated id.It auto generates an id thas posted
        newRequest.id = responseData.name; // the name field is the generated id
        newRequest.coachId = payload.coachId;
        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://data-c0854-default-rtdb.firebaseio.com/requests/${coachId}.json`)
        const responseData = await response.json()
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch requests')
            throw error
        }
        const requests = []
        for(const key in responseData){
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            requests.push(request)
        }
        context.commit('setRequests', requests)
    }
}