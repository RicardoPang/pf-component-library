<script setup>
import PfTooltip from '@/components/lib/Tooltip/src/Tooltip.vue'
import PfButton from '@/components/lib/Button/src/Button.vue'
</script>
<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <pf-button>top-start</pf-button>
      </pf-tooltip>
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <pf-button>top</pf-button>
      </pf-tooltip>
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <pf-button>top-end</pf-button>
      </pf-tooltip>
    </div>
    <div class="row">
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <pf-button>left-start</pf-button>
      </pf-tooltip>
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <pf-button>right-start</pf-button>
      </pf-tooltip>
    </div>
    <div class="row">
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <pf-button class="mt-3 mb-3">left</pf-button>
      </pf-tooltip>
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <pf-button>right</pf-button>
      </pf-tooltip>
    </div>
    <div class="row">
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <pf-button>left-end</pf-button>
      </pf-tooltip>
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <pf-button>right-end</pf-button>
      </pf-tooltip>
    </div>
    <div class="row center">
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <pf-button>bottom-start</pf-button>
      </pf-tooltip>
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <pf-button>bottom</pf-button>
      </pf-tooltip>
      <pf-tooltip
        class="box-item"
        effect="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <pf-button>bottom-end</pf-button>
      </pf-tooltip>
    </div>
  </div>
</template>

<style lang="css">
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
