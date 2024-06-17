<template>
  <pf-menu
    :collapse="collapse"
    :data="data"
    router
    :defaultActive="route.path"
  ></pf-menu>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
// import PfMenu from 'pf-component-library'
// import PfMenu from '../../../../../components/lib/Menu/src/menu'
import type { NavSideProps } from './types'
const route = useRoute()

defineProps<{
  collapse: boolean
  data: NavSideProps[]
}>()
</script>
