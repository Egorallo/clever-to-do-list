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
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
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
          console.log(this.$refs.inputField.value.length);
          this.charsLeftInput = this.$refs.inputField.value.length;
        }
        if (this.$refs.textareaField) {
          console.log(this.$refs.textareaField.value.length);

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
  <div class="edit-task">
    <div class="edit-task__container">
      <div class="edit-task__header" v-if="task">
        <RouterLink class="edit-task__header__link" to="/">
          <img class="edit-task__header__icon" src="../assets/icons/less-than.svg" />
        </RouterLink>
        <div class="edit-task__header__text">Edit task</div>
      </div>

      <div v-if="task.date" class="edit-task__title">
        <input
          type="text"
          v-model="task.title"
          class="edit-task__title__input"
          placeholder="Update your task title"
          maxlength="50"
          ref="inputField"
        />
        <label>{{ charsLeftInput }}/50</label>
      </div>
      <div v-if="task.date" class="edit-task__description">
        <textarea
          v-model.trim="task.description"
          class="edit-task__description__input"
          placeholder="Update your task description"
          maxlength="1000"
          ref="textareaField"
        ></textarea>
        <label>{{ charsLeftTextarea }}/1000</label>
      </div>
      <div v-if="task.date" class="edit-task__date">
        <input
          class="edit-task__date__input"
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
          class="edit-task__checkbox"
          :id="task.id"
        />

        <label :for="task.id" @click.stop class="edit-task__circle"></label>
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
.edit-task__checkbox {
  display: none;
}

.edit-task__circle {
  user-select: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid orange;
  display: inline-flex;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.edit-task__circle::after {
  content: '';
  display: none;
  width: 12px;
  height: 12px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5L10 17L20 7'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.edit-task__checkbox:checked + .edit-task__circle {
  background-color: orange;
  border-color: orange;
}

.edit-task__checkbox:checked + .edit-task__circle::after {
  display: block;
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

.edit-task {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

.edit-task__header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 3px;
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.edit-task__header__link {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 0;
}

.edit-task__header__icon {
  width: 24px;
  height: 24px;
}

.edit-task__header__text {
  font-size: 24px;
  font-weight: bold;
}

.edit-task__container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 40px;
}

.edit-task__title {
  color: var(--text-secondary-color);
  transition: all 0.4s ease;
}

.edit-task__title__input {
  font-family: 'Mulish', serif;
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.edit-task__description {
  height: 42vh;
  color: var(--text-secondary-color);
  transition: all 0.4s ease;
}

.edit-task__description__input {
  font-family: 'Mulish', serif;
  color: var(--text-secondary-color);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border: none;
  resize: none;
  background-color: transparent;
  transition: all 0.4s ease;
}

.edit-task__description__input:focus,
.edit-task__title__input:focus {
  outline: none;
}

.edit-task__date__input {
  position: relative;
  border-radius: 9px;
  border: 1px solid #e6e6e6;
  opacity: 0.5;
  padding: 7px;
}

.edit-task__date__input::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
  cursor: pointer;
}
</style>
