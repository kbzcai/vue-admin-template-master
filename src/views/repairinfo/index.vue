<template>
  <div>
    <el-form :inline="true" :model="repairHistoryCondition" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="设备号">
        <el-input v-model="repairHistoryCondition.equipmentNo" placeholder="请输入设备号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="datetime" placeholder="选择开始日期" v-model="repairHistoryCondition.beginTime"  :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="datetime" placeholder="选择结束日期" v-model="repairHistoryCondition.endTime"  :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteAll">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="tablessp"
      :data="tableData"
      ref="multipleTable"
      height='200'
      @selection-change="handleSelectionChange"
      highlight-current-row
      fit
      style="width: 100%;margin-top:8px;min-height:500px"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column align="center" label="序号" width="95" type="index" :index="typeIndex">
      </el-table-column>
      <el-table-column
        prop="equipmentNo"
        label="设备号"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="repairContent"
        label="维修原因"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="repairTime"
        label="维修时间"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="delVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteRow">确 定</el-button>
     </span>
    </el-dialog>

    <!-- 分页组件 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[5,10,20]"
      :page-size="limit"
      style="text-align: center"
      layout="total,prev,pager,next,sizes,jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  created() {
    this.fetchPageData(1, 10);
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      delVisible: false,//删除提示弹框的状态
      msg: "",//记录每一条的信息，便于取id
      delarr: [],//存放删除的数据
      multipleSelection: [],//多选的数据

      repairHistoryCondition: {
        equipmentNo: '',
        beginTime: '',
        endTime: ''
      },
      total: 0, // 总记录数
      current: 1, // 页码
      limit: 10, // 每页记录数
      pages: '0', //总页码数

      tableData: [{
        id: '',
        equipmentNo: '',
        repairContent: '',
        repairTime: ''
      }]
    }
  },
  methods: {
    onSubmit() {
      this.fetchPageData(1, 10)
    },
    deleteRow() {
      const _this = this
      this.$axios.delete('http://localhost:8181/mesEquipmentRepairHistory/deleteBySelectIds/' + this.delarr).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "删除成功") {
          _this.$router.go(0);
        } else {
          alert("删除失败")
        }
      })
      this.delarr = [];
      this.delVisible = false;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.msg = row;//每一条数据的记录
      this.delarr.push(this.msg.id);//把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true;
      console.log(this.delarr)
    },
    deleteAll() {
      this.delVisible = true;//显示删除弹框
      const length = this.multipleSelection.length;
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].id)
      }
      console.log(this.delarr)
    },
    typeIndex(index) {
      let vm = this; //处理分页数据的 index
      return (vm.current - 1) * vm.limit + index + 1;
    },
    fetchPageData: function (current, limit) {
      const _this = this
      this.$axios.post('http://localhost:8181/mesEquipmentRepairHistory/queryByList/' + current + "/" + limit, this.repairHistoryCondition).then(function (resp) {
        console.log(resp.data.data)
        for (let i = 0; i < resp.data.data.length; i++) {
          let repairTime = new Date(+new Date(resp.data.data[i].repairTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          resp.data.data[i].repairTime = repairTime
        }
        _this.tableData = resp.data.data
        _this.total = resp.data.total
        _this.pages = resp.data.pages
      })
    },
    //改变页面的显示条数
    handleSizeChange: function (val) {
      const that = this; //rewriter this pointer
      that.limit = val;
      that.fetchPageData(that.current, that.limit);
    },
    //改变当前页
    handleCurrentChange: function (val) {
      const that = this; //rewriter this pointer
      that.current = val;
      that.fetchPageData(that.current, that.limit);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }

  // this.$confirm('此操作将任务状态改为删除状态, 是否继续?', '提示', {
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'warning'
  // }).then(() => {
  //   //点击确定的操作(调用接口)
  // }).catch(() => {
  //   //几点取消的提示
  // });
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
