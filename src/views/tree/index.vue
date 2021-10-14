<template>
  <div class="dashboard-container">
    <el-form :inline="true" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="选择设备">
        <el-select v-model="value"  placeholder="选择设备" @change="queryByNum">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-col :span="24">
      <div id="chart1" :style="{width:'100%',height:'720px'}"></div>
    </el-col>
<!--    <el-col :span="8">-->
<!--      <div id="chart2" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <div id="chart3" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <div id="chart4" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <div id="chart5" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <div id="chart6" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <div id="chart7" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <div id="chart8" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <div id="chart9" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="8">-->
<!--      <div id="chart10" :style="{width:'500px',height:'400px'}"></div>-->
<!--    </el-col>-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

var echarts = require('echarts')
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.queryByNum(1)
  },
  data() {
    return {
      date: [],
      lineChart: {},
      options: [{
        value: 1,
        label: '设备一'
      }, {
        value: 2,
        label: '设备二'
      }, {
        value: 3,
        label: '设备三'
      }, {
        value: 4,
        label: '设备四'
      }, {
        value: 5,
        label: '设备五'
      },{
        value: 6,
        label: '设备六'
      },{
        value: 7,
        label: '设备七'
      },{
        value: 8,
        label: '设备八'
      },{
        value: 9,
        label: '设备九'
      },{
        value: 10,
        label: '设备十'
      }],
      value: 1  // 选取默认值在里面就可以了，比如：  value:"选项2"；
    }
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('chart1'))
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    initCharts() {

      // this.chart2 = echarts.init(document.getElementById('chart2'))
      // this.chart3 = echarts.init(document.getElementById('chart3'))
      // this.chart4 = echarts.init(document.getElementById('chart4'))
      // this.chart5 = echarts.init(document.getElementById('chart5'))
      // this.chart6 = echarts.init(document.getElementById('chart6'))
      // this.chart7 = echarts.init(document.getElementById('chart7'))
      // this.chart8 = echarts.init(document.getElementById('chart8'))
      // this.chart9 = echarts.init(document.getElementById('chart9'))
      // this.chart10 = echarts.init(document.getElementById('chart10'))
      // this.setOptions()
    },
    queryByNum(num) {
      clearInterval(this.timer);
      let _this = this
      this.timer = setInterval(() => {
        this.$axios.get('http://localhost:8181/mesPlc/queryByNum/' + num).then(function (response) {
          console.log(response.data)
          _this.plcData = response.data
          //plc1
          _this.chart1.setOption({
            title: {
              text: response.data.plcName
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['电流', '电压']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: response.data.time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '电流',
                type: 'line',
                data: response.data.plcElectric
              },
              {
                name: '电压',
                type: 'line',
                data: response.data.plcVoltage
              }
            ]
          })
        })
      }, 3000)
    }
      // },
      // setOptions() {
      //   this.timer = setInterval(() => {
      //     let _this = this
      //     this.$axios.get('http://localhost:8181/mesPlc/query').then(function (response) {
      //       console.log(response.data)
      //       _this.plcData = response.data
      //       //plc1
      //       _this.chart1.setOption({
      //         title: {
      //           text: 'plc1图'
      //         },
      //         tooltip: {
      //           trigger: 'axis'
      //         },
      //         legend: {
      //           data: ['电流', '电压']
      //         },
      //         grid: {
      //           left: '3%',
      //           right: '4%',
      //           bottom: '3%',
      //           containLabel: true
      //         },
      //         toolbox: {
      //           feature: {
      //             saveAsImage: {}
      //           }
      //         },
      //         xAxis: {
      //           type: 'category',
      //           boundaryGap: false,
      //           data: response.data[0].time
      //         },
      //         yAxis: {
      //           type: 'value'
      //         },
      //         series: [
      //           {
      //             name: '电流',
      //             type: 'line',
      //             data: response.data[0].plcElectric
      //           },
      //           {
      //             name: '电压',
      //             type: 'line',
      //             data: response.data[0].plcVoltage
      //           }
      //         ]
      //       })
      //       // //plc2
      //       // _this.chart2.setOption({
      //       //   title: {
      //       //     text: 'plc2图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[1].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[1].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[1].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //       // //plc3
      //       // _this.chart3.setOption({
      //       //   title: {
      //       //     text: 'plc3图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[2].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[2].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[2].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //       // //plc4
      //       // _this.chart4.setOption({
      //       //   title: {
      //       //     text: 'plc4图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[3].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[3].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[3].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //       // //plc5
      //       // _this.chart5.setOption({
      //       //   title: {
      //       //     text: 'plc5图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[4].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[4].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[4].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //       // //plc6
      //       // _this.chart6.setOption({
      //       //   title: {
      //       //     text: 'plc6图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[5].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[5].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[5].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //       // //plc7
      //       // _this.chart7.setOption({
      //       //   title: {
      //       //     text: 'plc7图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[6].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[6].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[6].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //       // //plc8
      //       // _this.chart8.setOption({
      //       //   title: {
      //       //     text: 'plc8图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[7].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[7].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[7].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //       // //plc9
      //       // _this.chart9.setOption({
      //       //   title: {
      //       //     text: 'plc2图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[8].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[8].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[8].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //       // //plc10
      //       // _this.chart10.setOption({
      //       //   title: {
      //       //     text: 'plc10图'
      //       //   },
      //       //   tooltip: {
      //       //     trigger: 'axis'
      //       //   },
      //       //   legend: {
      //       //     data: ['电流', '电压']
      //       //   },
      //       //   grid: {
      //       //     left: '3%',
      //       //     right: '4%',
      //       //     bottom: '3%',
      //       //     containLabel: true
      //       //   },
      //       //   toolbox: {
      //       //     feature: {
      //       //       saveAsImage: {}
      //       //     }
      //       //   },
      //       //   xAxis: {
      //       //     type: 'category',
      //       //     boundaryGap: false,
      //       //     data: response.data[9].time
      //       //   },
      //       //   yAxis: {
      //       //     type: 'value'
      //       //   },
      //       //   series: [
      //       //     {
      //       //       name: '电流',
      //       //       type: 'line',
      //       //       data: response.data[9].plcElectric
      //       //     },
      //       //     {
      //       //       name: '电压',
      //       //       type: 'line',
      //       //       data: response.data[9].plcVoltage
      //       //     }
      //       //   ]
      //       // })
      //
      //
      //       // window.addEventListener("resize", function () {
      //       //   _this.chart1.resize();
      //       //   _this.chart2.resize();
      //       //   _this.chart3.resize();
      //       //   _this.chart4.resize();
      //       //   _this.chart5.resize();
      //       //   _this.chart6.resize();
      //       // });
      //     })
      //   }, 3000)
      // }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
