<template>
  <div class="app">
    <h2>pf-component-library组件库</h2>
    <PFDemo :width="300" />
    <PFCard
      imgSrc="house.jpeg"
      summary="制定规范的目的在于保证质量、 方便业务方使用和增加组件库的可扩展性"
    />
    <br />
    <PFCard
      imgSrc="house.jpeg"
      summary="制定规范的目的在于保证质量、 方便业务方使用和增加组件库的可扩展性"
    >
      <template #footer>
        <div class="footer">
          <div class="level">高级 - 3层楼</div>
          <div class="price">¥ 666.00</div>
        </div>
      </template>
    </PFCard>
    <br />
    <PFCard imgSrc="https://p.ipic.vip/bvhtao.jpg" :width="370" :imgHeight="90">
      制定规范的目的在于保证质量、 方便业务方使用和增加组件库的可扩展性
      <template #footer>
        <div class="footer-spring">
          <div class="level">高级 - 3层楼</div>
          <div class="level">666收藏</div>
        </div>
      </template>
    </PFCard>
    <br />
    <div class="row-btns">
      <PFButton>按钮</PFButton>
      <PFButton type="primary">按钮</PFButton>
      <PFButton type="success">按钮</PFButton>
      <PFButton type="warning">按钮</PFButton>
      <PFButton type="danger">按钮</PFButton>
      <PFButton type="info">按钮</PFButton>
    </div>
    <br />
    <div class="row-btns">
      <PFButton plain>按钮</PFButton>
      <PFButton type="primary" plain>按钮</PFButton>
      <PFButton type="success" plain>按钮</PFButton>
      <PFButton type="warning" plain>按钮</PFButton>
      <PFButton type="danger" plain>按钮</PFButton>
      <PFButton type="info" plain>按钮</PFButton>
    </div>
    <br />
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
    <br />
    <div class="row-btns">
      <PFButton plain circle @click="handleClose">
        <i class="one-icon-close"></i>
      </PFButton>
    </div>

    <br />
    <div class="row-btns">
      <PFButton disabled>按钮</PFButton>
      <PFButton type="primary" disabled>按钮</PFButton>
      <PFButton type="success" disabled>按钮</PFButton>
      <PFButton type="warning" disabled>按钮</PFButton>
      <PFButton type="danger" disabled>按钮</PFButton>
      <PFButton type="info" disabled>按钮</PFButton>
    </div>
    <br />
    <div class="row-btns">
      <PFButton plain disabled>按钮</PFButton>
      <PFButton type="primary" plain disabled>按钮</PFButton>
      <PFButton type="success" plain disabled>按钮</PFButton>
      <PFButton type="warning" plain disabled>按钮</PFButton>
      <PFButton type="danger" plain disabled>按钮</PFButton>
      <PFButton type="info" plain disabled>按钮</PFButton>
    </div>

    <br />
    <PFIcon :name="'bluray'"></PFIcon>
    <PFIcon :name="'eye_protection'" size="48" color="#f00"></PFIcon>
    <PFIcon :name="'address1'" :size="24" color="blue"></PFIcon>
  </div>
</template>

<script setup lang="ts">
const handleClose = (e: MouseEvent) => {
  console.log('close', e)
}
</script>

<style scoped>
.app {
  padding: 20px;
  color: #333;
}

.footer {
  padding: 0 8px;
  font-size: 12px;
  text-align: left;
}

.level {
  color: #9199a1;
  margin-bottom: 8px;
}

.price {
  color: #f01414;
}

.footer-spring {
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 12px;
}

.row-btns {
  margin-bottom: 8px;
}

.p-button {
  margin-right: 10px;
}
</style>
