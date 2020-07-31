const work = {
  state: {
    taskActive: 'UnFinished'
  },
  actions: {},
  mutations: {
    SET_TASK_NAV: (state, active) => {
      state.taskActive = active
    },
    RESET_TASK_NAV: (state) => {
      state.taskActive = 'UnFinished'
    }
  }
}
export default work
