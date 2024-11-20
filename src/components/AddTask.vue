<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        done: false,
        date: new Date().toLocaleDateString().split('/').reverse().join('-'),
      },
      todaysDate: new Date().toLocaleDateString().split('/').reverse().join('-'),
      maxDate: new Date(new Date().setMonth(new Date().getFullYear() + 1))
        .toLocaleDateString()
        .split('/')
        .reverse()
        .join('-'),
    };
  },
  computed: {
    isTitleEmpty() {
      return this.task.title.trim() === '';
    },
  },
  methods: {
    ...mapActions(['addTask']),
    addNewTask(newTask) {
      this.addTask(newTask);
      this.task.title = '';
      this.task.description = '';
      this.task.done = false;
      this.task.date = new Date().toISOString().split('T')[0];
      this.$router.push('/');
    },
  },
};
</script>

<template>
  <div class="add-task">
    <div class="add-task__container">
      <div class="add-task__header">
        <RouterLink class="add-task__header__link" to="/">
          <img class="add-task__header__icon" src="../assets/icons/less-than.svg" />
        </RouterLink>
        <div class="add-task__header__text">New task</div>
      </div>
      <div class="add-task__title">
        <input
          type="text"
          v-model="task.title"
          class="add-task__title__input"
          placeholder="Enter your task title"
        />
      </div>
      <div class="add-task__description">
        <textarea
          v-model.trim="task.description"
          class="add-task__description__input"
          placeholder="Enter your task description"
        ></textarea>
      </div>
      <div class="add-task__date">
        <input
          class="add-task__date__input"
          type="date"
          v-model="task.date"
          :min="todaysDate"
          :max="maxDate"
        />
      </div>
      <div class="add-task__button__wrapper">
        <button class="add-task__button" @click="addNewTask(this.task)" :disabled="isTitleEmpty">
          Finish adding the task
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.add-task {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

.add-task__header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 3px;
}

.add-task__header__link {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 0;
}

.add-task__header__icon {
  width: 24px;
  height: 24px;
}

.add-task__header__text {
  font-size: 24px;
  font-weight: bold;
}

.add-task__container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 40px;
}

.add-task__title__input {
  font-family: 'Mulish', serif;
  font-size: 16px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border: none;
}

.add-task__description {
  max-height: 500px;
  height: 50vh;
}

.add-task__description__input {
  font-family: 'Mulish', serif;
  color: #646363;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border: none;
  resize: none;
}

.add-task__description__input:focus,
.add-task__title__input:focus {
  outline: none;
}
.add-task__button__wrapper {
  border-top: 1px solid #d4d4d4;
  padding-top: 10px;
}
.add-task__button {
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  padding: 17px;
  border: none;
  border-radius: 15px;
  background-color: #ff7300;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-task__button:hover {
  background-color: #ff9c4d;
}

.add-task__button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.add-task__date__input {
  position: relative;
  border-radius: 9px;
  border: 1px solid #e6e6e6;
  opacity: 0.5;
  padding: 7px;
  cursor: pointer;
}

.add-task__date__input::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
}

.add-task__date__input:focus {
  border-color: #ff8c00;
  outline: none;
}
</style>
