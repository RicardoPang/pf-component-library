# Button 按钮

### 基础用法

<div class="demo-block demo-button">
  <div class="row-btns">
    <PFButton>默认按钮</PFButton>
    <PFButton type="primary">按钮</PFButton>
    <PFButton type="success">按钮</PFButton>
    <PFButton type="warning">按钮</PFButton>
    <PFButton type="danger">按钮</PFButton>
    <PFButton type="info">按钮</PFButton>
  </div>
  <br />
  <div class="row-btns">
    <PFButton plain>朴素按钮</PFButton>
    <PFButton type="primary" plain>按钮</PFButton>
    <PFButton type="success" plain>按钮</PFButton>
    <PFButton type="warning" plain>按钮</PFButton>
    <PFButton type="danger" plain>按钮</PFButton>
    <PFButton type="info" plain>按钮</PFButton>
  </div>

<div class="code-container">
  <details>
    <summary>显示代码</summary>

```html
<PFButton>默认按钮</PFButton>
<PFButton type="primary">按钮</PFButton>
<PFButton type="success">按钮</PFButton>
<PFButton type="warning">按钮</PFButton>
<PFButton type="danger">按钮</PFButton>
<PFButton type="info">按钮</PFButton>

<PFButton plain>朴素按钮</PFButton>
<PFButton type="primary" plain>按钮</PFButton>
<PFButton type="success" plain>按钮</PFButton>
<PFButton type="warning" plain>按钮</PFButton>
<PFButton type="danger" plain>按钮</PFButton>
<PFButton type="info" plain>按钮</PFButton>
```

  </details>

</div>
</div>

### 禁用状态

<div class="demo-block demo-button">
<div class="row-btns">
  <PFButton disabled>默认按钮</PFButton>
  <PFButton type="primary" disabled>按钮</PFButton>
  <PFButton type="success" disabled>按钮</PFButton>
  <PFButton type="warning" disabled>按钮</PFButton>
  <PFButton type="danger" disabled>按钮</PFButton>
  <PFButton type="info" disabled>按钮</PFButton>
</div>
<br />
<div class="row-btns">
  <PFButton plain disabled>朴素按钮</PFButton>
  <PFButton type="primary" plain disabled>按钮</PFButton>
  <PFButton type="success" plain disabled>按钮</PFButton>
  <PFButton type="warning" plain disabled>按钮</PFButton>
  <PFButton type="danger" plain disabled>按钮</PFButton>
  <PFButton type="info" plain disabled>按钮</PFButton>
</div>

<div class="code-container">
<details>
  <summary>显示代码</summary>

```html
<PFButton>默认按钮</PFButton>
<PFButton type="primary">按钮</PFButton>
<PFButton type="success">按钮</PFButton>
<PFButton type="warning">按钮</PFButton>
<PFButton type="danger">按钮</PFButton>
<PFButton type="info">按钮</PFButton>

<PFButton plain>朴素按钮</PFButton>
<PFButton type="primary" plain>按钮</PFButton>
<PFButton type="success" plain>按钮</PFButton>
<PFButton type="warning" plain>按钮</PFButton>
<PFButton type="danger" plain>按钮</PFButton>
<PFButton type="info" plain>按钮</PFButton>
```

</details>

</div>
</div>

### 图标按钮

<div class="demo-block demo-button">
<div class="row-btns">
    <PFButton round icon="settings">按钮</PFButton>
    <PFButton type="primary" round icon="bluetoothon">按钮</PFButton>
    <PFButton type="success" round icon="cook">按钮</PFButton>
    <PFButton type="warning" round icon="infopersonal">按钮</PFButton>
    <PFButton type="danger" round icon="clock">按钮</PFButton>
    <PFButton type="info" round icon="address">按钮</PFButton>
</div>
<br />
<div class="row-btns">
    <PFButton plain circle icon="settings"></PFButton>
    <PFButton plain type="primary" circle icon="bluetoothon"></PFButton>
    <PFButton plain type="success" circle icon="cook"></PFButton>
    <PFButton plain type="warning" circle icon="infopersonal"></PFButton>
    <PFButton plain type="danger" circle icon="clock"></PFButton>
    <PFButton plain type="info" circle icon="address"></PFButton>
</div>

<div class="code-container">
<details>
  <summary>显示代码</summary>

```html
<PFButton round icon="settings">按钮</PFButton>
<PFButton type="primary" round icon="bluetoothon">按钮</PFButton>
<PFButton type="success" round icon="cook">按钮</PFButton>
<PFButton type="warning" round icon="infopersonal">按钮</PFButton>
<PFButton type="danger" round icon="clock">按钮</PFButton>
<PFButton type="info" round icon="address">按钮</PFButton>

<PFButton plain circle icon="settings"></PFButton>
<PFButton plain type="primary" circle icon="bluetoothon"></PFButton>
<PFButton plain type="success" circle icon="cook"></PFButton>
<PFButton plain type="warning" circle icon="infopersonal"></PFButton>
<PFButton plain type="danger" circle icon="clock"></PFButton>
<PFButton plain type="info" circle icon="address"></PFButton>
```

</details>
</div>
</div>

### Button 属性

| 参数     | 说明                                          | 类型    | 默认值 |
| -------- | --------------------------------------------- | ------- | ------ |
| type     | 按钮类型(primary/success/warning/danger/info) | string  | -      |
| plain    | 是否为朴素按钮                                | boolean | false  |
| round    | 是否为圆角按钮                                | boolean | false  |
| circle   | 是否为图形按钮                                | boolean | false  |
| disabled | 是否为禁用按钮                                | boolean | false  |
| icon     | 图标类名                                      | string  | -      |

### Button 方法

| 事件名 | 事件描述 |
| ------ | -------- |
| click  | 点击事件 |
