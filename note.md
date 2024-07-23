### 组件开发方法论

- 根据需求初步去定属性/事件/slots/expose
- 组件的静态版本(html,classes,slots)
- 行为功能做成开发计划列表
- 根据列表完成功能
- 样式/测试

### 问题记录

1. 将 vue 和 vue-router 放在 peerDependencies 中，以确保项目使用者自行安装这些依赖，从而避免版本冲突。
2. 注释建议用 TSDoc 的格式去写, TS文档标准, 代码导航 HTML文档生成 提高可读性

### Vite搭建项目

- 启动快
- HMR支持
- 默认支持TS JSX CSS等
- 多种打包模式支持
- 通用插件
- 底层API支持TS

### 样式

- postcss https://postcss/org 变量, 嵌套, 循环, mixin
- css自定义变量 var(--xxx)
- postcss 插件
  - postcss each https://github.com/madyankin/postcss-each
  - postss for https://github.com/antyakushev/postcss-for
  - postcss mixin https://github.com/iamstarkov/postcss-color-mix
  - post each variables https://github.com/awcross/postcss-each-variables
- 设计 https://ant.design/docs/spec/colors-cn

### 测试 Vitest + Vue-test-utils2

- 基于Vite而生, 兼容Jest语法
- ESM TS JSX 原生支持
- 功能
  - 断言
  - 内置chai 兼容jest expect
  - mock https://cn.vitest.dev/guide/mocking
  - 代码覆盖率
  - snapshot

### Button

- 按钮组件, 支持多种类型、大小和样式, 可以显示图标、加载状态并可以配置为不同HTML原生按钮类型
- TypeScript定义类型和接口,响应式数据,依赖注入使用defineExpose公共组件实例方法和属性
- CSS: 使用变量定制, 响应式类名
- 本质就是class名称的组合

### Icon

- 图标组件, 基于FontAwesome, 雨荨通过多种属性自定一图标的外观和行为
- 集成 FontAwesome 图标库，实现丰富的图标展示功能
- 使用 omit 函数过滤不需要的属性，简化属性传递
- inline svg 对比 fonticon
  - svg可控 fonticon只能控制字符相关属性
  - fonticon文件较大 除非切割打包
  - 图标库 https://fontawesome.com/search?o=r&m=free

### Collapse

- 可折叠面板组件, 支持手风琴模式和多选模式
- 依赖注入: provide和inject实现组件间的上下文共享
- 响应式数据: ref和computed创建
- 动画过度: Transition组件实现折叠动画
- TypeScript: 定义类型和接口
- 实现
  - 维护可变响应式数组items 代表打开的item ref(['a'])
  - 点击item 对数组的项进行添加或删除
  - 在item内部判断当前的name是否存在数组中 判断是否打开或关闭
  - 难点: 使用provide/inject将对应的父组件Collapse属性传递给Item(slot不好传递)
  - 支持v-model
  - 支持动画

### Tooltip

- 提示组件, 基于Popper.j实现弹出位置精确控制, 允许用户通过多种触发方式显示和隐藏
- 使用Popper.js实现弹出位置的精确控制
- 使用debounce函数处理打开和关闭的延迟
- 使用自定义Hook useClickOutside处理点击外部关闭逻辑
- 不同位置弹出, 兼容视窗边界

### Dropdown

- 下拉菜单, 基于Tooltip构建, 允许通过点击或悬停触发菜单, 并在菜单中选择选项
- 使用defineExpose公共组件实例方法和属性
- Popper.js 实现弹出位置的精确控制
- 使用RenderVnode动态渲染菜单项内容

### Select

- 下拉组件, 允许用户从预定义选项列表选择, 支持过滤、远程搜索、清除选项等
- 使用Popper.js实现弹出位置的精确控制
- 使用throttle函数处理输入过滤的节流
- 使用自定义Hook useClickOutside处理点击外部关闭逻辑

### Switch

- 开关组件, 允许在两种状态切换, 支持显示不同文本

### Input

- 输入框支持多种类型输入, 包括文本和文本区域, 提供多种功能清除按钮、占位符、密码切换登
- 通过插槽机制，支持自定义前缀、后缀、前置和后置内容
- 通过inject获取表单上下文，实现输入框的表单验证功能

### Message

- 消息提示用于显示临时通知或提示信息, 支持多种类型(成功、信息、警告、错误),并可以自动关闭或手动关闭

- 使用render和h动态创建和渲染消息组件实例

- 使用自定义Hook useEventListener处理键盘事件监听

- 难点:

  - 使用函数式创建组件 createMessage

  - 弹出多个提示, 旧提示根据新的提示向下移动位置

    ![image-20240709233701734](https://p.ipic.vip/05esuq.png)

### Form

- 表单和表单项用于构建和验证表单, 支持多种验证规则和触发方式, 并可以动态增加和移除表单项
- 使用async-validator实现表单验证功能
  -provide和inject实现组件间的上下文共享

### VirtualScroll

- 虚拟滚动组件, 仅渲染当前视口内的项目, 提高大列表渲染性能, 减少DOM节点数量, 支持垂直和水平滚动, 并支持动态计算每个项目的高度
- 节流监听滚动事件
- 动态设置上下空白占位解决滚动抖动问题
- 设置上下缓冲区域消除快速滚动白屏
- 路由切换时保持滚动位置
- 滚动自动加载数据
- 横屏滚动实现虚拟滚动
- 计算当前滚动位置和容器尺寸, 仅渲染可见范围内的项目
- ResizeObserver观察每个项目的尺寸变化并记录高度
- 监听窗口大小和设备方向的变化, 动态调整容器和项目的尺寸

### Tree

- 高效、可扩展的树形数据结构展示, 支持大佬数据的展示和操作, 包括节点的选中、拖拽、展开/折叠等功能, 同时还支持关键词搜索和过滤
- 点击节点以及节点的视觉样式通过树操作实现(优化: 通过更改DOM结构为平级结构, 点击节点以及节点的视觉样式通过操作list数据实现?)
- 使用虚拟长列表仅渲染可见范围内的项目
- ts设计数据结构 TreeNode BigData
- 虚拟滚动 renderList
- 关键词搜索和过滤 filter
- 节点展开/折叠 expand
- 节点选中状态管理 checked
- 节点拖拽操作 drag drop
- 数据初始化和更新 init setData

### 补充

1. 单元测试 Vitest + Vue-test-utils2 自动化完成流程 更早发现 Bug 重构和升级可靠
2. 打包 Rollup/Vite 和 Npm 发布
3. 将组件渲染到 Dom 节点 使用 render 函数 通过 vNode 拿到组件实例

- 虚拟 dom 不必和真实的 DOM 节点打交道, 更新效率高, 计算最小化操作完成更新
- h 和 createVnode 都可以创建 vnode

4. ESLint 规范代码格式 Vite 添加 ESLint 插件(配置文件\运行)
5. 知识点

- Provide/inject
- v-model 实现, 它是属性 modelValue 和事件 update:modelValue 的语法糖. 注意属性赋值给内部响应式对象的更新问题(使用 watch) https://cn.vuejs.org/guide/components/v-model.html#component-v-model
- slots 语义化 复杂节点 provide/inject 传递数据
- Transition 提供 classes 标示整个动画过程 https://cn.vuejs.org/guide/built-ins/transition.html
