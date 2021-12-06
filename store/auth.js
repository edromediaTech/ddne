import axios from 'axios'
axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
export default {
  namespaced: true,

  state: {
    userData: null,
  },

  getters: {
    user: state => state.userData,
  },

  mutations: {
    setUserData (state, user) {
      state.userData = user
    },
  },

  actions: {
  async getUserData ({ commit }) {
     await this.$axios
        .get( 'user')
        .then(response => {
          commit('setUserData', response.data)
        })
        .catch(() => {
          localStorage.removeItem('authToken')
        })
    },

    async sendLoginRequest ({ commit }, data) {
     // commit('setErrors', {}, { root: true })
      return await this.$axios
        .post( 'login', data)
        .then(response => {
          commit('setUserData', response.data.user)
          localStorage.setItem('authToken', response.data.token)
          localStorage.setItem('userl', response.data.user.user_level)
          if(response.data.user.user_level === 3){
              localStorage.removeItem('inspect')
              localStorage.setItem('inspect', response.data.inspect)

          }
          
          if(response.data.responsable !== 0 || response.data.responsable !== -1){
             localStorage.removeItem('responsable')
             localStorage.setItem('responsable', response.data.responsable)
          }
          if(response.data.user.user_level === 5){
            localStorage.removeItem('id')
             localStorage.setItem('ip', response.data.ip)
             localStorage.setItem('id', response.data.user.id)
             localStorage.setItem('type', response.data.type)
          }
          localStorage.setItem('anac', response.data.anac)
          // console.log( localStorage.getItem('responsable'))
         })
       },
         
    async sendRegisterRequest ({ commit }, data) {
     // commit('setErrors', {}, { root: true })
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
      return await this.$axios
        .post( 'register', data)
        .then(response => {
          commit('setUserData', response.data.user)
          localStorage.setItem('authToken', response.data.token)
        })
    },
   async sendLogoutRequest ({ commit }) {
    this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
      await this.$axios.post( 'logout').then(() => {
        commit('setUserData', null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userl')
        localStorage.removeItem('responsable')
        localStorage.removeItem('anac')
        localStorage.removeItem('ecole')
        localStorage.removeItem('ecole_id')
        localStorage.removeItem('niveau')
      })
    },
    sendVerifyResendRequest () {
      return this.$axios.get( 'email/resend')
    },
    sendVerifyRequest ({ dispatch }, hash) {
      return this.$axios
        .get( 'email/verify/' + hash)
        .then(() => {
          dispatch('getUserData')
        })
    },
  },
}
