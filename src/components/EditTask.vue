<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingContent from './LoadingContent.vue';
import IconLessThan from './icons/IconLessThan.vue';
import IconTrash from './icons/IconTrash.vue';
import { LAYOUT_2 } from '../constants/layouts';
export default {
  components: {
    LoadingContent,
    IconLessThan,
    IconTrash,
  },
  data() {
    return {
      taskId: this.$route.params.id,
      task: { title: '', description: '', date: '' },
      todaysDate: new Date().toLocaleDateString().split('/').reverse().join('-'),
      maxDate: new Date(new Date().setMonth(new Date().getFullYear() + 1))
        .toLocaleDateString()
        .split('/')
        .reverse()
        .join('-'),
      charsLeftInput: 0,
      charsLeftTextarea: 0,
      layout: LAYOUT_2,
    };
  },
  methods: {
    ...mapGetters(['tasksFromStore']),
    ...mapActions(['updateTask', 'fetchTasks', 'deleteTask']),
    delTask(taskId) {
      this.deleteTask(taskId);
      this.$router.push('/');
    },
    updTask(taskId, updatedData) {
      const { id, ...dataWithoutId } = updatedData;
      this.updateTask({ taskId, updatedData: dataWithoutId });
      this.$router.push('/');
    },
    changeDoneStatus() {
      this.$emit('change-done-status', this.task, !this.task.done);
    },
  },
  computed: {
    isTitleEmpty() {
      return (this.task.title || '').trim() === '';
    },
    charsTitle() {
      return this.task.title.length;
    },
    charsDescription() {
      return this.task.description.length;
    },
  },
  async created() {
    let tasks = this.tasksFromStore();
    const foundTask = tasks.find((task) => task.id === this.taskId);
    if (!foundTask) {
      await this.fetchTasks();
      tasks = this.tasksFromStore();
      this.task = tasks.find((task) => task.id === this.taskId);
    } else {
      this.task = foundTask;
    }
  },
};
</script>

<template>
  <main class="task-page">
    <section class="task-page__container">
      <div class="task-page__header" v-if="task">
        <RouterLink class="task-page__header__link" to="/">
          <IconLessThan />
        </RouterLink>
        <h1 class="task-page__header__text">Edit task</h1>
      </div>

      <section v-if="task.date" class="task-page__title">
        <input
          type="text"
          v-model="task.title"
          class="task-page__title__input"
          placeholder="Update your task title"
          maxlength="50"
          ref="inputField"
        />
        <label class="task-page__chars-left">{{ charsTitle }}/50</label>
      </section>
      <section v-if="task.date" class="task-page__description">
        <textarea
          v-model="task.description"
          class="task-page__description__input"
          placeholder="Update your task description"
          maxlength="1000"
          ref="textareaField"
        ></textarea>
        <label class="task-page__chars-left">{{ charsDescription }}/1000</label>
      </section>
      <section v-if="task.date" class="task-page__date">
        <input
          class="task-page__date__input"
          type="date"
          v-model="task.date"
          :min="todaysDate"
          :max="maxDate"
        />
      </section>

      <LoadingContent v-else :layout="layout" :view-box="'0 0 945 500'"></LoadingContent>

      <div class="edit-task__button__container">
        <input
          type="checkbox"
          :checked="task.done"
          @click.stop="task.done = !task.done"
          class="done-status__checkbox"
          :id="task.id"
        />

        <label :for="task.id" @click.stop class="done-status__circle"></label>
        <a class="edit-task__button delete" @click="delTask(taskId)">
          <IconTrash />
        </a>

        <button
          class="edit-task__button update"
          @click="updTask(taskId, task)"
          :disabled="isTitleEmpty"
        >
          Complete &#x2713;
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.done-status_circle {
  user-select: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.done-status__circle::after {
  width: 12px;
  height: 12px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5L10 17L20 7'/%3E%3C/svg%3E");
}

.edit-task__button__container {
  display: flex;
  width: 100%;
  /* max-width: 400px; */
  gap: 1vw;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #d4d4d4;
  padding-top: 10px;
}

.edit-task__button {
  font-family: 'Mulish', serif;
  font-size: 16px;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: none;
  color: var(--button-text-color);
  cursor: pointer;
  transition: all 0.4s ease;
}

.edit-task__button.update {
  max-width: 130px;
  height: 50px;
  background-color: var(--button-update-color);
  color: #438f69;
  border-radius: 16px;
  font-weight: bold;
  padding: 10px 10px 10px 10px;
  transition: all 0.4s ease;
}

.edit-task__button.delete {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  background-color: transparent;
}

.edit-task__button.update:hover {
  background-color: var(--button-update-color-hover);
}

.edit-task__button.update:disabled {
  background-color: var(--button-disabled-color);
  opacity: 0.2;
  cursor: not-allowed;
}
</style>
