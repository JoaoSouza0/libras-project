import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import { setupCalendar } from 'v-calendar';

import registerGlobalComponent from '@/components/Base/';

const app = createApp(App);

registerGlobalComponent(app);

app.use(createPinia()).use(router).use(setupCalendar, {}).mount('#app');
