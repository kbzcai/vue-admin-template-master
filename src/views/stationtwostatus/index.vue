<template>
  <div>
    <img :src="require('@/assets/station_pic/station2.png')" width="100%" alt="">
    <slot name="content"/>
    <div v-for="(item,index) in viewArr" class="box">
      <div class="t_line_box">
        <i class="t_l_line"></i>
        <i class="l_t_line"></i>
      </div>
      <div class="t_line_box">
        <i class="t_r_line"></i>
        <i class="r_t_line"></i>
      </div>
      <div class="t_line_box">
        <i class="l_b_line"></i>
        <i class="b_l_line"></i>
      </div>
      <div class="t_line_box">
        <i class="r_b_line"></i>
        <i class="b_r_line"></i>
      </div>
      <div class="data">
        <span class="title">工作站{{ index + 1 }}</span>
        <span class="result">A工位:{{
            item.stateA == '1' ? '运行' : item.stateA == '2' ? '待机' : item.stateA == '3' ? '报警' : '错误'
          }}
           <template v-if="item.stateA == '1'">
             <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
          </template>
            <template v-else-if="item.stateA == '2'">
             <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
          </template>
            <template v-else-if="item.stateA == '3'">
             <img :src="require('@/assets/station_pic/redlight.png')" alt="">
          </template></span>
        <span class="result">B工位:{{
            item.stateB == '1' ? '运行' : item.stateB == '2' ? '待机' : item.stateB == '3' ? '报警' : '错误'
          }}
           <template v-if="item.stateB == '1'">
             <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
          </template>
            <template v-else-if="item.stateB == '2'">
             <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
          </template>
            <template v-else-if="item.stateB == '3'">
             <img :src="require('@/assets/station_pic/redlight.png')" alt="">
          </template></span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "index",
  created() {
    this.getPlcStatus()
  },
  mounted() {
  },
  data() {
    return {
      viewArr: [
        {stateA: '', stateB: ''},
        {stateA: '', stateB: ''},
        {stateA: '', stateB: ''},
        {stateA: '', stateB: ''}]
    }
  },
  methods: {
    getPlcStatus() {
      let _this = this
      this.$axios.get('http://localhost:8181/mesPlc/getStates').then(function (response) {
        console.log(response.data)
        for (let i = 6; i < response.data.length - 5; i++) {
          if (_this.viewArr[i - 6] != undefined) {
            _this.viewArr[i - 6].stateA = response.data[i].stateA
            _this.viewArr[i - 6].stateB = response.data[i].stateB
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.data {
  position: relative;
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 300px;
  padding: 0px;
  margin: 0px;
}

.data .title {
  display: block;
  margin-top: 20px;
  font-size: 55px;
  font-family: '华文仿宋'
}

.data .result {
  display: block;
  margin-top: 40px;
  font-size: 33px;
  font-family: '华文仿宋'
}

.box {
  width: 13%;
  margin-left: 9.5%;
  height: 300px;
  margin-top: 30px;
  display: inline-block;
}

.l_t_line {
  width: 5px;
  height: 24px;
  left: -3px;
  top: -3px;
  opacity: 0.5;
}

.t_l_line {
  height: 5px;
  width: 26px;
  left: -3px;
  top: -3px;
  opacity: 0.5;
}

.t_line_box {
  position: absolute;
  width: 13%;
  height: 300px;
}

.t_line_box i {
  background-color: #4788fb;
  box-shadow: 0px 0px 10px #4788fb;
  position: absolute;
}

.t_r_line {
  height: 5px;
  width: 26px;
  right: -3px;
  top: -3px;
  opacity: 0.5;
}

.r_t_line {
  width: 5px;
  height: 24px;
  right: -3px;
  top: -3px;
  opacity: 0.5;
}

.l_b_line {
  width: 5px;
  height: 24px;
  left: -3px;
  bottom: -3px;
  opacity: 0.5;
}

.b_l_line {
  height: 5px;
  width: 26px;
  left: -3px;
  bottom: -3px;
  opacity: 0.5;
}

.r_b_line {
  width: 5px;
  height: 24px;
  right: -3px;
  bottom: -3px;
  opacity: 0.5;
}

.b_r_line {
  height: 5px;
  width: 26px;
  right: -3px;
  bottom: -3px;
  opacity: 0.5;
}
</style>
