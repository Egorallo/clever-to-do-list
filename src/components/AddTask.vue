<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allTasks']),
    tasks() {
      return this.allTasks;
    },
  },
  methods: {
    ...mapActions(['addTask']),
    addNewTask() {
      console.log('afas');

      const newTask = {
        id: Date.now(),
        title: this.task.title,
        description: this.task.description,
        done: false,
      };
      this.addTask(newTask);
      this.task.title = '';
      this.task.description = '';
      console.log('Task added:', newTask);
    },
  },
};
</script>

<template>
  <div class="add-task">
    <div class="add-task__container">
      <div class="add-task__title">
        <input
          type="text"
          v-model="task.title"
          class="add-task__title__input"
          placeholder="Task title"
        />
      </div>
      <div class="add-task__description">
        <textarea
          v-model="task.description"
          class="add-task__description__input"
          placeholder="Task description"
        ></textarea>
      </div>
    </div>
    <button class="add-task__button" @click="addNewTask">+ Add a new task</button>
  </div>
</template>
