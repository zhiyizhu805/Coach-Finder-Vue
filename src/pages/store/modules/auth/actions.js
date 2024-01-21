export default{
//     async login(context,payload){
//         const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1qPBUktnkUOD3ujTeQmOL2aa8ZjEgoYg',{
//             method: 'POST',
//             body: JSON.stringify({
//                 email: payload.email,
//                 password: payload.password,
//                 returnSecureToken: true
//             })
//         })
//         const responseData = await response.json();
//         console.log(responseData)
//         if (!response.ok){
//             const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
//             throw error;
//         }
//         context.commit('setUser',{
//             token: responseData.idToken,
//             userId: responseData.localId,
//             tokenExpiration: responseData.expiresIn
//         })
//         },
//    async signup(context,payload){
//     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1qPBUktnkUOD3ujTeQmOL2aa8ZjEgoYg',{
//         method: 'POST',
//         body: JSON.stringify({
//             email: payload.email,
//             password: payload.password,
//             returnSecureToken: true
//         })
//     })
//     const responseData = await response.json();
//     console.log(responseData)
//     if (!response.ok){
//         const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
//         throw error;
//     }
//     console.log(responseData);
//     context.commit('setUser',{
//         token: responseData.idToken,
//         userId: responseData.localId,
//         tokenExpiration: responseData.expiresIn
//     })
//     },
    logout(context){
        context.commit('setUser',{
            token: null,
            userId: null,
            tokenExpiration: null
        })
    },
    tryLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if(token && userId){
            context.commit('setUser',{
                token: token,
                userId: userId,
                tokenExpiration: null
            })
        }},
    //refactor login and signup
    async login(context,payload){
        return context.dispatch('auth',{
            ...payload,
            mode: 'login'
        })
    },
    async signup(context,payload){
        return context.dispatch('auth',{
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context,payload){
        const mode = payload.mode;
        const url = mode === 'login' ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1qPBUktnkUOD3ujTeQmOL2aa8ZjEgoYg' : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1qPBUktnkUOD3ujTeQmOL2aa8ZjEgoYg';
        const response = await fetch(url,{
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
            const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
            throw error;
        }
        //(auto login 1) store data in local storage in case of page refresh
        localStorage.setItem('token',responseData.idToken);
        localStorage.setItem('userId',responseData.localId);
        localStorage.setItem('tokenExpiration',responseData.expiresIn);


        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
        }
}