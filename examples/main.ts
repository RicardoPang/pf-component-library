import { createApp } from 'vue'
import 'normalize.css'
import App from './App.vue'
import router from './router/index.ts'

const app = createApp(App)
app.use(router)

// 全部引入
// import 'pf-component-library/dist/index_style.css'
// import PUI from 'pf-component-library'
import '../components/css/index.css'
import PUI from '../components/lib'
app.use(PUI)

// 按需引入
// import 'pf-component-library/dist/es/Button_style.css'
// import 'pf-component-library/dist/es/Collapse_style.css'
// import 'pf-component-library/dist/es/Dropdown_style.css'
// import 'pf-component-library/dist/es/Icon_style.css'
// import 'pf-component-library/dist/es/Message_style.css'
// import 'pf-component-library/dist/es/Tooltip_style.css'
// import 'pf-component-library/dist/es/Input_style.css'
// import 'pf-component-library/dist/es/Select_style.css'
// import 'pf-component-library/dist/es/Switch_style.css'
// import 'pf-component-library/dist/es/Form_style.css'
// import 'pf-component-library/dist/es/Menu_style.css'
// import {
//   Button,
//   Collapse,
//   Dropdown,
//   Icon,
//   Message,
//   Tooltip,
//   Input,
//   Select,
//   Switch,
//   Form,
//   Menu
// } from 'pf-component-library'
// app.use(Button)
// app.use(Collapse)
// app.use(Dropdown)
// app.use(Icon)
// app.use(Message)
// app.use(Tooltip)
// app.use(Input)
// app.use(Select)
// app.use(Switch)
// app.use(Form)
// app.use(Menu)

app.mount('#app')
