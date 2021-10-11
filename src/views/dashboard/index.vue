<template>
  <div class="app-container" style="background: #2d3a4b">
    <el-row :gutter='12' class="row-margin">
      <el-col :span='6'>
        <el-card shadow='never' class="custom-header">
          <div slot="header">
            <span>生产数据</span>
          </div>
          <div id="chart1" :style="{height:'400px',marginTop:'20px'}"></div>
          <slot name="content"/>
          <div id="chart2" :style="{height:'400px',marginTop:'40px',marginBottom:'27px'}"></div>
        </el-card>
      </el-col>
      <el-col :span='12'>
        <el-card shadow='never' class="custom-header">
          <div slot="header">
            <span>计划数据</span>
          </div>
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
              <span class="title">当日工作计划</span>
              <span class="result">{{ planDay }}</span>
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
              <span class="title">当周工作计划</span>
              <span class="result">{{ planWeek }}</span>
            </div>
          </div>
          <div class="box_right">
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
              <span class="title">当月工作计划</span>
              <span class="result">{{ planMonth }}</span>
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
              <span class="title">当日完成率</span>
              <span class="result">{{ dayPC }}</span>
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
              <span class="title">当周完成率</span>
              <span class="result">{{ weekPC }}</span>
            </div>
          </div>
          <div class="box_right">
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
              <span class="title">当月完成率</span>
              <span class="result">{{ monthPC }}</span>
            </div>
          </div>
            <div id="chart3" :style="{height:'400px',marginTop: '20px'}"></div>
        </el-card>
      </el-col>
      <el-col :span='6'>
        <el-card shadow='never' class="custom-header">
          <div slot="header">
            <span>设备产量</span>
          </div>
          <slot name="content"/>
          <div id="plc1" class="plcData">
            <span class="plc">1-A：{{plc1NumA}}</span>
            <span class="plc">1-B：{{plc1NumB}}</span>
          </div>
          <div id="plc2" class="plcData">
            <span class="plc">2-A：{{plc2NumA}}</span>
            <span class="plc">2-B：{{plc2NumB}}</span>
          </div>
          <div id="plc3" class="plcData">
            <span class="plc">3-A：{{plc3NumA}}</span>
            <span class="plc">3-B：{{plc3NumB}}</span>
          </div>
          <div id="plc4" class="plcData">
            <span class="plc">4-A：{{plc4NumA}}</span>
            <span class="plc">4-B：{{plc4NumB}}</span>
          </div>
          <div id="plc5" class="plcData">
            <span class="plc">5-A：{{plc5NumA}}</span>
            <span class="plc">5-B：{{plc5NumB}}</span>
          </div>
          <div id="plc6" class="plcData">
            <span class="plc">6-A：{{plc6NumA}}</span>
            <span class="plc">6-B：{{plc6NumB}}</span>
          </div>
          <div id="plc7" class="plcData">

          </div>
          <div id="plc8" class="plcData">

          </div>
          <div id="plc9" class="plcData">

          </div>
          <div id="plc10" class="plcData">

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var echarts = require('echarts')
export default {
  data() {
    return {
      actualDay: 0,
      actualWeek: 0,
      actualMonth: 0,
      planDay: 0,
      planWeek: 0,
      planMonth: 0,
      failDay: 0,
      failWeek: 0,
      failMonth: 0,
      dayPC: '0%',
      weekPC: '0%',
      monthPC: '0%',
      plc1NumA:'0',
      plc1NumB:'0',
      plc2NumA:'0',
      plc2NumB:'0',
      plc3NumA:'0',
      plc3NumB:'0',
      plc4NumA:'0',
      plc4NumB:'0',
      plc5NumA:'0',
      plc5NumB:'0',
      plc6NumA:'0',
      plc6NumB:'0'
    }
  },
  created(){
    this.getPlcData();
  },
  methods: {
    getPlcData(){
      let _this= this
      this.$axios.get('http://localhost:8181/mesPlc/getNum').then(function (response) {
        console.log(response.data)
        _this.plc1NumA=response.data[0].prodNumA
        _this.plc1NumB=response.data[0].prodNumB
        _this.plc2NumA=response.data[1].prodNumA
        _this.plc2NumB=response.data[1].prodNumB
        _this.plc3NumA=response.data[2].prodNumA
        _this.plc3NumB=response.data[2].prodNumB
        _this.plc4NumA=response.data[3].prodNumA
        _this.plc4NumB=response.data[3].prodNumB
        _this.plc5NumA=response.data[4].prodNumA
        _this.plc5NumB=response.data[4].prodNumB
        _this.plc6NumA=response.data[5].prodNumA
        _this.plc6NumB=response.data[5].prodNumB
      })
    },
    initCharts() {
      this.chart1 = echarts.init(document.getElementById('chart1'), 'dark')
      this.chart2 = echarts.init(document.getElementById('chart2'), 'dark')
      this.chart3 = echarts.init(document.getElementById('chart3'), 'dark')
      this.setOptions()
    },
    setOptions() {
      let _this = this
      this.$axios.get('http://localhost:8181/mesPrimaryProducePlan/query').then(function (response) {
        console.log(response.data)
        //合格数
        if (response.data.actualNumList[0] == null) {
          _this.actualDay = 0
          console.log("为空")
        } else {
          _this.actualDay = response.data.actualNumList[0]
        }
        if (response.data.actualNumList[1] == null) {
          _this.actualWeek = 0
          console.log("为空")
        } else {
          _this.actualWeek = response.data.actualNumList[1]
        }
        if (response.data.actualNumList[2] == null) {
          _this.actualMonth = 0
          console.log("为空")
        } else {
          _this.actualMonth = response.data.actualNumList[2]
        }
        //计划数
        if (response.data.planNumList[0] == null) {
          _this.planDay = 0
          console.log("为空")
        } else {
          _this.planDay = response.data.planNumList[0]
        }
        if (response.data.planNumList[1] == null) {
          _this.planWeek = 0
          console.log("为空")
        } else {
          _this.planWeek = response.data.planNumList[1]
        }
        if (response.data.planNumList[2] == null) {
          _this.planMonth = 0
          console.log("为空")
        } else {
          _this.planMonth = response.data.planNumList[2]
        }
        //手动焊接数
        if (response.data.failNumList[0] == null) {
          _this.failDay = 0
          console.log("为空")
        } else {
          _this.failDay = response.data.failNumList[0]
        }
        if (response.data.failNumList[1] == null) {
          _this.failWeek = 0
          console.log("为空")
        } else {
          _this.failWeek = response.data.failNumList[1]
        }
        if (response.data.failNumList[2] == null) {
          _this.failMonth = 0
          console.log("为空")
        } else {
          _this.failMonth = response.data.failNumList[2]
        }
        if (_this.actualDay != 0 && _this.planDay != 0) {
          _this.dayPC = (Math.round((_this.actualDay + _this.failDay) / _this.planDay * 10000) / 100.00).toFixed(2) + "%"
        }
        if (_this.actualWeek != 0 && _this.planWeek != 0) {
          _this.weekPC = (Math.round((_this.actualWeek + _this.failWeek) / _this.planWeek * 10000) / 100.00).toFixed(2) + "%"
        }
        if (_this.actualMonth != 0 && _this.planMonth != 0) {
          _this.monthPC = (Math.round((_this.actualMonth + _this.failMonth) / _this.planMonth * 10000) / 100.00).toFixed(2) + "%"
        }
        _this.chart1.setOption({
          title: {
            text: '本日计划',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: [
                {value: response.data.actualNumList[0], name: '当日合格'},
                {value: response.data.failNumList[0], name: '当日手动焊接'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
        _this.chart2.setOption({
          title: {
            text: '本周计划',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: [
                {value: response.data.actualNumList[1], name: '当周合格'},
                {value: response.data.failNumList[1], name: '当周手动焊接'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
        _this.chart3.setOption({
          darkMode: true,
          backgroundColor: '#100C2A',
          title: {
            text: '生产统计',
            subtext: '日/周/月合格计划数量',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['日统计数量', '周统计数量', '月统计数量',]
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '完成数量',
              data: response.data.actualNumList,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            },
            {
              name: '计划数量',
              data: response.data.planNumList,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        })
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.getPlcData())
  },
  mounted() {
    this.initCharts()
    setInterval(this.getPlcData,10000)
  },
}
</script>

<style lang="scss">
.plcData{
  height: 80px;
  width: 100%;
  border: 2px solid #065278;
  -moz-box-shadow: 0 -2px 7px 1px #065278 inset; /* 老的 Firefox */
  box-shadow: 0 -2px 7px 1px #065278 inset;
  background-color: rgba(255, 255, 255, 0);
  margin-top: 10px;
}
.plc{
  display: inline-block;
  font-size: 40px;
  width: 50%;
  height: 100%;
  line-height: 80px;
}
.data {
  position: relative;
  text-align: center;
  overflow: hidden;
  width: 250px;
  height: 200px;
  padding: 0px;
  margin: 0px;
}

.data .title {
  display: block;
  margin-top: 40px;
  font-size: xx-large;
  font-family: '华文仿宋'
}

.data .result {
  display: block;
  margin-top: 30px;
  font-size: 60px;
}

.box {
  width: 250px;
  height: 200px;
  margin-right: 40px;
  margin-top: 30px;
  display: inline-block;
}

.box_right {
  width: 250px;
  height: 200px;
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
  width: 250px;
  height: 200px;
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

.row-margin {
  margin: 10px 20px;
}

.custom-header {
  min-height: 900px;
  border: 4px solid #065278;
  -moz-box-shadow: 0 -4px 9px 3px #065278 inset; /* 老的 Firefox */
  box-shadow: 0 -4px 9px 3px #065278 inset;
  background-color: rgba(255, 255, 255, 0);
  color: #eeeeee;

  .el-card__header {
    height: 36px;
    text-align: center;
    line-height: 36px;
    padding: 2px 20px;
    background-image: linear-gradient(90deg,
      rgba(6, 82, 120, 1) 0%,
      rgba(3, 47, 76, 1) 51%,
      rgba(0, 11, 31, 0) 100%);
    // background-image: linear-gradient(to right, rgba(38, 82, 120, 1), rgba(3, 11, 31, 0));
    border-bottom: 0px solid #EBEEF5;

    span {
      color: #eeeeee;
      text-align: left;
      font-size: 21px;
    }
  }
}
</style>
