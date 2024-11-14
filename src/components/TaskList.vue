<script>
import TaskListItem from './TaskListItem.vue';
import { getTasks, changeTaskstatusTo } from '../firestore';

export default {
  components: {
    TaskListItem,
  },
  data() {
    return {
      hoveredOn: null,
      tasks: [],
      loading: true,
    };
  },
  methods: {
    goToAddTask() {
      this.$router.push('/add-task');
    },
    async getAllTasks() {
      this.loading = true;
      this.tasks = await getTasks();
      this.loading = false;
    },
    goToEditTask(taskId) {
      this.$router.push(`/edit-task/${taskId}`);
    },
    removeTaskFromList(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
    async changeStatus(task, status) {
      await changeTaskstatusTo(task.id, status);
      await this.getAllTasks();
    },
  },
  mounted() {
    this.getAllTasks();
    console.log('Tasks in parent component:', this.tasks);
  },
};
</script>

<template>
  <div class="task-list">
    <div class="task-list__header">
      <div class="task-list__header__text">Your task manager</div>
    </div>
    <div class="task-list__container">
      <div class="task-list__container__quantity">{{ this.tasks.length }} Tasks Today</div>
      <transition-group v-if="!loading" name="fade" tag="div" class="task-list__container__tasks">
        <TaskListItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @click="this.$router.push(`/edit-task/${task.id}`)"
          @delete-task="removeTaskFromList"
          @change-done-status="changeStatus"
        />
      </transition-group>
    </div>
    <button class="task-list__button" @click="goToAddTask">+ Add a new task</button>
  </div>
</template>

<style scoped>
.task-list {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task-list__header__text {
  font-size: 24px;
  font-weight: bold;
}

.task-list__container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
}
.task-list__container__quantity {
  font-size: 20px;
  font-weight: bold;
}

.task-list__button {
  font-size: 16px;
  margin-top: 50px;
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

.task-list__button:hover {
  background-color: #ff9c4d;
}

.task-list__container__tasks {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
