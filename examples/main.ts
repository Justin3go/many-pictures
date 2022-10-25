import {createApp} from 'vue'
import App from './app.vue'
import manyPictures from 'many-pictures'

const app = createApp(App)
app.use(manyPictures)

app.mount('#app')

