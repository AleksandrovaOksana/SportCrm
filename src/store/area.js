import axios from 'axios'
export default{
    actions: {
        async fetchAreas(context){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get('http://crm.test/api/v1/area', config)

                return result.data.areas
                
                
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async fetchAreaById(context, id){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get('http://crm.test/api/v1/area/' + id, config)
                const area = result.data
                return {...area, id}
                
                
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async updateArea(context, {id, name, description, work_time}) {
            try {
                const config = await context.getters.configRequestHeaders
                const result= await axios.put('http://crm.test/api/v1/area/update/'+id, {name, description, work_time}, config)
                console.log(result)
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async createArea(context, {name, description, work_time, city, street, house, building}) {
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.post('http://crm.test/api/v1/area/add', {name, description, work_time, city, street, house, building}, config)
                return result.data.area
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        }
    }
}
