<template>
  <div>
    <span style="margin-top:20px;margin-left: 25px;font-size: 40px;">正在生产的计划：{{ this.nowPlanNo }}</span>
    <span style="margin-top:20px;margin-left: 25px;font-size: 40px;">合格数：{{ this.nowPlanActualNum }}</span>
    <span style="margin-top:20px;margin-left: 25px;font-size: 40px;">手动焊接数：{{ this.nowPlanFailNum }}</span>
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
      <el-form-item label="计划状态">
        <el-select v-model="planCondition.planStatus" placeholder="选择状态">
          <el-option label="已完成" value="1"></el-option>
          <el-option label="未完成" value="0"></el-option>
        </el-select>
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
        <template slot-scope="scope">
          <span v-if="scope.row.planSchedule == 'am'">上午班</span>
          <span v-if="scope.row.planSchedule == 'pm'">下午班</span>
        </template>
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
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleQuery(scope.$index, scope.row)">查看所需物料
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status != '1'&&scope.row.planStatus != '1'"
            @click="startPlan(scope.$index, scope.row)">切换计划
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.planStatus != '1'"
            @click="handleFinish(scope.$index, scope.row)">一键完成
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增计划"
               :visible.sync="insertFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="insertForm" label-width="80px" ref="insertForm">
        <el-form-item label="计划号" prop="planNo">
          <el-input v-model="insertForm.planNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划班次" prop="planSchedule">
          <el-select v-model="insertForm.planSchedule" placeholder="选择班次">
            <el-option label="上午班" value="am"></el-option>
            <el-option label="下午班" value="pm"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品型号" prop="productNo">
          <el-select v-model="insertForm.productNo" placeholder="选择产品">
            <el-option v-for="(item,i) in productForm" :label="item.productNo" :value="item.productNo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划数量" prop="planNum">
          <el-input v-model="insertForm.planNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="计划日期" prop="planDate">
          <el-date-picker v-model="insertForm.planDate" placeholder="选择计划日期" format="yyyy年MM月dd日"
                          type="datetime" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss">
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
        <el-form-item label="合格数量" prop="actualNum">
          <el-input v-model="editForm.actualNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手动焊接数量" prop="failNum">
          <el-input v-model="editForm.failNum" auto-complete="off"></el-input>
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

    <el-dialog title="物料所需数量" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="productBomData">
        <el-table-column align="center" label="序号" width="95" type="index" :index="typeIndex"></el-table-column>
        <el-table-column align="center" property="stationNo" label="工位号" width="150"></el-table-column>
        <el-table-column align="center" property="materialNo" label="物料编号" width="250"></el-table-column>
        <el-table-column align="center" property="materialDesc" label="物料描述" width="350"></el-table-column>
        <el-table-column align="center" property="productNum" label="数量(件)" width="100"></el-table-column>
      </el-table>
    </el-dialog>

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
    this.getProductPlan();
  },
  destroyed() {
    clearInterval(this.timer)
  },
  mounted() {
    this.queryAllPlanNo()
    this.timer = setInterval(this.getProductPlan, 10000)
  },
  data() {
    return {
      delVisible: false,//删除提示弹框的状态
      msg: "",//记录每一条的信息，便于取id
      delarr: [],//存放删除的数据
      multipleSelection: [],//多选的数据
      nowPlanNo: '',//正在生产的计划号
      nowPlanActualNum: '',//正在生产的计划的合格数量
      nowPlanFailNum: '',//正在生产的计划的手动焊接数量
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
        actualNum: '',
        planStatus: '',
        status: ''
      }],
      insertForm: {
        planNo: '',
        productNo: '',
        planDate: '',
        planNum: '',
        planSchedule: ''
      },
      editForm: {
        planNo: '',
        planDate: '',
        planNum: '',
        actualNum: '',
        failNum: '',
        planSchedule: ''
      },
      productBomData: [{
        id: '',
        stationNo: '',
        materialNo: '',
        materialDesc: '',
        productNum: ''
      }],
      autoFillId: '',
      editFormVisible: false,
      finishVisible: false,
      insertFormVisible: false,
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
    getProductPlan() {
      const _this = this
      this.$axios.get('http://localhost:8181/mesPrimaryProducePlan/getProductPlan').then(function (resp) {
        console.log(resp.data.mes)
        if (resp.data.mes == '查询成功') {
          _this.nowPlanNo = resp.data.mesPrimaryProducePlan.planNo;
          _this.nowPlanActualNum = resp.data.mesPrimaryProducePlan.actualNum
          _this.nowPlanFailNum = resp.data.mesPrimaryProducePlan.failNum
        } else {
          _this.nowPlanNo = ''
          _this.nowPlanActualNum = 0
          _this.nowPlanFailNum = 0
        }
      })
    },
    createFilter1(queryString) {
      return (planNoList) => {
        return (planNoList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    queryAllPlanNo() {
      let list = []
      const _this = this
      this.$axios.get('http://localhost:8181/mesPrimaryProducePlan/queryAllPlanNo').then(function (resp) {
        list = resp.data.map(item => ({value: item}))
        console.log(list)
        _this.planNoList = list
      })
    },
    startPlan: function (index, row) {
      let _this = this;
      if (this.nowPlanNo != '') {
        this.$message({
          type: "error",
          message: '已经有正在生产的计划了，请完成后再继续该计划！',
        });
      } else {
        this.$axios.get('http://localhost:8181/mesPrimaryProducePlan/startPlanById/' + row.id).then(function (resp) {
          console.log(resp.data)
          if (resp.data == '开始生产') {
            _this.$router.go(0);
          } else {
            alert(resp.data);
          }
        })
      }
    },
    handleQuery: function (index, row) {
      this.dialogTableVisible = true;//dialog对话窗口打开
      const _this = this
      this.$axios.get('http://localhost:8181/mesBom/queryByProductNo/' + row.productNo).then(function (resp) {
        console.log(resp.data)
        for (let i = 0; i < resp.data.length; i++) {
          resp.data[i].productNum = resp.data[i].productNum * row.planNum
        }
        _this.productBomData = resp.data
      })
    },
    deleteRow() {
      const _this = this
      this.$axios.delete('http://localhost:8181/mesPrimaryProducePlan/deleteBySelectIds/' + this.delarr).then(function (resp) {
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
      this.$axios.get('http://localhost:8181/mesPrimaryProducePlan/autoFillPlanById/' + this.autoFillId).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "补充成功") {
          _this.$router.go(0);
        } else {
          alert(resp.data)
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
      this.autoFillId = row.id;
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
      let _this = this;
      this.insertFormVisible = true;
      this.$axios.get('http://localhost:8181/mesProduct/queryAllProduct').then(function (resp) {
        _this.productForm = resp.data;
      })
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
      this.$axios.post('http://localhost:8181/mesPrimaryProducePlan/addPlan', this.insertForm).then(function (resp) {
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
      this.$axios.put('http://localhost:8181/mesPrimaryProducePlan/updatePlan', this.editForm).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "修改成功") {
          _this.$router.go(0);
        } else {
          alert(resp.data)
        }
      })
      this.editFormVisible = false;
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
