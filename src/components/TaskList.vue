<script>
import { mapGetters } from 'vuex';
import TaskListItem from './TaskListItem.vue';

export default {
  components: {
    TaskListItem,
  },
  data() {
    return {
      hoveredOn: null,
    };
  },
  methods: {
    goToAddTask() {
      this.$router.push('/add-task');
    },
  },
  computed: {
    ...mapGetters(['allTasks']),
    tasks() {
      return this.allTasks;
    },
  },
};
</script>

<template>
  <div class="task-list">
    <div class="task-list__header">
      <div class="task-list__header__text">Your task manager</div>
    </div>
    <div class="task-list__container">
      <div class="task-list__container__quantity">0 Tasks Today</div>
      <div class="task-list__container__tasks">
        <TaskListItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @click="this.$router.push(`/edit-task/${task.id}`)"
        />
      </div>
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
</style>
