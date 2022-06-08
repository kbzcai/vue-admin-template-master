<template>
  <div>
    <img :src="require('@/assets/station_pic/station1.png')" width="100%" alt="">
    <slot name="content"/>
    <!--这是前面的-->
    <!--    <div class="box">-->
    <!--      <div class="t_line_box">-->
    <!--        <i class="t_l_line"></i>-->
    <!--        <i class="l_t_line"></i>-->
    <!--      </div>-->
    <!--      <div class="t_line_box">-->
    <!--        <i class="t_r_line"></i>-->
    <!--        <i class="r_t_line"></i>-->
    <!--      </div>-->
    <!--      <div class="t_line_box">-->
    <!--        <i class="l_b_line"></i>-->
    <!--        <i class="b_l_line"></i>-->
    <!--      </div>-->
    <!--      <div class="t_line_box">-->
    <!--        <i class="r_b_line"></i>-->
    <!--        <i class="b_r_line"></i>-->
    <!--      </div>-->
    <!--      <div class="data">-->
    <!--        <span class="title">工作站1</span>-->
    <!--        <span class="result">A工位:{{ state1a == '1' ? '运行中' : state1a == '2' ? '待机' : state1a == '3' ? '报警' : '错误' }}-->
    <!--         <template v-if="state1a == '1'">-->
    <!--           <img :src="require('@/assets/station_pic/green_light.png')" alt="">-->
    <!--        </template>-->
    <!--          <template v-else-if="state1a == '2'">-->
    <!--           <img :src="require('@/assets/station_pic/yellow_light.gif')" alt="">-->
    <!--        </template>-->
    <!--          <template v-else-if="state1a == '3'">-->
    <!--           <img :src="require('@/assets/station_pic/red_light.gif')" alt="">-->
    <!--        </template></span>-->
    <!--        <span class="result">B工位:{{ state1b == '1' ? '运行中' : state1b == '2' ? '待机' : state1b == '3' ? '报警' : '错误' }}-->
    <!--         <template v-if="state1b == '1'">-->
    <!--           <img :src="require('@/assets/station_pic/green_light.png')" alt="">-->
    <!--        </template>-->
    <!--          <template v-else-if="state1b == '2'">-->
    <!--           <img :src="require('@/assets/station_pic/yellow_light.gif')" alt="">-->
    <!--        </template>-->
    <!--          <template v-else-if="state1b == '3'">-->
    <!--           <img :src="require('@/assets/station_pic/red_light.gif')" alt="">-->
    <!--        </template></span>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--这是后面的-->
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
             <img :src="require('@/assets/station_pic/green_light.png')" alt="">
          </template>
            <template v-else-if="item.stateA == '2'">
             <img :src="require('@/assets/station_pic/yellow_light.gif')" alt="">
          </template>
            <template v-else-if="item.stateA == '3'">
             <img :src="require('@/assets/station_pic/red_light.gif')" alt="">
          </template></span>
        <span class="result">B工位:{{
            item.stateB == '1' ? '运行' : item.stateB == '2' ? '待机' : item.stateB == '3' ? '报警' : '错误'
          }}
           <template v-if="item.stateB == '1'">
             <img :src="require('@/assets/station_pic/green_light.png')" alt="">
          </template>
            <template v-else-if="item.stateB == '2'">
             <img :src="require('@/assets/station_pic/yellow_light.gif')" alt="">
          </template>
            <template v-else-if="item.stateB == '3'">
             <img :src="require('@/assets/station_pic/red_light.gif')" alt="">
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
      // state1a: '',
      // state1b: '',
      // state2a: '',
      // state2b: '',
      // state3a: '',
      // state3b: '',
      // state4a: '',
      // state4b: '',
      // state5a: '',
      // state5b: '',
      // state6a: '',
      // state6b: '',
      viewArr: [
        {stateA: '', stateB: ''},
        {stateA: '', stateB: ''},
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
        for (let i = 0; i < response.data.length - 9; i++) {
          if (_this.viewArr[i] != undefined) {
            _this.viewArr[i].stateA = response.data[i].stateA
            _this.viewArr[i].stateB = response.data[i].stateB
          }
        }
        // _this.state1a = response.data[0].stateA
        // _this.state1b = response.data[0].stateB
        // _this.state2a = response.data[1].stateA
        // _this.state2b = response.data[1].stateB
        // _this.state3a = response.data[2].stateA
        // _this.state3b = response.data[2].stateB
        // _this.state4a = response.data[3].stateA
        // _this.state4b = response.data[3].stateB
        // _this.state5a = response.data[4].stateA
        // _this.state5b = response.data[4].stateB
        // _this.state6a = response.data[5].stateA
        // _this.state6b = response.data[5].stateB

        console.log(_this.viewArr[0].stateA)
        console.log(_this.viewArr)
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
  height: 300px;
  margin-top: 30px;
  display: inline-block;
  margin-left: 3.2%;
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
