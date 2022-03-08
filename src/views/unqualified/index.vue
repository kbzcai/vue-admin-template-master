<template>
  <div>
    <el-form :inline="true" :model="planCondition" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="计划号">
        <el-autocomplete
          class="inline-input"
          v-model="planCondition.planNo"
          :fetch-suggestions="querySearch1"
          placeholder="请输入计划编号查询"
          :trigger-on-focus="false"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="datetime" placeholder="选择开始日期" v-model="planCondition.beginTime"
                        :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="datetime" placeholder="选择结束日期" v-model="planCondition.endTime"
                        :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
      style="width: 100%;margin-top:8px;min-height:700px"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column align="center" label="序号" width="95" type="index" :index="typeIndex">
      </el-table-column>
      <el-table-column
        prop="planDate"
        label="计划日期"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="planNo"
        label="计划号"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="productNo"
        label="产品型号"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="planNum"
        label="计划数量"
        align="center"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="actualNum"
        label="合格数量"
        align="center"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="failNum"
        label="不合格数量"
        align="center"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="weldingFinishNum"
        label="已补焊数量"
        align="center"
        sortable
        width="120">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleFinish(scope.$index, scope.row)">补焊完成
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="finishVisible" width="300px" center>
      <div class="del-dialog-cnt">确定该计划已经全部补焊完成吗？</div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="finishVisible = false">取 消</el-button>
      <el-button type="primary" @click="finishRow">确 定</el-button>
     </span>
    </el-dialog>

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
      delVisible: false,//删除提示弹框的状态
      msg: "",//记录每一条的信息，便于取id
      delarr: [],//存放删除的数据
      multipleSelection: [],//多选的数据
      total: 0, // 总记录数
      current: 1, // 页码
      limit: 10, // 每页记录数
      pages: '0', //总页码数
      planNoList: '',
      productForm: [{
        productNo: ''
      }],
      planCondition: {
        planNo: '',
        planStatus: '',
        beginTime: '',
        endTime: ''
      },
      tableData: [{
        id: '',
        planDate: '',
        planSchedule: '',
        planNo: '',
        productNo: '',
        planNum: '',
        weldingFinishNum: '',
        actualNum: '',
        planStatus: '',
        status: ''
      }],
      productBomData: [{
        id: '',
        stationNo: '',
        materialNo: '',
        materialDesc: '',
        productNum: ''
      }],
      fixId: '',
      finishVisible: false,
      dialogTableVisible: false,
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
      }
    }
  },
  methods: {
    onSubmit() {
      this.fetchPageData(1, 10)
    },
    handleSelect(item) {
      console.log(item);
    },
    querySearch1(queryString, cb) {
      let planNoList = this.planNoList;
      let results = queryString ? planNoList.filter(this.createFilter1(queryString)) : planNoList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter1(queryString) {
      return (planNoList) => {
        return (planNoList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    finishRow() {
      const _this = this
      this.$axios.get('http://localhost:8181/mesPrimaryProducePlan/fixPlanById/' + this.fixId).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "补焊成功") {
          _this.reload()
        } else {
          alert(resp.data)
        }
      })
      this.delarr = [];
      this.delVisible = false;
    },
    handleFinish(index, row) {
      this.idx = index;
      this.msg = row;//每一条数据的记录
      this.finishVisible = true;
      this.fixId = row.id;
    },
    typeIndex(index) {
      let vm = this; //处理分页数据的 index
      return (vm.current - 1) * vm.limit + index + 1;
    },
    fetchPageData: function (current, limit) {
      const _this = this
      this.$axios.post('http://localhost:8181/mesPrimaryProducePlan/queryByListByFix/' + current + "/" + limit, this.planCondition).then(function (resp) {
        console.log(resp.data.data)
        for (let i = 0; i < resp.data.data.length; i++) {
          console.log(resp.data.data[i].weldingFinishNum)
          let planDate = new Date(+new Date(resp.data.data[i].planDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          resp.data.data[i].planDate = planDate
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
