import axios from 'axios'
export default{
    actions: {
        async fetchCategories(context){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get(process.env.VUE_APP_BACKEND_API+'group/category', config)
                return result.data.categories


            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById(context, id){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get(process.env.VUE_APP_BACKEND_API+'group/category/' + id, config)
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
                const result= await axios.put(process.env.VUE_APP_BACKEND_API+'category/update/'+id, {name}, config)
                console.log(result)
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async createCategory(context, {name}) {
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.post(process.env.VUE_APP_BACKEND_API+'group/category/add', {name}, config)
                return result.data.category
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        }
    }
}
