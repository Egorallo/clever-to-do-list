<script>
import TaskListItem from './TaskListItem.vue';
import { getTasks, changeTaskstatusTo } from '../firestore';
import LoadingContent from './LoadingContent.vue';
import CalendarWidget from './CalendarWidget.vue';
export default {
  components: {
    TaskListItem,
    LoadingContent,
    CalendarWidget,
  },
  data() {
    return {
      hoveredOn: null,
      tasks: [],
      loading: true,
      layout1: [
        { type: 'circle', cx: 12, cy: 20, r: 12 },
        { type: 'rect', x: 35, y: 0, rx: 15, ry: 15, width: 310, height: 40 },
        { type: 'circle', cx: 12, cy: 76, r: 12 },
        { type: 'rect', x: 35, y: 56, rx: 15, ry: 15, width: 310, height: 40 },
        { type: 'circle', cx: 12, cy: 132, r: 12 },
        { type: 'rect', x: 35, y: 112, rx: 15, ry: 15, width: 310, height: 40 },
        { type: 'circle', cx: 12, cy: 188, r: 12 },
        { type: 'rect', x: 35, y: 168, rx: 15, ry: 15, width: 310, height: 40 },
      ],
      selectedDate: new Date().toISOString().split('T')[0],
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
      // await this.getAllTasks();
      this.tasks = this.tasks.map((n) => {
        if (n.id === task.id) {
          n.done = status;
        }
        return n;
      });
    },
    changeDate(newDate) {
      this.selectedDate = newDate;
      console.log('from task list ', this.selectedDate);
    },
  },
  async mounted() {
    await this.getAllTasks();
    console.log('Tasks in parent component:', this.tasks);
  },

  // watch: {
  //   loading() {
  //     console.log('loaded');
  //     this.filteredTasks = this.tasks.filter((task) => task.date === this.selectedDate);
  //     console.log(this.tasks);
  //     console.log(this.filteredTasks);
  //   },
  // },

  computed: {
    filteredTasks() {
      if (!this.loading) {
        console.log(new Date(this.selectedDate).toDateString());
        return this.tasks.filter((task) => task.date === this.selectedDate);
      }
      return [];
    },
    formattedDate() {
      return new Date(this.selectedDate).toDateString().split(' ').slice(1).join(' ');
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
      <CalendarWidget :tasks="tasks" @changed-date="changeDate"></CalendarWidget>
      <div class="task-list__container__quantity">
        {{ filteredTasks.length }} Tasks on {{ formattedDate }}
      </div>
      <transition-group v-if="!loading" name="fade" tag="div" class="task-list__container__tasks">
        <TaskListItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @click="this.$router.push(`/edit-task/${task.id}`)"
          @delete-task="removeTaskFromList"
          @change-done-status="changeStatus"
        />
        <button class="task-list__button" key="0" @click="goToAddTask">+ Add a new task</button>
      </transition-group>

      <LoadingContent :layout="layout1" v-else />
    </div>
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
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-80px);
}

.fade-leave-active {
  position: absolute;
}
</style>
