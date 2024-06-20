<template>
  <div class="news-box">
    <!-- 垂直 -->
    <pf-virtual-scroll #default="oneItem">
      <router-link class="one-new" to="/virtualScrollDetail">
        <div class="new-left">
          <h3>{{ oneItem.thisItem.name }}</h3>
          <div>
            <p>
              <span class="read">{{ oneItem.thisItem.price_format }}/晚</span>
              <span>{{ oneItem.thisItem.verify_info.messages.join('·') }}</span>
            </p>
          </div>
        </div>
        <div class="new-right">
          <img :src="oneItem.thisItem.picture_url" alt="PIC" />
        </div>
      </router-link>
    </pf-virtual-scroll>

    <!-- 水平 -->
    <!-- <pf-virtual-scroll
      :requestUrl="'http://codercba.com:1888/airbnb/api/entire/list'"
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
              {{ oneItem.thisItem.verify_info.messages.join('·') }}
            </div>
            <div class="name">{{ oneItem.thisItem.name }}</div>
            <div class="price">均价 {{ oneItem.thisItem.price_format }}/晚</div>
          </div>
        </div>
      </router-link>
    </pf-virtual-scroll> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.news-box {
  width: 100%;
  max-width: 800px;
  height: 100%;

  .one-new {
    display: flex;
    text-decoration: none;
    color: #696969;
    padding: 15px 10px;
    border-bottom: 1px solid #dedede;

    .new-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-right: 10px;
    }

    .new-left h3 {
      font-size: 16px;
    }

    .new-left div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }

    .new-left img {
      width: 15px;
      height: 15px;
      vertical-align: middle;
    }

    .new-left .read {
      margin: 0 5px;
    }

    .new-right img {
      flex: 0 0 105px;
      height: 65px;
    }
  }

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
