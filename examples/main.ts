import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'

library.add(fas)
import 'normalize.css'
import '../components/css/index.css'

// 全局
import Components from '../components/lib'

// 按需
// import '../components/css/vars.css'
// import '../components/css/reset.css'
// import '../components/lib/button/src/style.css'
// import '../components/lib/icon/src/style.css'
// import '../components/lib/collapse/src/style.css'
// import { Button, Icon, Collapse } from '../components/lib'

const app = createApp(App)

// 全局
app.use(Components)

// 按需
// app.use(Button)
// app.use(Icon)
// app.use(Collapse)

app.mount('#app')
