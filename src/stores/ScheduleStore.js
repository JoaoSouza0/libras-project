import { defineStore } from 'pinia';
import moment from 'moment';
import ScheduleService from '@/service/ScheduleService';

export const useScheduleStore = defineStore('storeSchedule', {
  state: () => ({
    openAppointments: []
  }),
  getters: {
    openAppointmentsDay: ({ openAppointments }) => {
      const dictionaryDate = openAppointments.reduce((acc, current) => {
        acc[current.date.getDate()] = current.date;
        return acc;
      }, {});

      return Object.values(dictionaryDate);
    }
  },
  actions: {
    async getOpenAppointments(id) {
      const scheduleService = new ScheduleService();
      const { body } = await scheduleService.getAppointments('openAppointments', id);
      this.openAppointments = body.map((item) => ({
        id: item.id,
        date: new Date(item.date.seconds * 1000)
      }));
      return this.openAppointments;
    },
    async getHourClasses(id, day) {
      const scheduleService = new ScheduleService();
      const { body } = await scheduleService.getClasses('openAppointments', id, day);

      return body.map((item) => ({
        id: item.id,
        date: moment(item.date.seconds * 1000).format('HH:mm:ss')
      }));
    },
    deleteNote(id) {
      return (this.notes = this.notes.filter((note) => note.id != id));
    },
    editNote({ id, content }) {
      const index = this.notes.findIndex((item) => item.id === id);
      return (this.notes[index].content = content);
    }
  }
});
