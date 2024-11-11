<script>
export default {
  data() {
    return {
      tasks: [
        { id: 0, title: 'New design for mobile UI', description: 'Description 1', done: false },
        { id: 1, title: 'Wash nuggets in place', description: 'Description 2', done: false },
        {
          id: 2,
          title: 'Near the death experience',
          description: 'Description 3',
          done: false,
        },
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
      <div class="task-list__container__quantity">0 Tasks Today</div>
      <div class="task-list__container__tasks">
        <div class="task-list__container__task" v-for="task in tasks" :key="task.id">
          <input type="checkbox" class="task__checkbox" :id="task.id" />
          <label :for="task.id" class="task__circle"></label>
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
  margin: 80px auto 0 auto;
  width: 100%;
  max-width: 400px;
  padding: 15px;
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

.task__title {
  font-size: 16px;
  color: #646363;
}

.task-list__container__tasks {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-list__container__task {
  user-select: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.task__checkbox {
  display: none;
}

.task__circle {
  width: 20px;
  height: 20px;
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

.task__circle::after {
  content: '';
  display: none;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5L10 17L20 7'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.task__checkbox:checked + .task__circle {
  background-color: orange;
  border-color: orange;
}

.task__checkbox:checked + .task__circle::after {
  display: block;
}
</style>
