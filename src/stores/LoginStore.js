import LoginService from '../service/LoginService';
import { defineStore, acceptHMRUpdate } from 'pinia';
import StudentsService from '../service/StudentsService';

export const useLoginStore = defineStore('storeLogin', {
  state: () => ({
    user: {}
  }),
  actions: {
    async create({ email, password, type }) {
      const payload = {
        email,
        type
      };
      const authService = new LoginService(email, password);
      const studentService = new StudentsService();
      try {
        const { success, body } = await authService.create();
        payload.id = body.user.uid;
        await studentService.post(payload).catch((e) => {
          body.user.delete();
          return studentService.failure(e);
        });

        return { success };
      } catch (error) {
        return error;
      }
    },

    signIn(email, password) {
      const service = new LoginService(email, password);
      
      return (this.user = service.signIn());
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
