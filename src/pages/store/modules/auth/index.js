import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default{
    //keep this store global without namespacing
    state(){
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        }
    },
    getters,
    actions,
    mutations
}