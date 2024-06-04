# Card 卡片

### 实例

<PFCard imgSrc="/house.jpeg" summary="Test" />

### 代码

```html
<PFCard imgSrc="/house.jpeg" summary="Test" />
```

### Card 属性

| 参数      | 说明         | 类型        | 是否必要 | 默认值 |
| --------- | ------------ | ----------- | -------- | ------ |
| width     | 卡片宽度     | number      | false    | -      |
| imgSrc    | 图片资源地址 | string      | true     | -      |
| imgHeight | 图片高度     | number      | false    | -      |
| summary   | 卡片概要     | string/slot | false    | -      |
| footer    | 卡片底部     | slot        | false    | -      |

### Card 插槽

| 插槽名  | 说明               |
| ------- | ------------------ |
| default | 自定义卡片概要内容 |
| footer  | 自定义卡片底部组件 |
