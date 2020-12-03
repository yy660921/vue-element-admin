const state = {
  person: '黄之锋 Joshua Wong',
  topic: '反送中'
}

const mutations = {
  SET_PERSON: (state, person) => {
    state.person = person
  },
  SET_TOPIC: (state, topic) => {
    state.topic = topic
  }
}

const actions = {
  setPerson({ commit }, person) {
    commit('SET_PERSON', person)
  },
  setTopic({ commit }, topic) {
    commit('SET_TOPIC', topic)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
