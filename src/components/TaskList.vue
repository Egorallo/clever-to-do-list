<script>
import TaskListItem from './TaskListItem.vue';
import LoadingContent from './LoadingContent.vue';
import CalendarWidget from './CalendarWidget.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    TaskListItem,
    LoadingContent,
    CalendarWidget,
  },
  data() {
    return {
      hoveredOn: null,
      // tasks: [],
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
      selectedDate: new Date().toLocaleDateString().split('/').reverse().join('-'),
    };
  },
  methods: {
    ...mapActions(['fetchTasks', 'updateTask']),
    ...mapGetters(['tasksFromStore']),
    goToAddTask() {
      this.$router.push('/add-task');
    },
    goToEditTask(taskId) {
      this.$router.push(`/edit-task/${taskId}`);
    },
    async changeStatus(task, status) {
      console.log('from task list ', task, status);
      await this.updateTask({ taskId: task.id, updatedData: { done: status } });

      // this.tasks = this.tasks.map((n) => {
      //   if (n.id === task.id) {
      //     n.done = status;
      //   }
      //   return n;
      // });
    },
    changeDate(newDate) {
      this.selectedDate = newDate;
      console.log('from task list ', this.selectedDate);
    },
    filteredTasks() {
      if (!this.loading) {
        console.log('from filteredTasks()');
        return this.tasks.filter((task) => task.date === this.selectedDate);
      }
      return [];
    },
  },
  async created() {
    this.loading = true;
    console.log('created from tasklist');
    await this.fetchTasks();

    this.loading = false;
  },

  computed: {
    tasks() {
      console.log('tasks() ', this.tasksFromStore());
      return this.tasksFromStore();
    },

    // filteredTasks() {
    //   this.tasks;
    //   if (!this.loading) {
    //     console.log(new Date(this.selectedDate).toDateString());
    //     return this.tasks.filter((task) => task.date === this.selectedDate);
    //   }
    //   return [];
    // },
    formattedDate() {
      return new Date(this.selectedDate).toDateString().split(' ').slice(1).join(' ');
    },
    amountOfTasksToday() {
      const word = this.filteredTasks().length === 1 ? 'Task' : 'Tasks';
      return `${this.filteredTasks().length} ${word} on ${this.formattedDate}`;
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
        {{ amountOfTasksToday }}
      </div>
      <transition-group v-if="!loading" name="fade" tag="div" class="task-list__container__tasks">
        <TaskListItem
          v-for="task in filteredTasks()"
          :key="task.id"
          :task="task"
          @click="this.$router.push(`/edit-task/${task.id}`)"
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
