import { defineStore } from 'pinia';
import moment from 'moment';
import ScheduleService from '../service/ScheduleService';
const scheduleService = new ScheduleService();
export const useScheduleStore = defineStore('storeSchedule', {
  state: () => ({
    openAppointments: []
  }),
  getters: {
    openAppointmentsDay: ({ openAppointments }) => {
      const dictionaryDate = openAppointments.reduce((acc, current) => {
        acc[current.getDate()] = current;
        return acc;
      }, {});
      return Object.values(dictionaryDate);
    }
  },
  actions: {
    async saveOpenAppointments(id, payload) {
      return await scheduleService.postOpenAppointments(id, payload);
      //return this.openAppointments;
    },
    async deleteOpenAppointments(id, item) {
      return await scheduleService.deleteAppointments(id, item);
      //return this.openAppointments;
    },
    async getOpenAppointments(id) {
      const { body } = await scheduleService.getAppointments('openAppointments', id);
      this.openAppointments = body.map((item) => new Date(item.date.seconds * 1000));
      return this.openAppointments;
    },
    async getHourClasses(id, day) {
      const { body } = await scheduleService.getClasses('openAppointments', id, day);
      return body.map((item) => {
        item.date = new Date(item.date.seconds * 1000);
        return item;
      });
    }
  }
});
