<template>
  <div>
    <marquee id="affiche" align="left" behavior="scroll" direction="left" hspace="50" vspace="20" loop="-1"
             scrollamount="10" scrolldelay="0" onMouseOut="this.start()" onMouseOver="this.stop()">
      <span style="margin-top:20px;margin-left: 25px;font-size: 40px;">正在生产的计划：{{ this.nowPlanNo }}</span>
      <span style="margin-top:20px;margin-left: 25px;font-size: 40px;">合格数：{{ this.nowPlanActualNum }}</span>
      <span style="margin-top:20px;margin-left: 25px;font-size: 40px;">补焊合格数：{{ this.nowPlanFailNum }}</span>
      <span style="margin-top:20px;margin-left: 25px;font-size: 40px;">不合格数：{{ this.nowPlanWeldingFinishNum }}</span>
    </marquee>
    <el-form :inline="true" :model="selectForm" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="选择未完成计划">
        <el-select v-model="selectForm.planNo" placeholder="选择未完成计划">
          <el-option v-for="(item,i) in unFinishPlanNoForm" :label="item.planNo"
                     :value="item.planNo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startPlan('selectForm')"
                   icon="el-icon-refresh">切换计划
        </el-button>
      </el-form-item>
    </el-form>
    <div style="min-height: 700px;line-height: 700px;">
      <el-button type="success" class="button" circle @click="pass(1)">合格</el-button>
      <el-button type="danger" class="button" circle @click="pass(2)">不合格</el-button>
      <el-button type="warning" class="button" circle @click="pass(3)">补焊合格</el-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getProductPlan()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  mounted() {
    this.getUnFinishPlanNo()
  },
  data() {
    return {
      nowPlanNo: '',//正在生产的计划号
      nowPlanActualNum: '',//正在生产的计划的合格数量
      nowPlanFailNum: '',//正在生产的计划的不合格数量
      nowPlanWeldingFinishNum: '',//正在生产的计划的补焊合格数量
      unFinishPlanNoForm: [{
        planNo: ''
      }],
      selectForm: {
        planNo: ''
      },
      beforeForm: {
        planNo: ''
      }
    }
  },
  methods: {
    pass(index) {
      console.log(index)
      const _this = this
      this.$axios.post('http://localhost:8181/mesPrimaryProducePlan/pass', {
        before: this.beforeForm.planNo,
        enum: index
      }).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "合格") {
          _this.reload()
        } else if (resp.data == "完成") {
          _this.$confirm('计划已完成，点击确认刷新页面', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.reload()
          });
        }
      })
    },
    getProductPlan() {
      const _this = this
      this.$axios.get('http://localhost:8181/mesPrimaryProducePlan/getProductPlan').then(function (resp) {
        console.log(resp.data.mes)
        if (resp.data.mesPrimaryProducePlan != null) {
          _this.beforeForm.planNo = resp.data.mesPrimaryProducePlan.planNo
        }
        if (resp.data.mes == '查询成功') {
          _this.nowPlanNo = resp.data.mesPrimaryProducePlan.planNo;
          _this.nowPlanActualNum = resp.data.mesPrimaryProducePlan.actualNum
          _this.nowPlanFailNum = resp.data.mesPrimaryProducePlan.failNum
          _this.nowPlanWeldingFinishNum = resp.data.mesPrimaryProducePlan.weldingFinishNum
        } else {
          _this.nowPlanNo = ''
          _this.nowPlanActualNum = 0
          _this.nowPlanFailNum = 0
          _this.nowPlanWeldingFinishNum = 0
        }
      })
    },
    getUnFinishPlanNo() {
      const _this = this
      this.$axios.get('http://localhost:8181/mesPrimaryProducePlan/getUnFinishPlan').then(function (resp) {
        console.log(resp.data)
        _this.unFinishPlanNoForm = resp.data
      })
    },
    startPlan(forName) {
      let _this = this;
      console.log(this.selectForm.planNo)
      this.$axios.post('http://localhost:8181/mesPrimaryProducePlan/startPlanByNo',
        {
          now: this.selectForm.planNo,
          before: this.beforeForm.planNo
        }).then(function (resp) {
        console.log(resp.data)
        if (resp.data == '开始生产') {
          _this.reload()
        } else {
          alert(resp.data);
        }
      })
    }
  },
  inject: ['reload']
}
</script>
<style scoped>
.button {
  width: 20%;
  margin-left: 10%;
  height: 300px;
  font-size: xx-large;
}

.tablessp thead tr .el-checkbox__input {
  display: none;
}

.tablessp.el-table thead {
  color: #fff;
}
</style>
