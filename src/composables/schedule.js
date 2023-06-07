import { computed, onBeforeMount, ref, toRaw } from 'vue';
import ScheduleService from '../service/ScheduleService';

export function useSchedule(schedule, id) {
  const scheduleService = new ScheduleService(schedule, id);
  const appointments = ref([]);

  const appointmentsDay = computed(() => {
    const dictionaryDate = appointments.value.reduce((acc, current) => {
      acc[current.date.getDate()] = current.date;
      return acc;
    }, {});

    return Object.values(dictionaryDate);
  });

  const saveAppointments = async (payload) => {
    return await scheduleService.postAppointments(payload);
  };
  const deleteAppointments = async (item) => {
    return await scheduleService.deleteAppointments(item);
  };
  const getAppointments = async () => {
    const { body } = await scheduleService.getAppointments();
    return parseDates(body);
  };
  const getHourClasses = async (day) => {
    const { body } = await scheduleService.getClasses(day);
    return parseDates(body);
  };

  const parseDates = (array) => {
    return array.map((item) => {
      item.date = new Date(item.date.seconds * 1000);
      return item;
    });
  };

  onBeforeMount(async () => {
    appointments.value = await getAppointments();
  });

  return {
    appointments: appointments,
    appointmentsDay: appointmentsDay,
    saveAppointments,
    deleteAppointments,
    getAppointments,
    getHourClasses
  };
}
