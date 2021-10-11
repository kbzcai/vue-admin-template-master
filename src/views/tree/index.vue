<template>
  <div class="dashboard-container">
    <el-col :span="8">
      <div id="chart1" :style="{width:'500px',height:'400px'}"></div>
    </el-col>
    <el-col :span="8">
      <div id="chart2" :style="{width:'500px',height:'400px'}"></div>
    </el-col>
    <el-col :span="8">
      <div id="chart3" :style="{width:'500px',height:'400px'}"></div>
    </el-col>
    <el-col :span="8">
      <div id="chart4" :style="{width:'500px',height:'400px'}"></div>
    </el-col>
    <el-col :span="8">
      <div id="chart5" :style="{width:'500px',height:'400px'}"></div>
    </el-col>
    <el-col :span="8">
      <div id="chart6" :style="{width:'500px',height:'400px'}"></div>
    </el-col>
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
  },
  data() {
    return {
      date: [],
      lineChart: {}
    }
  },
  mounted() {
    this.initCharts()
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    initCharts() {
      this.chart1 = echarts.init(document.getElementById('chart1'))
      this.chart2 = echarts.init(document.getElementById('chart2'))
      this.chart3 = echarts.init(document.getElementById('chart3'))
      this.chart4 = echarts.init(document.getElementById('chart4'))
      this.chart5 = echarts.init(document.getElementById('chart5'))
      this.chart6 = echarts.init(document.getElementById('chart6'))
      this.setOptions()
    },
    setOptions() {
      this.timer = setInterval(() => {
        let _this = this
        this.$axios.get('http://localhost:8181/mesPlc/query').then(function (response) {
          console.log(response.data)
          _this.plcData = response.data
          //plc1
          _this.chart1.setOption({
            title: {
              text: 'plc1图'
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
              data: response.data[0].time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '电流',
                type: 'line',
                data: response.data[0].plcElectric
              },
              {
                name: '电压',
                type: 'line',
                data: response.data[0].plcVoltage
              }
            ]
          })
          //plc2
          _this.chart2.setOption({
            title: {
              text: 'plc2图'
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
              data: response.data[1].time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '电流',
                type: 'line',
                data: response.data[1].plcElectric
              },
              {
                name: '电压',
                type: 'line',
                data: response.data[1].plcVoltage
              }
            ]
          })
          //plc3
          _this.chart3.setOption({
            title: {
              text: 'plc3图'
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
              data: response.data[2].time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '电流',
                type: 'line',
                data: response.data[2].plcElectric
              },
              {
                name: '电压',
                type: 'line',
                data: response.data[2].plcVoltage
              }
            ]
          })
          //plc4
          _this.chart4.setOption({
            title: {
              text: 'plc4图'
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
              data: response.data[3].time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '电流',
                type: 'line',
                data: response.data[3].plcElectric
              },
              {
                name: '电压',
                type: 'line',
                data: response.data[3].plcVoltage
              }
            ]
          })
          //plc5
          _this.chart5.setOption({
            title: {
              text: 'plc5图'
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
              data: response.data[4].time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '电流',
                type: 'line',
                data: response.data[4].plcElectric
              },
              {
                name: '电压',
                type: 'line',
                data: response.data[4].plcVoltage
              }
            ]
          })
          //plc6
          _this.chart6.setOption({
            title: {
              text: 'plc6图'
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
              data: response.data[5].time
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '电流',
                type: 'line',
                data: response.data[5].plcElectric
              },
              {
                name: '电压',
                type: 'line',
                data: response.data[5].plcVoltage
              }
            ]
          })
          // window.addEventListener("resize", function () {
          //   _this.chart1.resize();
          //   _this.chart2.resize();
          //   _this.chart3.resize();
          //   _this.chart4.resize();
          //   _this.chart5.resize();
          //   _this.chart6.resize();
          // });
        })
      }, 3000)
    }
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
