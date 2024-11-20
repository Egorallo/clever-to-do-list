import { createStore } from 'vuex';
import { addNewTask, getTasks, deleteTask, updateTask } from '@/firestore';
import { getCurrentUser } from '@/auth';

const store = createStore({
  state: {
    tasks: [],
    userId: null,
    isDarkMode: localStorage.getItem('darkMode') === 'true',
  },
  mutations: {
    setDarkMode(state, isDark) {
      state.isDarkMode = isDark;
      document.documentElement.classList.toggle('dark', isDark);
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    updateTask(state, { taskId, updatedData }) {
      console.log('from store updatetask ', state.tasks);
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task,
      );
      console.log('from store updatetask ', state.tasks);
    },
  },
  actions: {
    saveDarkModePreference({ commit }, isDark) {
      localStorage.setItem('darkMode', isDark);
      commit('setDarkMode', isDark);
    },
    async initializeUser({ commit }) {
      const user = await getCurrentUser();
      if (user) {
        commit('setUserId', user.uid);
      } else {
        console.error('No user logged in');
      }
    },
    async fetchTasks({ commit, state }) {
      if (!state.userId) {
        console.error('User not logged in');
        return;
      }
      const tasks = await getTasks(state.userId);
      commit('setTasks', tasks);
    },
    async addTask({ dispatch, state }, task) {
      if (!state.userId) {
        console.error('User not logged in');
        return;
      }
      await addNewTask(state.userId, task);
      dispatch('fetchTasks');
    },
    async deleteTask({ commit, state }, taskId) {
      if (!state.userId) {
        console.error('User not logged in');
        return;
      }
      commit('removeTask', taskId);

      try {
        await deleteTask(state.userId, taskId);
        console.log('Task deleted from Firestore');
      } catch (error) {
        console.error('Error deleting task from Firestore:', error);
        const tasks = await getTasks(state.userId);
        commit('setTasks', tasks);
      }
    },
    async updateTask({ state }, { taskId, updatedData }) {
      if (!state.userId) {
        console.error('User not logged in');
        return;
      }
      console.log(updatedData);
      this.commit('updateTask', { taskId: taskId, updatedData: updatedData });

      console.log('data', updatedData);

      await updateTask(state.userId, taskId, updatedData);
    },
  },
  getters: {
    darkMode(state) {
      return state.isDarkMode;
    },
    tasksFromStore(state) {
      return state.tasks;
    },
    user(state) {
      return state.userId;
    },
  },
});

export default store;
