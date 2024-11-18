<script>
export default {
  data() {
    return {
      selectedDate: new Date().toISOString().split('T')[0],
    };
  },
  props: {
    tasks: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  watch: {
    selectedDate: {
      handler() {
        console.log(this.selectedDate);
        this.$emit('changed-date', this.selectedDate);
      },
      immediate: true,
    },
  },
  methods: {
    changeDate(newDate) {
      this.selectedDate = newDate;
      this.$emit('changed-date', newDate);
    },
    doneNotIndicators(date) {
      let obj = {
        notDone: false,
        done: false,
      };
      this.tasks.forEach((task) => {
        if (task.date === date) {
          if (task.done) {
            obj.done = true;
          } else {
            obj.notDone = true;
          }
        }
      });
      return obj;
    },
  },
  computed: {
    daysToRender() {
      const now = new Date();
      const curDay = now.getDate();
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const days = [];
      for (let j = curDay; j <= daysInMonth; j++) {
        const date = new Date(now.getFullYear(), now.getMonth(), j);
        days.push({
          date: date.getDate(),
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dateForFilter: date.toLocaleDateString('en-CA'),
          doneNotIndicators: this.doneNotIndicators(date.toLocaleDateString('en-CA')),
        });
      }
      return days;
    },
  },
};
</script>

<template>
  <div class="calendar">
    <div class="calendar__container">
      <div v-for="(day, index) in daysToRender" :key="index">
        <div class="calendar__container__item" @click="changeDate(day.dateForFilter)">
          <div class="calendar__container__item__day">{{ day.dayName }}</div>
          <div class="calendar__container__item__date">{{ day.date }}</div>
        </div>
        <div class="calendar__dots">
          <div v-if="day.doneNotIndicators.notDone" class="calendar__dot not"></div>
          <div v-if="day.doneNotIndicators.done" class="calendar__dot done"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar__container {
  display: flex;
  flex-direction: row;
  overflow: auto;
  gap: 25px;
  padding: 0;
  max-width: 420px;
}

.calendar__container::-webkit-scrollbar {
  display: none;
}

.calendar__container__item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 15px;
  min-width: 50px;
  max-width: 50px;
  width: 100%;
  height: 55px;
  cursor: pointer;
}

.calendar__container__item + .calendar__dots {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 5px;
}

.calendar__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.calendar__dot.done {
  background-color: rgb(255, 115, 0);
}

.calendar__dot.not {
  background-color: rgb(155, 76, 11);
}

.calendar__container__item__day {
  font-size: 13px;
  color: #646363;
}

.calendar__container__item__date {
  font-weight: bold;
}
</style>
