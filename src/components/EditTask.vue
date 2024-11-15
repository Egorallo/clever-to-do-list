<script>
import { deleteTask, updateTask, getTaskById } from '../firestore';
export default {
  data() {
    return {
      taskId: this.$route.params.id,
      task: { title: '', description: '', date: '' },
      todaysDate: new Date().toISOString().split('T')[0],
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    };
  },

  methods: {
    async delTask(taskId) {
      await deleteTask(taskId);
      this.$router.push('/');
    },
    async updTask(taskId, updatedData) {
      await updateTask(taskId, updatedData);
      this.$router.push('/');
    },
    async getById(taskId) {
      this.task = await getTaskById(taskId);
    },
  },
  computed: {
    isTitleEmpty() {
      return (this.task.title || '').trim() === '';
    },
  },
  async mounted() {
    await this.getById(this.taskId);
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
      <div class="edit-task__title">
        <input
          type="text"
          v-model="task.title"
          class="edit-task__title__input"
          placeholder="Update your task title"
        />
      </div>
      <div class="edit-task__description">
        <textarea
          v-model.trim="task.description"
          class="edit-task__description__input"
          placeholder="Update your task description"
        ></textarea>
      </div>
      <div class="edit-task__date">
        <input
          class="edit-task__date__input"
          type="date"
          v-model="task.date"
          :min="todaysDate"
          :max="maxDate"
        />
      </div>
      <div class="edit-task__button__container">
        <button
          class="edit-task__button update"
          @click="updTask(taskId, task)"
          :disabled="isTitleEmpty"
        >
          Update
        </button>
        <button class="edit-task__button delete" @click="delTask(taskId)">
          <img class="edit-task__button__img" src="../assets/icons/trash.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-task__button__container {
  display: flex;
  width: 100%;
  max-width: 400px;
  gap: 15px;
  justify-content: flex-end;
  border-top: 1px solid #d4d4d4;
  padding-top: 10px;
}

.edit-task__button {
  font-size: 16px;
  width: 100%;
  padding: 17px;
  border: none;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-task__button.update {
  max-width: 150px;
  background-color: #ff7300;
}

.edit-task__button.delete {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100px;
  background-color: #ff0000;
}

.edit-task__button__img {
  width: 24px;
  height: 24px;
}

.edit-task__button.update:hover {
  background-color: #ff9c4d;
}

.edit-task__button.delete:hover {
  background-color: #ff4d4d;
}

.edit-task__button.update:disabled {
  background-color: #ccc;
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

.edit-task__title__input {
  font-family: 'Mulish', serif;
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border: none;
}

.edit-task__description {
  height: 50vh;
}

.edit-task__description__input {
  font-family: 'Mulish', serif;
  color: #646363;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border: none;
  resize: none;
}

.edit-task__description__input:focus,
.edit-task__title__input:focus {
  outline: none;
}
</style>
