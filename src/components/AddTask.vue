<script>
import { mapActions } from 'vuex';
import IconLessThan from './icons/IconLessThan.vue';

export default {
  components: {
    IconLessThan,
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
        done: false,
        date: this.$store.state.selectedDate,
      },
      todaysDate: new Date().toLocaleDateString().split('/').reverse().join('-'),
      maxDate: new Date(new Date().setMonth(new Date().getFullYear() + 1))
        .toLocaleDateString()
        .split('/')
        .reverse()
        .join('-'),
      charsLeftInput: 0,
      charsLeftTextarea: 0,
    };
  },
  computed: {
    isTitleEmpty() {
      return this.task.title.trim() === '';
    },
    charsTitle() {
      return this.task.title.length;
    },
    charsDescription() {
      return this.task.description.length;
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
  <main class="task-page">
    <section class="task-page__container">
      <div class="task-page__header">
        <RouterLink class="task-page__header__link" to="/">
          <IconLessThan />
        </RouterLink>
        <h1 class="task-page__header__text">New task</h1>
      </div>
      <section class="task-page__title">
        <input
          type="text"
          v-model="task.title"
          class="task-page__title__input"
          placeholder="Enter your task title"
          maxlength="50"
          ref="inputField"
        />
        <label class="task-page__chars-left">{{ charsTitle }}/50</label>
      </section>
      <section class="task-page__description">
        <textarea
          v-model="task.description"
          class="task-page__description__input"
          placeholder="Enter your task description"
          maxlength="1000"
          ref="textareaField"
        ></textarea>
        <label class="task-page__chars-left">{{ charsDescription }}/1000</label>
      </section>
      <section class="task-page__date">
        <input
          class="task-page__date__input"
          type="date"
          v-model="task.date"
          :min="todaysDate"
          :max="maxDate"
        />
      </section>
      <div class="add-task__button__wrapper">
        <button class="add-task__button" @click="addNewTask(this.task)" :disabled="isTitleEmpty">
          Finish adding the task
        </button>
      </div>
    </section>
  </main>
</template>

<style>
.add-task__button__wrapper {
  border-top: 1px solid #d4d4d4;
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
.add-task__button {
  font-family: 'Mulish', serif;

  font-size: 16px;
  width: 100%;
  max-width: 400px;
  padding: 17px;
  border: none;
  border-radius: 15px;
  background-color: var(--button-main-color);
  color: var(--button-text-color);
  cursor: pointer;
}

.add-task__button:hover {
  background-color: var(--button-main-color-hover);
}

.add-task__button:disabled {
  background-color: var(--button-disabled-color);
  opacity: 0.2;
  cursor: not-allowed;
}
</style>
