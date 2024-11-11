import { createStore } from 'vuex';

const store = createStore({
  state: {
    tasks: [
      { id: 0, title: 'New design for mobile UI', description: 'Description 1', done: false },
      { id: 1, title: 'Wash nuggets in place', description: 'Description 2', done: false },
      {
        id: 2,
        title: 'Near the death experience',
        description: 'Description 3',
        done: false,
      },
      { id: 3, title: 'Wash nuggets in place', description: 'Description 2', done: false },
    ],
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task);
    },
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
  },
});

export default store;
