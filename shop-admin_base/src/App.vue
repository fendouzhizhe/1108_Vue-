<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
  // async mounted() {
  //   const result = await this.$API.trademark.getTrademarkList(1, 3)
  //   console.log(result)
  // }
}
</script>
