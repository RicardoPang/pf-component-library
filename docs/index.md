# 快速开始

#### 安装组件库

```bash
npm install pf-component-library
```

#### 引用组件库

> 在 main.js 中引用组件库

```js
// 全部引入
import 'pf-component-library/dist/index_style.css'
import PUI from 'pf-component-library'
app.use(PUI)

// 按需引入
import 'pf-component-library/dist/demo_style.css'
import { Demo } from 'pf-component-library'
app.use(Demo)
```
