<script>
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        done: false,
        date: new Date().toISOString().split('T')[0],
      },
      todaysDate: new Date().toISOString().split('T')[0],
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    };
  },
  computed: {
    isTitleEmpty() {
      return this.task.title.trim() === '';
    },
    ...mapGetters(['allTasks']),
    tasks() {
      return this.allTasks;
    },
  },
  methods: {
    // ...mapActions(['addTask']),
    // addNewTask() {
    //   const newTask = {
    //     id: Date.now(),
    //     title: this.task.title,
    //     description: this.task.description,
    //     done: false,
    //     date: this.task.date,
    //   };
    //   this.addTask(newTask);
    //   this.task.title = '';
    //   this.task.description = '';
    //   this.task.date = new Date().toISOString().split('T')[0];
    //   console.log('Task added:', newTask);
    // },

    async addNewTask() {
      try {
        const taskCollectionRef = collection(db, 'tasks');
        await addDoc(taskCollectionRef, {
          title: this.task.title,
          description: this.task.description,
          done: this.task.done,
          date: this.task.date,
        });
        console.log('Task added:', this.task);
      } catch (error) {
        console.error('Error adding task:', error);
      }
      this.task.title = '';
      this.task.description = '';
      this.task.done = false;
      this.task.date = new Date().toISOString().split('T')[0];
    },
  },
};
</script>

<template>
  <div class="add-task">
    <div class="add-task__container">
      <div class="add-task__header">
        <RouterLink class="add-task__header__link" to="/">
          <img class="add-task__header__icon" src="../assets/icons/less-than.svg" />
        </RouterLink>
        <div class="add-task__header__text">Today's task</div>
      </div>
      <div class="add-task__title">
        <input
          type="text"
          v-model="task.title"
          class="add-task__title__input"
          placeholder="Enter your task title"
        />
      </div>
      <div class="add-task__description">
        <textarea
          v-model="task.description"
          class="add-task__description__input"
          placeholder="Enter your task description"
        ></textarea>
      </div>
      <div class="add-task__date">
        <input
          class="add-task__date__input"
          type="date"
          v-model="task.date"
          :min="todaysDate"
          :max="maxDate"
        />
      </div>
    </div>
    <button class="add-task__button" @click="addNewTask" :disabled="isTitleEmpty">
      Finish adding the task
    </button>
  </div>
</template>

<style>
.add-task {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

.add-task__header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 3px;
}

.add-task__header__link {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 0;
}

.add-task__header__icon {
  width: 24px;
  height: 24px;
}

.add-task__header__text {
  font-size: 24px;
  font-weight: bold;
}

.add-task__container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 40px;
}

.add-task__title__input {
  font-family: 'Mulish', serif;
  font-size: 16px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border: none;
}

.add-task__description__input {
  font-family: 'Mulish', serif;
  color: #646363;
  width: 100%;
  min-height: 551px;
  margin: 0 auto;
  box-sizing: border-box;
  border: none;
  resize: none;
}

.add-task__description__input:focus,
.add-task__title__input:focus {
  outline: none;
}

.add-task__button {
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

.add-task__button:hover {
  background-color: #ff9c4d;
}

.add-task__button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
