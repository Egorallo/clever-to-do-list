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
    ...mapActions(['deleteTask']),
    async delTask(taskId) {
      await this.deleteTask(taskId);
      this.$router.push('/');
    },

    changeDoneStatus() {
      this.$emit('change-done-status', this.task, !this.task.done);
    },
  },
};
</script>

<template>
  <div class="task-list-item" @mouseover="hoveredOn = task.id" @mouseleave="hoveredOn = null">
    <input
      type="checkbox"
      :checked="task.done"
      @click.stop="changeDoneStatus"
      class="task-list-item__checkbox"
      :id="task.id"
    />
    <label :for="task.id" @click.stop class="task-list-item__circle"></label>
    <label class="task-list-item__title">{{ task.title }}</label>
    <Transition name="fade">
      <button
        @click.stop="delTask(task.id)"
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
  padding-left: 3px;
  padding-right: 3px;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  height: 45px;
  transition: all 0.4s ease;
  border: none;
  border-radius: 15px;
  position: relative;
  background-color: transparent;
}

.task-list-item:hover {
  background-color: var(--bg-color-tasklistitem-hover);
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
    background-color 0.4s ease,
    border-color 0.4s ease;
}

.task-list-item__title {
  font-size: 16px;
  width: 100%;
  max-width: 320px;
  color: var(--text-secondary-color);
  overflow: hidden;
  text-overflow: ellipsis;
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
  right: 0;
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
