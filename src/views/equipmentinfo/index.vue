<template>
  <div>
    <el-form :inline="true" :model="equipmentCondition" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="设备号">
        <el-input v-model="equipmentCondition.equipmentNo" placeholder="请输入设备号查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="datetime" placeholder="选择开始日期" v-model="equipmentCondition.beginTime" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="datetime" placeholder="选择结束日期" v-model="equipmentCondition.endTime" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleInsert">新增设备</el-button>
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
        prop="stationNo"
        label="工位号"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="equipmentNo"
        label="设备号"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="equipmentName"
        label="设备名称"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="installDate"
        label="安装日期"
        align="center"
        sortable
        width="180">
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
            v-if="scope.row.equipmentStatus != '-1'"
            @click="reportFail(scope.$index, scope.row)">报告故障
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.equipmentStatus == '-1'"
            @click="finishFail(scope.$index, scope.row)">维修完成
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加设备信息"
               :visible.sync="insertFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="insertForm" label-width="80px" ref="insertForm">
        <el-form-item label="工位号" prop="stationNo">
          <el-input v-model="insertForm.stationNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="equipmentNo">
          <el-input v-model="insertForm.equipmentNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="insertForm.equipmentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="安装日期" prop="installDate">
          <el-date-picker v-model="insertForm.installDate" placeholder="选择安装日期" format="yyyy年MM月dd日"
                type="datetime"   :picker-options="pickerOptions"       value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('insertForm')">取消</el-button>
        <el-button type="primary" @click.native="Insert('insertForm')">新增</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑设备信息"
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="工位号" prop="stationNo">
          <el-input v-model="editForm.stationNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="equipmentNo">
          <el-input v-model="editForm.equipmentNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="editForm.equipmentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="editForm.equipmentStatus" placeholder="选择状态">
            <el-option label="运行中" value="1"></el-option>
            <el-option label="等待中" value="0"></el-option>
            <el-option label="故障" value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装日期" prop="installDate">
          <el-date-picker v-model="editForm.installDate" placeholder="选择安装日期" format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="故障时间" prop="failTime">
          <el-date-picker v-model="editForm.failTime" placeholder="选择故障时间" format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修时间" prop="repairTime">
          <el-date-picker v-model="editForm.repairTime" placeholder="选择维修时间" format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('editForm')">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
      </div>
    </el-dialog>

    <el-dialog title="故障报修"
               :visible.sync="reportFailFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="reportFailForm" label-width="80px" ref="reportFailForm">
        <el-form-item label="设备号" prop="equipmentNo">
          <el-input v-model="reportFailForm.equipmentNo" auto-complete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="故障原因" prop="faultReason">
          <el-input v-model="reportFailForm.faultReason" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="故障时间" prop="failStartTime">
          <el-date-picker v-model="reportFailForm.faultStartTime" placeholder="选择故障时间" format="yyyy年MM月dd日"
          type="datetime"   :picker-options="pickerOptions"value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('reportFailForm')">取消</el-button>
        <el-button type="primary" @click.native="reportFailInsert('reportFailForm')">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="维修内容"
               :visible.sync="finishFailFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="finishFailForm" label-width="80px" ref="finishFailForm">
        <el-form-item label="设备号" prop="equipmentNo">
          <el-input v-model="finishFailForm.equipmentNo" auto-complete="off" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="维修内容" prop="repairContent">
          <el-input v-model="finishFailForm.repairContent" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="完成时间" prop="repairTime">
          <el-date-picker v-model="finishFailForm.repairTime" placeholder="选择维修完成时间" format="yyyy年MM月dd日"
           type="datetime"   :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('finishFailForm')">取消</el-button>
        <el-button type="primary" @click.native="finishFailInsert('finishFailForm')">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="delVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteRow">确 定</el-button>
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

      total: 0, // 总记录数
      current: 1, // 页码
      limit: 10, // 每页记录数
      pages: '0', //总页码数

      equipmentCondition:{
        equipmentNo: '',
        beginTime: '',
        endTime:''
      },
      tableData: [{
        id: '',
        stationNo: '',
        equipmentNo: '',
        installDate: '2016-05-02',
        equipmentName: '王小虎2',
        equipmentStatus: '',
        failTime: '',
        repairTime: ''
      }
      ],
      insertForm: {
        stationNo: '',
        equipmentNo: '',
        installDate: '',
        equipmentName: ''
      },
      editForm: {
        stationNo: '',
        equipmentNo: '',
        installDate: '',
        equipmentName: '',
        equipmentStatus: '',
        failTime: '',
        repairTime: ''
      },
      reportFailForm: {
        equipmentNo: '',
        faultReason: '',
        faultStartTime: ''
      },
      finishFailForm: {
        equipmentNo: '',
        repairContent: '',
        repairTime: ''
      },
      editFormVisible: false,
      reportFailFormVisible: false,
      finishFailFormVisible: false,
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
    reportFail: function (index, row) {
      this.reportFailFormVisible = true;
      this.reportFailForm = Object.assign({}, row);//将数据传入dialog页面
      this.reportFailForm.index = index;//传递当前index
    },
    finishFail: function (index, row) {
      this.finishFailFormVisible = true;
      this.finishFailForm = Object.assign({}, row);//将数据传入dialog页面
      this.finishFailForm.index = index;//传递当前index
    },
    handleInsert() {
      this.insertFormVisible = true;
    },
    handleEdit: function (index, row) {
      this.editFormVisible = true;//dialog对话窗口打开
      this.editForm = Object.assign({}, row);//将数据传入dialog页面
      this.editForm.index = index;//传递当前index
      let installDate = new Date(+new Date(this.editForm.installDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      let failTime = new Date(+new Date(this.editForm.failTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      let repairTime = new Date(+new Date(this.editForm.repairTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      this.editForm.installDate = installDate
      this.editForm.failTime = failTime
      this.editForm.repairTime = repairTime
      console.log(this.editForm.installDate)
      console.log(this.editForm.failTime)
      console.log(this.editForm.repairTime)
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
      this.$axios.post('http://localhost:8181/mesEquipment/queryByList/' + current + "/" + limit,this.equipmentCondition).then(function (resp) {
        console.log(resp.data.data)
        for (let i = 0; i < resp.data.data.length; i++) {
          let installDate = new Date(+new Date(resp.data.data[i].installDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          let failTime = new Date(+new Date(resp.data.data[i].failTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          let repairTime = new Date(+new Date(resp.data.data[i].repairTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          resp.data.data[i].installDate = installDate
          resp.data.data[i].failTime = failTime
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
