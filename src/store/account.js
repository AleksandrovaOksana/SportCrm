import axios from 'axios'
export default{
    actions: {
        async getAccount(context) {
            try{
                const config = await context.getters.configRequestHeaders
                const user = await context.getters.user
                console.log(user)
                const result = await axios.get(process.env.VUE_APP_BACKEND_API+'account/' + user.id, config)
                context.commit('setAccount', result.data.account)
                return result.data.account

            } catch(e){console.log(e)}
        }
    }

}
