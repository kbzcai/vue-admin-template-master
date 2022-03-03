<template>
  <div class="dashboard-container">
    <el-form :inline="true" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="选择设备">
        <el-select v-model="value" placeholder="选择设备" @change="queryByNum">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right">
        <el-tooltip :content="'查看: ' + switchValue" placement="top">
          <el-switch
            v-model="switchValue"
            active-color="#409EFF"
            inactive-color="#13ce66"
            @change="getData"
            active-value="电压"
            inactive-value="电流"
            active-text="电压"
            inactive-text="电流">
          </el-switch>
        </el-tooltip>
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
      }, {
        value: 6,
        label: '设备六'
      }, {
        value: 7,
        label: '设备七'
      }, {
        value: 8,
        label: '设备八'
      }, {
        value: 9,
        label: '设备九'
      }, {
        value: 10,
        label: '设备十'
      }],
      value: 1,  // 选取默认值在里面就可以了，比如：  value:"选项2"；
      switchValue: '电压',
      num: 1
    }
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById('chart'))
    this.getData()
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    initCharts() {
    },
    getData() {
      this.get()
      clearInterval(this.timer);
      let _this = this
      this.timer = setInterval(() => {
        _this.get()
      }, 10000)
    },
    get() {
      const _this = this
      this.$axios.get('http://localhost:8181/mesPlc/queryByNum/' + this.num).then(function (response) {
        console.log(response.data)
        _this.plcData = response.data
        for (let i=0;i<response.data.time.length;i++){
          response.data.time[i].replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')
        }
        //plc1
        if (_this.switchValue == "电流") {
          _this.chart1.setOption({
            title: {
              text: response.data.plcName
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['电流']
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
              type: 'value',
              name: '电流()'
            },
            series: [
              {
                type: 'line',
                data: response.data.plcElectric
              }
            ]
          })
        } else {
          _this.chart1.setOption({
            title: {
              text: response.data.plcName
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['电压']
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
              type: 'value',
              name: '电压()'
            },
            series: [
              {
                type: 'line',
                data: response.data.plcVoltage
              }
            ]
          })
        }
      })
    },
    queryByNum(num) {
      this.num = num
      this.get()
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
