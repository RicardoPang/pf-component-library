# 组件库开发

1. 搭建vue项目 -> vite
2. 实现单个组件 -> less
3. 打包
4. 发布Npm, 测试
5. 组件文档 vuepress, 部署 github.io

6. 打包构建

- 与Vue相关的Vite插件
- Vite配置文件
- dev与build命令, 验证产物
- packge.josn 关键字段

2. TypeScript支持

- vue-tsc使用
- tsconfig配置文件
- dev与build命令, 验证产物 --- npm-run-all解决多开终端

3. VuePress文档展示

- 脚手架
- 引入组件库,调试组件

4. 测试覆盖

- Playwright脚手架
- E2E测试

5. 自动化规范

- ESLint

6. 复杂组件开发

- 设计
- TS泛型
- 复杂功能
- 复杂功能单元测试
- 列出开发计划
  - 添加手动删除
  - 添加ZIndex
  - 添加键盘关闭(esc关闭message)
  - hover到Message上不会自动关闭
  - 添加动画和样式

### 开发组件常规流程

1. 为什么选择这个组件

- 静态展示
- 简单交互
- 多种方案

2. 功能

- 展示多个Item, 有标题和内容两部分
- 点击标题可以关闭和展开内容
- 特有模式

3. 确定展示方案(数组?slot?其他?)
4. 确定属性
5. 确定事件
6. 思路分析
7. 复杂组件

- 需求分析
- 设立开发计划

### 图标库

1. fortawesome结合Vue3
   - [图标库](https://fontawesome.com/search?o=r&m=free)
   - iconfont

![image-20240609105140603](https://p.ipic.vip/oewcwj.png)

### Message

1. 使用render函数挂载在特定节点

```js
const container = document.createElement('div')
const vnode = h(MessageConstructor, props)
render(vnode, contianer)
document.body.appendChild(container.firstElementChild!)
```

2. 销毁组件实例

```js
render(null, container)
```

3. 组件动态构造并且传入属性

```js
const newProps = {
  ...props,
  onDestory: destory
}
const vnode = h(MessageConstructor, newProps)
```

4. 使用一个数组保存组件实例等信息, 并且添加对应的函数对数组进行处理

5. 计算偏移量

   ![image-20240610123434187](https://p.ipic.vip/niaje4.png)

   - top: lastBottomOffset(上一个实例留下的底部偏移) + offset
   - 为下一个实例预留bottomOffset: top + height
   - messageRef.value!.getBoundingClientRect().height
   - 使用defineExpose暴露

6. 在函数中获取这个偏移量

   - top: latBottomOffset(上一个实例留下的底部偏移) + offset
   - 为下一个实例预留bottomOffset: top + height
   - messageRef.value!.getBoundingClientRect().height
   - 使用defineExpose暴露

7. 将instances数组改为响应式: shallowReactive([])

8. 添加两个通用钩子函数

   - useZindex()
   - useEventListener()

9. 添加有趣的动画 使用transformY以及fade做出一个fade-up效果

10. 测试 函数式创建组件测试
