import axios from 'axios'
export default {
    actions: {
        async login(context, {email, password}){
            try{
                const result = await axios.post(process.env.VUE_APP_BACKEND_API+'auth/login', {email, password})

                await context.commit('setToken', result.data)
                const user = await context.dispatch('getUser', context.getters.configRequestHeaders)
                await context.commit('setUser', user)

            } catch (e){
                context.commit('setError', e)
                throw e
            }
        },
        async register(context, {email, password, name}) {
            try{
                const result = await axios.post(process.env.VUE_APP_BACKEND_API+'auth/register', {email, password, name})
                await context.commit('setToken', result.data)
                const user = await context.dispatch('getUser', context.getters.configRequestHeaders)
                await context.commit('setUser', user)
                await axios.post(process.env.BACKEND_API+'account/store', {total: 10000, uid: user.id}, context.getters.configRequestHeaders).then((response) => {
                    if(response.data.uid){
                        this.$message('Начальный аккаунт успешно создан')
                    }

                })
            } catch (e){
                context.commit('setError', e)
                throw e
            }

        },
        // eslint-disable-next-line no-empty-pattern
        async getUser({}, config) {
            const response = await axios.get(process.env.VUE_APP_BACKEND_API+'auth/me',config)
            const user = response.data.user
            return user ? user : null
        },
        async logout() {
            await axios.get(process.env.VUE_APP_BACKEND_API+'auth/logout').then((response) => {
                console.log(response)
            })
        },
        async refreshToken(context){
            const response = await axios.get(process.env.VUE_APP_BACKEND_API+'auth/refresh', context.getters.configRequestHeaders)
            context.commit('setToken', response.data)
            await context.dispatch('autoRefresh')
        },
        async autoRefresh(context){
            let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
            await wait(context.getters.token.expires_in * 1000);
            await context.dispatch('refreshToken');
        },
    }

}
