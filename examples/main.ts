import {createApp} from 'vue'
import App from './app.vue'
import 'many-pictures/es/style.css'
import manyPictures from 'many-pictures'

const app = createApp(App)
app.use(manyPictures)

app.mount('#app')

