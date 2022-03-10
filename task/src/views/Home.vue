<template>
  <div class="home text-center">
    <div class="">
      <span>UniqueId: {{ $store.state.uniqueId }}</span> |
      <span>Mode: {{ $store.state.mode }}</span> |
      <span>Condition: {{ $store.state.condition }}</span>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created() {
    
  }
}
</script>
