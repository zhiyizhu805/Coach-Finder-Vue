import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default{
    //keep this store global without namespacing
    state(){
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
        }
    },
    getters,
    actions,
    mutations
}