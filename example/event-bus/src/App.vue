<template>
  <div id="app">
  <p>num:{{num}}</p>
  <p>deg:{{deg}}</p>
  <IncreaseMent :info="{num,deg}"/>
  <DecreaseMent :info="{num,deg}"/>
  </div>
</template>

<script>
import EventBus from "./assets/js/eventBus.js"

import IncreaseMent from "./components/increasement.vue"
import DecreaseMent from "./components/decreasement.vue"
export default {
  name: 'app',
  data(){
    return {
      num:100,
      deg:0
    }
  },
  components: {
    IncreaseMent,
    DecreaseMent
  },
 
  mounted(){
    EventBus.$on("increase",payload=>{
      this.$nextTick(()=>{
         this.num+=payload.num;
         this.deg+=payload.deg
      })
    })
    EventBus.$on("decrease",payload=>{
      this.$nextTick(()=>{
        this.num-=payload.num;
        this.deg-=payload.deg
      })
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
