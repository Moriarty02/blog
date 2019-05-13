<template>
  <div>
    <h2>
    <p>{{info['num']}}</p>
    <p>{{info["deg"]}}</p>
  </h2>
 <button @click="increase">increasement</button>
  </div>
</template>

<script>
import EventBus from "../assets/js/eventBus.js"

  export default {
    name:"increasement",
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
      }
    },
  
    methods:{
      increase(){
        EventBus.$emit("increase",{
          num:this.num,
          deg:this.deg
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>