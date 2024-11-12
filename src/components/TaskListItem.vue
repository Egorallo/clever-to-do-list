<script>
import { mapActions } from 'vuex';

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hoveredOn: null,
    };
  },
  methods: {
    ...mapActions(['removeTask']),
    delTask(taskId) {
      this.removeTask(taskId);
    },
  },
};
</script>

<template>
  <div class="task-list-item" @mouseover="hoveredOn = task.id" @mouseleave="hoveredOn = null">
    <input type="checkbox" class="task-list-item__checkbox" :id="task.id" />
    <label :for="task.id" class="task-list-item__circle"></label>
    <label class="task-list-item__title">{{ task.title }}</label>
    <Transition name="fade">
      <button
        @click="delTask(task.id)"
        v-show="hoveredOn === task.id"
        class="task-list-item__delete__button"
      >
        <img
          class="task-list-item__delete__button__img"
          src="../assets/icons/trash.svg"
          alt="Delete task"
        />
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.task-list-item {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  height: 45px;
  transition:
    background-color 0.5s ease,
    box-shadow 0.5s ease;
  border: none;
  border-radius: 15px;
  position: relative;
}

.task-list-item:hover {
  background-color: #f5f5f5;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.task-list-item__checkbox {
  display: none;
}

.task-list-item__circle {
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

.task-list-item__title {
  font-size: 16px;
  color: #646363;
}

.task-list-item__circle::after {
  content: '';
  display: none;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5L10 17L20 7'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.task-list-item__checkbox:checked + .task-list-item__circle {
  background-color: orange;
  border-color: orange;
}

.task-list-item__checkbox:checked + .task-list-item__circle::after {
  display: block;
}

.task-list-item__delete__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 0;
  position: absolute;
  right: 0px;
}

.task-list-item__delete__button__img {
  width: 20px;
  height: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
