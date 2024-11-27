import { createStore } from 'vuex';
import { addNewTask, getTasks, deleteTask, updateTask } from '@/firestore';
import { getCurrentUser } from '@/auth';

const store = createStore({
  state: {
    tasks: [],
    userId: null,
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    selectedDate: new Date().toLocaleDateString().split('/').reverse().join('-'),
  },
  mutations: {
    setSelectedDate(state, date) {
      state.selectedDate = date;
    },
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
    setUserRegisteredDate(state, date) {
      state.userRegisteredDate = date;
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    updateTask(state, { taskId, updatedData }) {
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task,
      );
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
        commit('setUserRegisteredDate', user.metadata.creationTime);
      }
    },
    async fetchTasks({ commit, state }) {
      if (!state.userId) {
        return;
      }
      const tasks = await getTasks(state.userId);
      commit('setTasks', tasks);
    },
    async addTask({ dispatch, state }, task) {
      if (!state.userId) {
        return;
      }
      await addNewTask(state.userId, task);
      dispatch('fetchTasks');
    },
    async deleteTask({ commit, state }, taskId) {
      if (!state.userId) {
        return;
      }
      commit('removeTask', taskId);

      try {
        await deleteTask(state.userId, taskId);
      } catch (error) {
        console.error('Error deleting task from Firestore:', error);
        const tasks = await getTasks(state.userId);
        commit('setTasks', tasks);
      }
    },
    async updateTask({ state }, { taskId, updatedData }) {
      if (!state.userId) {
        return;
      }
      this.commit('updateTask', { taskId: taskId, updatedData: updatedData });
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
    userRegisteredDate(state) {
      return state.userRegisteredDate;
    },
  },
});

export default store;
