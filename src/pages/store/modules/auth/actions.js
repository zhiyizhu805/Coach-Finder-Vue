// add a global variable to store the timer
let timer;

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
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser',{
            token: null,
            userId: null,
        })
    },
    //(auto logout4.1) if its auto logout,we need to redirect user after auto logout happens 
    // so user dont stay on protected page
    autoLogout(context){
        context.dispatch('logout');
        context.commit('setAutoLogout');
    },
    // (auto login 2) check if we have a token and userId in local storage
    // if we do, we can auto login
    tryLogin(context){
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn < 0){
            return;
        }
        timer =  setTimeout(function(){
            context.dispatch('autoLogout')
        },expiresIn)

        if(token && userId){
            context.commit('setUser',{
                token: token,
                userId: userId,
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

        //(auto logout 1)get current time and calculate expiration date in milliseconds
        // const expiresIn = 5000
        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        //(auto login 1) store data in local storage in case of page refresh
        localStorage.setItem('token',responseData.idToken);
        localStorage.setItem('userId',responseData.localId);
        //(auto logout 2) store expiration date in local storage
        localStorage.setItem('tokenExpiration',expirationDate);

        //(auto logout 3) set timer to logout user when token expires
        timer = setTimeout(function(){
            // context.dispatch('logout')

            //(auto logout4.3) call autoLogout action instead of logout
            context.dispatch('autoLogout')

        },expiresIn)

        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
        })
        }
}