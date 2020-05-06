import axios from 'axios'
// import
export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },

        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user = data
        }
    },
    actions: {
        async signIn({ dispatch }, credentials) { // dispatch tới 1 action và từ action kia commit tới mutations
            let response = await axios.post('auth/login', credentials)

            // console.log(response.data);
            return dispatch('attempt', response.data.access_token)

        },
        async attempt({ commit, state }, token) { // commit tới mutation để set token
            if(token) {
                commit('SET_TOKEN', token) // call (token = payload)
            }
            if(!state.token) {
                return
            }

            try { // gọi đến auth/me để lấy thông tin user lưu vào state
                // let response = await axios.post('auth/me', '', {
                //     headers: {
                //         'Authorization': 'Bearer ' + token
                //     }
                //
                // })
                let response = await axios.post('auth/me')
                commit('SET_USER', response.data)
                // console.log(response.data);
            } catch (e) {
                console.log('failed')
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        signOut( { commit }) {
            return axios.post('auth/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        }
    }
}
