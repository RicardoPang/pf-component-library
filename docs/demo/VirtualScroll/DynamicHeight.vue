<script setup>
import PfVirtualScroll from '@/components/lib/VirtualScroll/src/VirtualScroll.vue'
</script>
<template>
  <div class="pf-dynamic-container">
    <div class="news-box">
      <pf-virtual-scroll
        #default="oneItem"
        :autoHeight="true"
        :estimatedItemHeight="120"
      >
        <router-link class="one-new" to="/virtualScrollDetail">
          <div class="new-left">
            <h3>
              {{ oneItem.thisItem.name }}
              {{ oneItem.thisItem.name }}
              {{ oneItem.thisItem.name }}
            </h3>
            <div>
              <p>
                <span class="read">{{ oneItem.thisItem.price_format }}/晚</span>
                <span>
                  {{ oneItem.thisItem.verify_info.messages.join('·') }}
                </span>
              </p>
            </div>
          </div>
          <div class="new-right">
            <img :src="oneItem.thisItem.picture_url" alt="PIC" />
          </div>
        </router-link>
      </pf-virtual-scroll>
    </div>
  </div>
</template>
<style lang="css" scoped>
.pf-dynamic-container {
  height: 50vh;

  .news-box {
    width: 100%;
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
  }
}
</style>
