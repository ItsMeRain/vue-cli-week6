<template>
  <FromNavbar></FromNavbar>
  <router-view></router-view>
</template>

<script>
import FromNavbar from '@/components/FrontNavbar.vue'

export default {
  components: {
    FromNavbar
  }
}
</script>
