<template>
  <div>
    <el-form :inline="true" :model="planCondition" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="计划号">
        <el-input v-model="planCondition.planNo" placeholder="请输入计划号查询"></el-input>
      </el-form-item>
      <el-form-item label="计划状态">
        <el-select v-model="planCondition.planStatus" placeholder="选择状态">
          <el-option label="已完成" value="1"></el-option>
          <el-option label="未完成" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="选择开始日期" v-model="planCondition.beginTime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="选择结束日期" v-model="planCondition.endTime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleInsert">新增计划</el-button>
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
        prop="planDate"
        label="计划日期"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="planSchedule"
        label="计划班次"
        align="center"
        sortable
        width="120">
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
        prop="passNum"
        label="合格数量"
        align="center"
        sortable
        width="120">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status != '1'"
            @click="handleFinish(scope.$index, scope.row)">一键完成
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增计划"
               :visible.sync="insertFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="insertForm" label-width="80px" ref="insertForm">
        <el-form-item label="工位号" prop="planNo">
          <el-input v-model="insertForm.planNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划班次" prop="planSchedule">
          <el-select v-model="insertForm.planSchedule" placeholder="选择班次">
            <el-option label="上午班" value="am"></el-option>
            <el-option label="下午班" value="pm"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划数量" prop="planNum">
          <el-input v-model="insertForm.planNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划日期" prop="planDate">
          <el-date-picker v-model="insertForm.planDate" placeholder="选择计划日期" format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('insertForm')">取消</el-button>
        <el-button type="primary" @click.native="Insert('insertForm')">新增</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑计划"
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="计划号" prop="planNo">
          <el-input v-model="editForm.planNo" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="计划班次" prop="planSchedule">
          <el-select v-model="editForm.planSchedule" placeholder="选择班次">
            <el-option label="上午班" value="am"></el-option>
            <el-option label="下午班" value="pm"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划数量" prop="planNum">
          <el-input v-model="editForm.planNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划日期" prop="planDate">
          <el-date-picker v-model="editForm.planDate" placeholder="选择计划日期" format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('editForm')">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
      </div>
    </el-dialog>

    <!--    <el-dialog title="故障报修"-->
    <!--               :visible.sync="reportFailFormVisible"-->
    <!--               :close-on-click-modal="false"-->
    <!--               class="edit-form">-->
    <!--      <el-form :model="reportFailForm" label-width="80px" ref="reportFailForm">-->
    <!--        <el-form-item label="设备号" prop="equipmentNo">-->
    <!--          <el-input v-model="reportFailForm.equipmentNo" auto-complete="off" readonly="true"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="故障原因" prop="faultReason">-->
    <!--          <el-input v-model="reportFailForm.faultReason" auto-complete="off"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="故障时间" prop="failStartTime">-->
    <!--          <el-date-picker v-model="reportFailForm.faultStartTime" placeholder="选择故障时间" format="yyyy年MM月dd日"-->
    <!--                          value-format="yyyy-MM-dd HH:mm:ss">-->
    <!--          </el-date-picker>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button @click.native="handleCancel('reportFailForm')">取消</el-button>-->
    <!--        <el-button type="primary" @click.native="reportFailInsert('reportFailForm')">确认</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->

    <!--    <el-dialog title="维修内容"-->
    <!--               :visible.sync="finishFailFormVisible"-->
    <!--               :close-on-click-modal="false"-->
    <!--               class="edit-form">-->
    <!--      <el-form :model="finishFailForm" label-width="80px" ref="finishFailForm">-->
    <!--        <el-form-item label="设备号" prop="equipmentNo">-->
    <!--          <el-input v-model="finishFailForm.equipmentNo" auto-complete="off" readonly="true"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="维修内容" prop="repairContent">-->
    <!--          <el-input v-model="finishFailForm.repairContent" auto-complete="off"></el-input>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="完成时间" prop="repairTime">-->
    <!--          <el-date-picker v-model="finishFailForm.repairTime" placeholder="选择维修完成时间" format="yyyy年MM月dd日"-->
    <!--                          value-format="yyyy-MM-dd HH:mm:ss">-->
    <!--          </el-date-picker>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--      <div slot="footer" class="dialog-footer">-->
    <!--        <el-button @click.native="handleCancel('finishFailForm')">取消</el-button>-->
    <!--        <el-button type="primary" @click.native="finishFailInsert('finishFailForm')">确认</el-button>-->
    <!--      </div>-->
    <!--    </el-dialog>-->

    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="delVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteRow">确 定</el-button>
     </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="finishVisible" width="300px" center>
      <div class="del-dialog-cnt">确定要补齐未正确录入的数量吗？</div>
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
        planNo: '2016-05-02',
        productNo: '王小虎2',
        planNum: '',
        passNum: ''
      }
      ],
      insertForm: {
        planNo: '',
        planDate: '',
        planNum: '',
        planSchedule: ''
      },
      editForm: {
        planNo: '',
        planDate: '',
        planNum: '',
        planSchedule: ''
      },
      editFormVisible: false,
      finishVisible: false,
      insertFormVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.fetchPageData(1, 10)
    },
    stateFormat(row, column) {
      if (row.status == '1') {
        return '运行中'
      } else if (row.status == '0') {
        return '等待中'
      } else {
        return '故障'
      }
    },
    deleteRow() {
      const _this = this
      this.$axios.delete('http://localhost:8181/mesEquipment/deleteBySelectIds/' + this.delarr).then(function (resp) {
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
    finishRow() {
      const _this = this
      this.$axios.delete('http://localhost:8181/mesEquipment/deleteBySelectIds/' + this.delarr).then(function (resp) {
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
    handleFinish(index, row) {
      this.idx = index;
      this.msg = row;//每一条数据的记录
      this.finishVisible = true;
    },
    deleteAll() {
      this.delVisible = true;//显示删除弹框
      const length = this.multipleSelection.length;
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].id)
      }
      console.log(this.delarr)
    },
    handleInsert() {
      this.insertFormVisible = true;
    },
    handleEdit: function (index, row) {
      this.editFormVisible = true;//dialog对话窗口打开
      this.editForm = Object.assign({}, row);//将数据传入dialog页面
      this.editForm.index = index;//传递当前index
      let planDate = new Date(+new Date(this.editForm.planDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      this.editForm.planDate = planDate
      console.log(this.editForm.planDate)
    },
    //取消
    handleCancel(formName) {
      this.editFormVisible = false;
    },
    //新增
    Insert(forName) {
      //dialog页面数据写入到tableData页面上
      //this.$set(tableName,tableIndex,data)
      const _this = this
      this.$axios.post('http://localhost:8181/mesEquipment/addEquipment', this.insertForm).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "添加成功") {
          _this.$router.go(0);
        } else {
          alert(resp.data)
        }
      })
      this.editFormVisible = false;
    },
    //更新
    handleUpdate(forName) {
      //dialog页面数据写入到tableData页面上
      //this.$set(tableName,tableIndex,data)
      const _this = this
      this.$axios.put('http://localhost:8181/mesEquipment/updateEquipment', this.editForm).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "修改成功") {
          _this.$router.go(0);
        } else {
          alert("修改失败")
        }
      })
      this.editFormVisible = false;
    },
    reportFailInsert(forName) {
      const _this = this
      this.$axios.post('http://localhost:8181/mesEquipmentFaultHistory/addFaultHistory', this.reportFailForm).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "添加成功") {
          _this.$router.go(0);
        } else {
          alert("添加失败")
        }
      })
      this.reportFailFormVisible = false;
    },
    finishFailInsert(forName) {
      const _this = this
      this.$axios.post('http://localhost:8181/mesEquipmentRepairHistory/addRepairHistory', this.finishFailForm).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "添加成功") {
          _this.$router.go(0);
        } else {
          alert("添加失败")
        }
      })
      this.finishFailFormVisible = false;
    },
    typeIndex(index) {
      let vm = this; //处理分页数据的 index
      return (vm.current - 1) * vm.limit + index + 1;
    },
    fetchPageData: function (current, limit) {
      const _this = this
      this.$axios.post('http://localhost:8181/mesPrimaryProducePlan/queryByList/' + current + "/" + limit, this.planCondition).then(function (resp) {
        console.log(resp.data.data)
        for (let i = 0; i < resp.data.data.length; i++) {
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
  }
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
