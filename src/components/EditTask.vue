<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingContent from './LoadingContent.vue';
export default {
  components: {
    LoadingContent,
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
      layout2: [
        { type: 'rect', x: 0, y: 0, rx: 10, ry: 10, width: 345, height: 20 },
        { type: 'rect', x: 0, y: 60, rx: 10, ry: 10, width: 345, height: 460 },
      ],
      loaderViewBox: '0 0 345 526',
      charsLeftInput: 0,
      charsLeftTextarea: 0,
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
      // eslint-disable-next-line no-unused-vars
      const { id, ...dataWithoutId } = updatedData;
      this.updateTask({ taskId, updatedData: dataWithoutId });
      this.$router.push('/');
    },
    changeDoneStatus() {
      this.$emit('change-done-status', this.task, !this.task.done);
    },
    charsRemaining() {
      this.$nextTick(() => {
        if (this.$refs.inputField) {
          this.charsLeftInput = this.$refs.inputField.value.length;
        }
        if (this.$refs.textareaField) {
          this.charsLeftTextarea = this.$refs.textareaField.value.length;
        }
      });
    },
  },
  computed: {
    isTitleEmpty() {
      return (this.task.title || '').trim() === '';
    },
  },
  watch: {
    'task.title': function () {
      this.charsRemaining();
    },
    'task.description': function () {
      this.charsRemaining();
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
  <div class="task-page">
    <div class="task-page__container">
      <div class="task-page__header" v-if="task">
        <RouterLink class="task-page__header__link" to="/">
          <img class="task-page__header__icon" src="../assets/icons/less-than.svg" />
        </RouterLink>
        <div class="task-page__header__text">Edit task</div>
      </div>

      <div v-if="task.date" class="task-page__title">
        <input
          type="text"
          v-model="task.title"
          class="task-page__title__input"
          placeholder="Update your task title"
          maxlength="50"
          ref="inputField"
        />
        <label>{{ charsLeftInput }}/50</label>
      </div>
      <div v-if="task.date" class="task-page__description">
        <textarea
          v-model.trim="task.description"
          class="task-page__description__input"
          placeholder="Update your task description"
          maxlength="1000"
          ref="textareaField"
        ></textarea>
        <label>{{ charsLeftTextarea }}/1000</label>
      </div>
      <div v-if="task.date" class="task-page__date">
        <input
          class="task-page__date__input"
          type="date"
          v-model="task.date"
          :min="todaysDate"
          :max="maxDate"
        />
      </div>

      <LoadingContent v-else :layout="layout2" :view-box="loaderViewBox"></LoadingContent>

      <div class="edit-task__button__container">
        <input
          type="checkbox"
          :checked="task.done"
          @click.stop="task.done = !task.done"
          class="done-status__checkbox"
          :id="task.id"
        />

        <label :for="task.id" @click.stop class="done-status__circle"></label>
        <button class="edit-task__button delete" @click="delTask(taskId)">
          <img class="edit-task__button__img" src="../assets/icons/trash.svg" />
        </button>
        <button
          class="edit-task__button update"
          @click="updTask(taskId, task)"
          :disabled="isTitleEmpty"
        >
          Complete &#x2713;
        </button>
      </div>
    </div>
  </div>
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
  max-width: 400px;
  gap: 1vw;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #d4d4d4;
  padding-top: 10px;
}

.edit-task__button {
  font-size: 16px;
  width: 100%;
  padding: 17px;
  border: none;
  border-radius: 12px;
  color: var(--button-text-color);
  cursor: pointer;
  transition: all 0.4s ease;
}

.edit-task__button.update {
  max-width: 130px;
  height: 50px;
  background-color: var(--button-update-color);
  color: #438f69;
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

.edit-task__button__img {
  width: 24px;
  height: 24px;
}

.edit-task__button.update:hover {
  background-color: var(--button-update-color-hover);
}

.edit-task__button.update:disabled {
  background-color: var(--button-disabled-color);
  cursor: not-allowed;
}
</style>
