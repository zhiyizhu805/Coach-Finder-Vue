export default{
    async login(context,payload){
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1qPBUktnkUOD3ujTeQmOL2aa8ZjEgoYg',{
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json();
        console.log(responseData)
        if (!response.ok){
            console.log(responseData);
            const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
            throw error;
        }
        console.log(responseData);
        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
        },
   async signup(context,payload){
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1qPBUktnkUOD3ujTeQmOL2aa8ZjEgoYg',{
        method: 'POST',
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        })
    })
    const responseData = await response.json();
    console.log(responseData)
    if (!response.ok){
        console.log(responseData);
        const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
        throw error;
    }
    console.log(responseData);
    context.commit('setUser',{
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
    })
    },
    logout(context){
        context.commit('setUser',{
            token: null,
            userId: null,
            tokenExpiration: null
        })
    }
    
}