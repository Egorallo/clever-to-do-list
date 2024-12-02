<script>
import TaskListItem from './TaskListItem.vue';
import LoadingContent from './LoadingContent.vue';
import CalendarWidget from './CalendarWidget.vue';
import { mapActions, mapGetters } from 'vuex';
import { LAYOUT_1 } from '../constants/layouts';
export default {
  components: {
    TaskListItem,
    LoadingContent,
    CalendarWidget,
  },
  data() {
    return {
      hoveredOn: null,
      loading: true,
      selectedDate: new Date().toLocaleDateString().split('/').reverse().join('-'),
      startDate: '',
      canAdd: true,
      layout: LAYOUT_1,
    };
  },
  methods: {
    addOneDay(dateString) {
      const date = new Date(dateString);

      date.setDate(date.getDate() + 1);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    ...mapActions(['fetchTasks', 'updateTask']),
    ...mapGetters(['tasksFromStore', 'userRegisteredDate']),
    goToAddTask() {
      this.$store.commit('setSelectedDate', this.selectedDate);
      this.$router.push('/add-task');
    },
    goToEditTask(taskId) {
      this.$router.push(`/edit-task/${taskId}`);
    },
    moveUncompleted() {
      const tasks = this.filteredTasks();
      const uncompleted = tasks.filter((task) => {
        return task.done === false;
      });
      uncompleted.forEach(async (task) => {
        const newDate = this.addOneDay(task.date);
        await this.updateTask({
          taskId: task.id,
          updatedData: { date: newDate },
        });
      });
    },
    async changeStatus(task, status) {
      await this.updateTask({ taskId: task.id, updatedData: { done: status } });
    },
    changeDate(newDate) {
      this.selectedDate = newDate;

      if (
        new Date(this.selectedDate).toISOString().split('T')[0] >=
        new Date().toISOString().split('T')[0]
      ) {
        this.canAdd = true;
      } else {
        this.canAdd = false;
      }
    },
    filteredTasks() {
      if (!this.loading) {
        return this.tasks.filter((task) => task.date === this.selectedDate);
      }
      return [];
    },
  },
  async created() {
    this.loading = true;
    await this.fetchTasks();
    this.startDate = this.userRegisteredDate();
    this.loading = false;
  },

  computed: {
    tasks() {
      return this.tasksFromStore();
    },
    formattedDate() {
      return new Date(this.selectedDate).toLocaleDateString().split('/').join('.');
    },
    amountOfTasksToday() {
      return `${this.formattedDate}  <br>📝  ${this.filteredTasks().length} `;
    },
    uncompletedTasks() {
      const tasks = this.filteredTasks();
      return tasks.some((task) => !task.done);
    },
  },
};
</script>

<template>
  <main class="task-list">
    <div class="task-list__header">
      <h1 class="task-list__header__text">Your task manager</h1>
    </div>
    <div></div>
    <section class="task-list__container" v-if="!loading">
      <CalendarWidget
        :startDate="startDate"
        :tasks="tasks"
        @changed-date="changeDate"
      ></CalendarWidget>
      <p class="task-list__container__quantity" v-html="amountOfTasksToday"></p>
      <transition-group name="fade" tag="div" class="task-list__container__tasks">
        <TaskListItem
          v-for="task in filteredTasks()"
          :key="task.id"
          :task="task"
          @click="this.$router.push(`/edit-task/${task.id}`)"
          @change-done-status="changeStatus"
        />
        <div class="task-list__button-container" key="-31a">
          <button class="task-list__button" @click="goToAddTask" :disabled="!canAdd">
            + Add a new task
          </button>
          <button
            class="task-list__button uncopmleted"
            :disabled="!uncompletedTasks"
            @click="moveUncompleted"
          >
            Move uncompleted &#10142;
          </button>
        </div>
      </transition-group>
    </section>
    <LoadingContent :view-box="'0 -10 945 1000'" :layout="layout" v-else />
  </main>
</template>

<style scoped>
.task-list {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task-list__header {
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.task-list__header__text {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
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
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.task-list__button-container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.task-list__button {
  font-family: 'Mulish', serif;
  font-size: 16px;
  margin-top: 50px;
  width: 250px;
  /* max-width: 400px; */
  padding: 17px;
  border: none;
  border-radius: 15px;
  background-color: var(--button-main-color);
  color: var(--button-text-color);
  cursor: pointer;
  transition: all 0.4s ease;
}

.task-list__button:hover {
  opacity: 0.7;
}

.task-list__button.uncopmleted {
  background-color: var(--button-uncompleted-color);
}

.task-list__button:disabled {
  background-color: var(--button-disabled-color);
  opacity: 0.2;
  cursor: not-allowed;
}

.smol-text {
  margin: auto;
  color: var(--text-main-color);
  transition: all 0.4s ease;
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
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-to {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.4s ease;
}

.fade-leave-active {
  position: absolute;
}

@media (width <= 500px) {
  .task-list__button-container {
    display: grid;
    grid-template-columns: 1fr;
  }

  .task-list__button {
    margin-top: 40px;
    width: 100%;
    /* max-width: 400px; */
  }
}
</style>
