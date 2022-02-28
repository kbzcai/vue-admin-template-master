<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true,
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      const _this=this
      this.$nextTick(function (){
        _this.isRouterAlive=true
      })
    }
  },
}
</script>
