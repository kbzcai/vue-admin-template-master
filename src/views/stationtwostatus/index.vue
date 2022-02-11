<template>
  <div>
    <img :src="require('@/assets/station_pic/station2.png')" width="100%" alt="">
    <slot name="content"/>
    <div class="box">
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
        <span class="title">工作站7</span>
        <span class="result">A工位:{{ state7a == '1' ? '运行中' : state7a == '2' ? '待机' : state7a == '3' ? '报警' : '错误' }}
        <template v-if="state7a == '1'">
           <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
        </template>
          <template v-else-if="state7a == '2'">
           <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
        </template>
          <template v-else-if="state7a == '3'">
           <img :src="require('@/assets/station_pic/redlight.png')" alt="">
        </template>
        </span>
        <span
          class="result">B工位:{{ state7b == '1' ? '运行中' : state7b == '2' ? '待机' : state7b == '3' ? '报警' : '错误' }}
         <template v-if="state7b == '1'">
           <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
        </template>
          <template v-else-if="state7b == '2'">
           <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
        </template>
          <template v-else-if="state7b == '3'">
           <img :src="require('@/assets/station_pic/redlight.png')" alt="">
        </template>
        </span>
      </div>
    </div>
    <div class="box">
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
        <span class="title">工作站8</span>
        <span
          class="result">A工位:{{ state8a == '1' ? '运行中' : state8a == '2' ? '待机' : state8a == '3' ? '报警' : '错误' }}
         <template v-if="state8a == '1'">
           <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
        </template>
          <template v-else-if="state8a == '2'">
           <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
        </template>
          <template v-else-if="state8a == '3'">
           <img :src="require('@/assets/station_pic/redlight.png')" alt="">
        </template></span>
        <span
          class="result">B工位:{{ state8b == '1' ? '运行中' : state8b == '2' ? '待机' : state8b == '3' ? '报警' : '错误' }}
         <template v-if="state8b == '1'">
           <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
        </template>
          <template v-else-if="state8b == '2'">
           <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
        </template>
          <template v-else-if="state8b == '3'">
           <img :src="require('@/assets/station_pic/redlight.png')" alt="">
        </template></span>
      </div>
    </div>
    <div class="box">
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
        <span class="title">工作站9</span>
        <span
          class="result">A工位:{{ state9a == '1' ? '运行中' : state9a == '2' ? '待机' : state9a == '3' ? '报警' : '错误' }}
         <template v-if="state9a == '1'">
           <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
        </template>
          <template v-else-if="state9a == '2'">
           <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
        </template>
          <template v-else-if="state9a == '3'">
           <img :src="require('@/assets/station_pic/redlight.png')" alt="">
        </template></span>
        <span
          class="result">B工位:{{ state9b == '1' ? '运行中' : state9b == '2' ? '待机' : state9b == '3' ? '报警' : '错误' }}
         <template v-if="state9b == '1'">
           <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
        </template>
          <template v-else-if="state9b == '2'">
           <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
        </template>
          <template v-else-if="state9b == '3'">
           <img :src="require('@/assets/station_pic/redlight.png')" alt="">
        </template></span>
      </div>
    </div>
    <div class="box">
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
        <span class="title">工作站10</span>
        <span
          class="result">A工位:{{ state10a == '1' ? '运行中' : state10a == '2' ? '待机' : state10a == '3' ? '报警' : '错误' }}
         <template v-if="state10a == '1'">
           <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
        </template>
          <template v-else-if="state10a == '2'">
           <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
        </template>
          <template v-else-if="state10a == '3'">
           <img :src="require('@/assets/station_pic/redlight.png')" alt="">
        </template></span>
        <span
          class="result">B工位:{{ state10b == '1' ? '运行中' : state10b == '2' ? '待机' : state10b == '3' ? '报警' : '错误' }}
         <template v-if="state7a == '1'">
           <img :src="require('@/assets/station_pic/greenlight.png')" alt="">
        </template>
          <template v-else-if="state7a == '2'">
           <img :src="require('@/assets/station_pic/yellowlight.png')" alt="">
        </template>
          <template v-else-if="state7a == '3'">
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
      state7a: '',
      state7b: '',
      state8a: '',
      state8b: '',
      state9a: '',
      state9b: '',
      state10a: '',
      state10b: '',
    }
  },
  methods: {
    getPlcStatus() {
      let _this = this
      this.$axios.get('http://localhost:8181/mesPlc/getStates').then(function (response) {
        console.log(response.data)
        _this.state7a = response.data[6].stateA
        _this.state7b = response.data[6].stateB
        _this.state8a = response.data[7].stateA
        _this.state8b = response.data[7].stateB
        _this.state9a = response.data[8].stateA
        _this.state9b = response.data[8].stateB
        _this.state10a = response.data[9].stateA
        _this.state10b = response.data[9].stateB
      })
      console.log(this.state9a)
    }
  }
}
</script>

<style scoped>
.data {
  position: relative;
  text-align: center;
  overflow: hidden;
  width: 300px;
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
  font-size: 35px;
  font-family: '华文仿宋'
}

.box {
  width: 16%;
  margin-left: 6.5%;
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
  width: 300px;
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
