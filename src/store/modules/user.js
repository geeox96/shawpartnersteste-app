import { usersGQL, usersDetailsGQL, usersReposGQL } from '../graphql/user'

export default {
  state: {
    repos: {},
    user: {},
    users: []
  },

  getters: {
    getUsers: state => state.users,
    getUser: state => state.user,
    getRepos: state => state.repos
  },

  actions: {
    async actionLoadUsers ({ commit }, since) {
      await usersGQL(since).then(users => {
        commit('setUsers', users)
      })
    },

    async actionViewDetails ({ commit }, user) {
      await usersDetailsGQL(user).then(details => {
        commit('setDetails', details)
      })
    },

    async actionLoadRepos ({ commit }, user) {
      await usersReposGQL(user).then(repos => {
        commit('setRepos', repos)
      })
    }
  },

  mutations: {
    setUsers (state, users) {
      state.users = users
    },

    setDetails (state, details) {
      state.user = details
    },

    setRepos (state, repos) {
      state.repos = repos
    }
  }
}
