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
      <div id="chart" :style="{width:'100%',height:'720px'}"></div>
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
    this.chart1 = echarts.init(document.getElementById('chart'))
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    initCharts() {
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
