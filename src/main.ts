import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './views/App.vue';

// 创建Pinia实例
const pinia = createPinia();

// 创建Vue应用实例
const app = createApp(App);

// 使用插件
app.use(pinia);

// 挂载应用
app.mount('#app');