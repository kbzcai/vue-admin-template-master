<template>
  <div class="app-container" style="background: #2d3a4b">
    <el-row :gutter='12' class="row-margin">
      <el-col :span='6'>
        <el-card shadow='never' class="custom-header">
          <div slot="header">
            <span>生产数据</span>
          </div>
          <div id="chart1" :style="{height:'400px'}"></div>
          <slot name="content"/>
          <div id="chart2" :style="{height:'400px',marginTop:'20px'}"></div>
        </el-card>
      </el-col>
      <el-col :span='12'>
        <el-card shadow='never' class="custom-header">
          <div slot="header">
            <span>{{title}}</span>
          </div>
          <slot name="content"/>
        </el-card>
      </el-col>
      <el-col :span='6'>
        <el-card shadow='never' class="custom-header">
          <div slot="header">
            <span>设备状态</span>
          </div>
          <slot name="content"/>
        </el-card>
      </el-col>
    </el-row>


<!--    <el-row :gutter='12' class="row-margin">-->
<!--      <el-col :span='6'>-->
<!--        <el-card shadow='never' class="custom-header">-->
<!--          <div slot="header">-->
<!--            <span>123123123</span>-->
<!--          </div>-->
<!--          <slot name="content"/>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span='12'>-->
<!--        <el-card shadow='never' class="custom-header">-->
<!--          <div slot="header">-->
<!--            <span>{{title}}</span>-->
<!--          </div>-->
<!--          <slot name="content"/>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span='6'>-->
<!--        <el-card shadow='never' class="custom-header">-->
<!--          <div slot="header">-->
<!--            <span>{{title}}</span>-->
<!--          </div>-->
<!--          <slot name="content"/>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
var echarts = require('echarts')
export default {

  data() {
    return {}
  },
  methods: {
    initCharts() {
      this.chart1 = echarts.init(document.getElementById('chart1'),'dark')
      this.chart2 = echarts.init(document.getElementById('chart2'),'dark')
      this.setOptions()
    },
    setOptions() {
      this.chart1.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
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
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
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
      this.chart2.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
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
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
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
    }
  },
  mounted() {
    this.initCharts()
  },
}
</script>

<style lang="scss">
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
