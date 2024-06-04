import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'

// 字体图标
// import '../components/css/fonts/iconfont.css'

// 全局
// import '../components/css/index.less'
// import Components from '../components/lib'

// 按需
import '../components/css/demo.less'
import '../components/css/card.less'
import '../components/css/button.less'
import { Demo, Card, Button, Icon } from '../components/lib'

const app = createApp(App)

// 按需
app.use(Demo)
app.use(Card)
app.use(Button)
app.use(Icon)

// 全局
// app.use(Components)

app.mount('#app')
