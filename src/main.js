import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

app.mount('#app');
