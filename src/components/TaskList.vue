<script>
export default {
  data() {
    return {
      tasks: [
        { id: 0, title: 'Task 1', description: 'Description 1', done: false },
        { id: 1, title: 'Task 2', description: 'Description 2', done: false },
        { id: 2, title: 'Task 3', description: 'Description 3', done: false },
      ],
    };
  },
};
</script>

<template>
  <div class="task-list">
    <div class="task-list__header">
      <div class="task-list__header__text">Your task manager</div>
    </div>
    <div class="task-list__container">
      <div class="task-list__container__quantity">0 tasks today</div>
      <div class="task-list__container__tasks">
        <div class="task-list__container__task" v-for="task in tasks" :key="task.id">
          <input type="checkbox" class="task__checkbox" :id="task.id" />
          <label :for="task.id" class="task__title">{{ task.title }}</label>
        </div>
      </div>
    </div>
    <button class="task-list__button">+ Add a new task</button>
  </div>
</template>

<style scoped>
.task-list {
  max-width: 762px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
