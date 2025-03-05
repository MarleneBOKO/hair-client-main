import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import 'tailwindcss/tailwind.css';
import router from './router';
import store from '../store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
  // Your Toast options here
};

const app = createApp(App);

app.use(store);
app.use(Toast, options); // Register Toast plugin with options
app.use(router);

app.mount('#app');
