<script>
import TriggerLoad from './TriggerLoad.vue';
export default {
  components: {
    TriggerLoad,
  },
  data() {
    return {
      selectedDate: new Date().toLocaleDateString().split('/').reverse().join('-'),
      additionalDays: 0,
      loadMore: false,
    };
  },
  props: {
    tasks: {
      type: Array,
      required: false,
      default: () => [],
    },
    startDate: {
      type: String,
      required: false,
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
    loadMoreDays() {
      this.loadMore = true;
      this.additionalDays += 30;
    },
    scrollToCurrentDay() {
      const currentDayElement = this.$refs.calendarContainer.querySelector('.current');
      if (currentDayElement) {
        currentDayElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        });
      }
    },
  },
  computed: {
    daysToRender() {
      const now = new Date();
      const totalDaysToRender = 30 + this.additionalDays;
      const startDate = new Date(this.startDate);

      const days = [];

      let daysBetween = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));
      if (new Date(this.startDate).toLocaleDateString('en-CA') === now.toLocaleDateString('en-CA'))
        daysBetween = 0;
      for (let i = daysBetween; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        days.push({
          date: date.getDate(),
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dateForFilter: date.toLocaleDateString('en-CA'),
          doneNotIndicators: this.doneNotIndicators(date.toLocaleDateString('en-CA')),
        });
      }
      for (let i = 1; i <= totalDaysToRender; i++) {
        const date = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + i,
        );
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
  mounted() {
    this.scrollToCurrentDay();
  },
};
</script>

<template>
  <div class="calendar" ref="calendarContainer">
    <div class="calendar__container">
      <div v-for="(day, index) in daysToRender" :key="index">
        <div
          class="calendar__container__item"
          :class="{
            active: selectedDate === day.dateForFilter,
            sunday: day.dayName === 'Sun' && selectedDate !== day.dateForFilter,
            current: day.dateForFilter === new Date().toLocaleDateString('en-CA'),
          }"
          @click="changeDate(day.dateForFilter)"
        >
          <div class="calendar__container__item__day">{{ day.dayName }}</div>
          <div class="calendar__container__item__date">{{ day.date }}</div>
        </div>
        <div class="calendar__dots">
          <div v-if="day.doneNotIndicators.notDone" class="calendar__dot not"></div>
          <div v-if="day.doneNotIndicators.done" class="calendar__dot done"></div>
        </div>
      </div>
      <TriggerLoad @intersected="loadMoreDays" />
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
  width: 100%;
}

.calendar__container::-webkit-scrollbar {
  display: none;
}

.calendar__container__item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid var(--border-calendar-color);
  border-radius: 15px;
  min-width: 50px;
  max-width: 50px;
  width: 100%;
  height: 55px;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.4s ease;
}

.calendar__container__item:not(.active):hover {
  background-color: var(--bg-color-calendar-hover);
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
  color: var(--text-secondary-color);
  transition: all 0.4s ease;
}

.calendar__container__item__date {
  font-weight: bold;
  color: var(--text-main-color);
  transition: all 0.4s ease;
}

.active {
  background-color: var(--bg-color-calendar-selected);
  transition: all 0.4s ease;
}

.active .calendar__container__item__date {
  color: var(--bg-color);
  transition: all 0.4s ease;
}

.active .calendar__container__item__day {
  color: var(--text-secondary-color);
  transition: all 0.4s ease;
}

.sunday {
  border-color: rgb(255, 145, 0);
  color: rgb(255, 145, 0);
}
</style>
