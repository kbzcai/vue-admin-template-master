<template>
  <div>
    <el-table
      class="tablessp"
      :data="tableData"
      ref="multipleTable"
      height='200'
      highlight-current-row
      fit
      width="100%"
      style="width: 100%;margin-top:8px;min-height:700px"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        prop="name"
        label="PLC编号"
        align="center"
        sortable
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="r1_status"
        label="左工位状态"
        align="center"
        :formatter="stateFormat"
        min-width="20%"
        sortable>
      </el-table-column>
      <el-table-column
        prop="r2_status"
        label="右工位状态"
        align="center"
        min-width="20%"
        :formatter="stateFormat2"
        sortable>
      </el-table-column>
      <el-table-column
        prop="prod_numA"
        label="左工位数量"
        min-width="10%"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        prop="prod_numB"
        label="右工位数量"
        min-width="10%"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="更新日期"
        align="center"
        min-width="30%"
        sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  created() {
  },
  mounted() {
    this.get()
  },
  destroyed() {
    clearInterval(this.timer);
  },
  data() {
    return {
      tableData: [{
        id: '',
        name: '',
        r1_status: '0',
        r2_status: '0',
        prod_numA: 0,
        prod_numB: 0,
        r1_electric: '',
        r1_voltage: '',
        r2_electric: '',
        r2_voltage: '',
        createTime: ''
      }]
    }
  },
  methods: {
    get(){
      this.getPlcRecentlyData()
      clearInterval(this.timer);
      let _this = this
      this.timer = setInterval(() => {
        _this.getPlcRecentlyData()
      }, 10000)
    },
    stateFormat(row, column) {
      if (row.r1_status == '1') {
        return '运行中'
      } else if (row.r1_status == '2') {
        return '等待中'
      } else {
        return '报警'
      }
    },
    stateFormat2(row, column) {
      if (row.r2_status == '1') {
        return '运行中'
      } else if (row.r2_status == '2') {
        return '等待中'
      } else {
        return '报警'
      }
    },
    getPlcRecentlyData() {
      const _this = this
      this.$axios.get('http://localhost:8181/mesPlc/getPlcRecentlyData').then(function (resp) {
        console.log(resp.data)
        _this.tableData = resp.data
      })
      this.reportFailFormVisible = false;
    }
  },
  inject: ['reload']
}
</script>
<style scoped>
.tablessp thead tr .el-checkbox__input {
  display: none;
}

.tablessp.el-table thead {
  color: #fff;
}
</style>
