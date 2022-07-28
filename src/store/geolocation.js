import axios from 'axios'
export default {
    actions: {
        async getCities(context, queryString = null){
            try {
                const config = await context.getters.configRequestHeaders
                queryString = queryString ? '?name='+queryString : ''
                const result = await axios.get('http://crm.test/api/v1/cities/'+queryString, config)

                return result.data.cities
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
    }
}
