<script setup>
import PfVirtualScroll from '@/components/lib/VirtualScroll/src/VirtualScroll.vue'
</script>
<template>
  <div class="pf-vertical-container">
    <pf-virtual-scroll
      :scrollDirection="'horizontal'"
      :oneWidth="250"
      #default="oneItem"
    >
      <router-link class="one-house" to="/virtualScrollDetail">
        <div class="house-item">
          <div class="inner">
            <div class="cover">
              <img :src="oneItem.thisItem.picture_url" alt="" />
            </div>
            <div class="desc">
              {{ oneItem.thisItem.reviews_count }}
            </div>
            <div class="name">{{ oneItem.thisItem.name }}</div>
            <div class="price">均价 {{ oneItem.thisItem.price_format }}/晚</div>
          </div>
        </div>
      </router-link>
    </pf-virtual-scroll>
  </div>
</template>
<style lang="css" scoped>
.pf-vertical-container {
  height: 380px;

  .one-house {
    width: 100%;

    .house-item {
      box-sizing: border-box;
      width: 250px;
      height: 350px;
      padding: 8px;
      margin: 8px 0px;
    }

    .cover {
      position: relative;
      box-sizing: border-box;
      padding: 66.66% 8px 0px;
      border-radius: 3px;
      overflow: hidden;
    }

    .cover > img {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .desc {
      margin: 10px 0px 5px;
      font-size: 12px;
      font-weight: 700;
      color: rgb(57, 87, 106);
    }

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      margin: 8px 0px;
    }
  }
}
</style>
