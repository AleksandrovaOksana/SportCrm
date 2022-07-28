import axios from 'axios'
export default{
    actions: {
        async fetchCategories(context){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get('http://crm.test/api/v1/group/category', config)
                return result.data.categories


            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById(context, id){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get('http://crm.test/api/v1/group/category/' + id, config)
                const category = result.data
                return {...category, id}


            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async updateCategory(context, {name, id}) {
            try {

                const config = await context.getters.configRequestHeaders
                const result= await axios.put('http://crm.test/api/v1/group/category/update/'+id, {name}, config)
                console.log(result)
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async createCategory(context, {name}) {
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.post('http://crm.test/api/v1/group/category/add', {name}, config)
                return {name, id: result.data.id}
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        }
    }
}
