<template>
  <div>
    <h2>
    <p>{{info['num']}}</p>
    <p>{{info["deg"]}}</p>
  </h2>
 <button @click="decrease">decreasement</button>
  </div>
</template>

<script>
import EventBus from "../assets/js/eventBus.js"
  export default {
    name:"decreasement",
    data(){
      return {
        num:1,
        deg:180
      }
    },
     props:{
       info:{
        type:Object,
        default:function(){
          return {}
        }
      },
     },
    methods:{
     decrease(){
       EventBus.$emit("decrease",{
         num:this.num,
         deg:this.deg
       })
     }
    }
  }
</script>

<style lang="scss" scoped>

</style>