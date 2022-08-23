import axios from 'axios'
export default{
    actions: {
        async fetchGroups(context){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get(process.env.VUE_APP_BACKEND_API+'group', config)
                return result.data.groups


            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async fetchGroupsAreas(context, areaId){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get(process.env.VUE_APP_BACKEND_API+'group/area/' + areaId, config)
                return result.data.groups


            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async fetchGroupById(context, id){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get(process.env.VUE_APP_BACKEND_API+'group/' + id, config)
                const group = result.data
                return {...group, id}


            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async updateGroup(context, data, id) {
            try {

                const config = await context.getters.configRequestHeaders
                const result= await axios.put(process.env.VUE_APP_BACKEND_API+'group/update/' + id, data, config)
                console.log(result)
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async createGroup(context, data) {
            try {

                const config = await context.getters.configRequestHeaders
                const result = await axios.post(process.env.VUE_APP_BACKEND_API+'group/add', data, config)
                return result.data.group
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        }
    }
}
