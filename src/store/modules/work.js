const work = {
  state: {
    taskActive: 'UnFinished',
    todoActive: 0
  },
  actions: {},
  mutations: {
    SET_TASK_NAV: (state, active) => {
      state.taskActive = active
    },
    RESET_TASK_NAV: (state) => {
      state.taskActive = 'UnFinished'
    },
    SET_TODO_NAV: (state, active) => {
      state.todoActive = active
    },
    RESET_TODO_NAV: (state) => {
      state.taskActive = 0
    }
  }
}
export default work
