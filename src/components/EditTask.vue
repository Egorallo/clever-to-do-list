<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      taskId: parseInt(this.$route.params.id, 10),
      task: null,
    };
  },

  computed: {
    ...mapGetters(['getTaskById']),
    isTitleEmpty() {
      return this.task.title.trim() === '';
    },
  },

  mounted() {
    this.task = this.getTaskById(this.taskId);
  },

  methods: {
    ...mapActions(['updateTask', 'removeTask']),
    saveTask() {
      const updatedTask = {
        ...this.task,
        done: false,
      };
      this.updateTask(updatedTask);
      this.task.title = '';
      this.task.description = '';
      console.log('Task updated:', updatedTask);
    },
    deleteTask() {
      this.removeTask(this.taskId);
      this.$router.push('/');
    },
  },
};
</script>

<template>
  <div class="edit-task">
    <div class="edit-task__container">
      <div class="edit-task__header">
        <RouterLink class="edit-task__header__link" to="/">
          <img class="edit-task__header__icon" src="../assets/icons/less-than.svg" />
        </RouterLink>
        <div class="edit-task__header__text">Edit task</div>
      </div>

      <div v-if="task" class="edit-task__title">
        <input
          type="text"
          v-model="task.title"
          class="edit-task__title__input"
          placeholder="Update your task title"
        />
      </div>
      <div v-if="task" class="edit-task__description">
        <textarea
          v-model="task.description"
          class="edit-task__description__input"
          placeholder="Update your task description"
        ></textarea>
      </div>
      <div v-if="task" class="edit-task__button__container">
        <button class="edit-task__button update" @click="saveTask" :disabled="isTitleEmpty">
          Update
        </button>
        <button class="edit-task__button delete" @click="deleteTask">
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

.edit-task__description__input {
  font-family: 'Mulish', serif;
  color: #646363;
  width: 100%;
  min-height: 600px;
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
