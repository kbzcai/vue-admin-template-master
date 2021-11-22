<template>
  <div>
    <img :src="require('@/assets/station_pic/station1.png')" width="100%" alt="">
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
        <span class="title">工作站1</span>
        <span class="result">A工位:{{ state1a }}</span>
        <span class="result">B工位:{{ state1b }}</span>
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
        <span class="title">工作站2</span>
        <span class="result">A工位:{{ state2a }}</span>
        <span class="result">B工位:{{ state2b }}</span>
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
        <span class="title">工作站3</span>
        <span class="result">A工位:{{ state3a }}</span>
        <span class="result">B工位:{{ state3b }}</span>
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
        <span class="title">工作站4</span>
        <span class="result">A工位:{{ state4a }}</span>
        <span class="result">B工位:{{ state4b }}</span>
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
        <span class="title">工作站5</span>
        <span class="result">A工位:{{ state5a }}</span>
        <span class="result">B工位:{{ state5b }}</span>
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
        <span class="title">工作站6</span>
        <span class="result">A工位:{{ state6a }}</span>
        <span class="result">B工位:{{ state6b }}</span>
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
      state1a:'0',
      state1b:'0',
      state2a:'0',
      state2b:'0',
      state3a:'0',
      state3b:'0',
      state4a:'0',
      state4b:'0',
      state5a:'0',
      state5b:'0',
      state6a:'0',
      state6b:'0'
    }
  },
  methods:{
    getPlcStatus(){
      let _this= this
      this.$axios.get('http://localhost:8181/mesPlc/getStates').then(function (response) {
        console.log(response.data)
        _this.state1a=response.data[0].stateA
        _this.state1b=response.data[0].stateB
        _this.state2a=response.data[1].stateA
        _this.state2b=response.data[1].stateB
        _this.state3a=response.data[2].stateA
        _this.state3b=response.data[2].stateB
        _this.state4a=response.data[3].stateA
        _this.state4b=response.data[3].stateB
        _this.state5a=response.data[4].stateA
        _this.state5b=response.data[4].stateB
        _this.state6a=response.data[5].stateA
        _this.state6b=response.data[5].stateB
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
  font-size: 55px;
  font-family: '华文仿宋'
}
.box {
  width: 16%;
  margin-left: 0.5%;
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
