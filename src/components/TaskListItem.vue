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
    <div class="checkbox-container">
      <input
        type="checkbox"
        :checked="task.done"
        @click.stop="changeDoneStatus"
        class="done-status__checkbox"
        :id="task.id"
      />
      <label :for="task.id" @click.stop class="done-status__circle"></label>
      <label class="task-list-item__title">{{ task.title }}</label>
    </div>

    <Transition name="fade" tag="div">
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
.checkbox-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.task-list-item {
  max-width: 400px;
  width: 100%;
  height: 45px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
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

.task-list-item__title {
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  color: var(--text-secondary-color);
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-list-item__delete__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
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
