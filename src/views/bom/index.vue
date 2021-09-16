<template>
  <div>
    <el-form :inline="true" :model="bomCondition" class="demo-form-inline" style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="产品编号">
        <el-input v-model="bomCondition.productNo" placeholder="请输入编号查询"></el-input>
      </el-form-item>
      <el-form-item label="物料编号">
        <el-input v-model="bomCondition.materialNo" placeholder="请输入编号查询"></el-input>
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
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column align="center" label="序号" width="95" type="index" :index="typeIndex">
      </el-table-column>
      <el-table-column
        prop="materialNo"
        label="物料编号"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="productNo"
        label="产品编号"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="materialDesc"
        label="物料描述"
        align="center"
        sortable
        width="280">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleQuery(scope.$index, scope.row)">详细信息
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑物料信息"
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="物料编号" prop="materialNo">
          <el-input v-model="editForm.materialNo" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="产品编号" prop="productNo">
          <el-input v-model="editForm.productNo" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="物料描述" prop="materialDesc">
          <el-input v-model="editForm.materialDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工位" prop="stationNo">
          <el-select v-model="editForm.stationNo" placeholder="选择工位">
            <el-option v-for="(item,i) in stationForm" :label="item.stationName" :value="item.stationNo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量(件)" prop="productNum">
          <el-input v-model="editForm.productNum" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('editForm')">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
      </div>
    </el-dialog>

    <el-dialog title="物料详细信息"
               :visible.sync="queryFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="materialForm" label-width="80px" ref="editForm">
        <el-form-item label="物料编号" prop="materialNo">
          <el-input v-model="materialForm.materialNo" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="产品编号" prop="productNo">
          <el-input v-model="materialForm.productNo" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="物料描述" prop="materialDesc">
          <el-input v-model="materialForm.materialDesc" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="工位" prop="stationName">
          <el-input v-model="materialForm.stationName" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="数量(件)" prop="productNum">
          <el-input v-model="materialForm.productNum" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="manufacturer">
          <el-input v-model="materialForm.manufacturer" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="重量(kg)" prop="productWeight">
          <el-input v-model="materialForm.productWeight" auto-complete="off" readonly></el-input>
        </el-form-item>
      </el-form>
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
      delVisible: false,//删除提示弹框的状态
      msg: "",//记录每一条的信息，便于取id
      delarr: [],//存放删除的数据
      multipleSelection: [],//多选的数据

      total: 0, // 总记录数
      current: 1, // 页码
      limit: 10, // 每页记录数
      pages: '0', //总页码数

      bomCondition: {
        productNo: '',
        materialNo: ''
      },
      tableData: [{
        id: '',
        productNo: '',
        materialNo: '',
        materialDesc: '',
        stationNo: ''
      }],
      editForm: {
        id: '',
        productNo: '',
        materialNo: '',
        materialDesc: '',
        stationNo: '',
        productNum: ''
      },
      stationForm: [{
        stationNo: '',
        stationName: ''
      }],
      materialForm:{
        id: '',
        productNo: '',
        materialNo: '',
        materialDesc: '',
        stationName: '',
        productNum: '',
        manufacturer:'',
        productWeight:''
      },
      editFormVisible: false,
      queryFormVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.fetchPageData(1, 10);
    },
    deleteRow() {
      const _this = this
      this.$axios.delete('http://localhost:8181/mesBom/deleteBySelectIds/' + this.delarr).then(function (resp) {
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
    handleQuery: function (index, row) {
      this.queryFormVisible = true;//dialog对话窗口打开
      this.materialForm = Object.assign({}, row);//将数据传入dialog页面
      this.materialForm.index = index;//传递当前index
      const _this = this
      this.$axios.get('http://localhost:8181/mesStation/queryAllStation').then(function (resp) {
        _this.stationForm = resp.data;
      })
      this.$axios.get('http://localhost:8181/mesBom/queryByMaterialNo/'+row.materialNo).then(function (resp) {
        _this.materialForm = resp.data;
        console.log(_this.materialForm)
        console.log(_this.stationForm)
        for (let i = 0; i < _this.stationForm.length; i++) {
          if(resp.data.stationNo == _this.stationForm[i].stationNo){
            _this.materialForm.stationName=_this.stationForm[i].stationName

            break;
          }
        }
      })
    },
    handleEdit: function (index, row) {
      this.editFormVisible = true;//dialog对话窗口打开
      this.editForm = Object.assign({}, row);//将数据传入dialog页面
      this.editForm.index = index;//传递当前index
      this.editForm.stationNo = "";
      const _this = this
      this.$axios.get('http://localhost:8181/mesStation/queryAllStation').then(function (resp) {
        _this.stationForm = resp.data;
      })
    },
    handleInsert() {
      this.insertFormVisible = true;
    },
    //取消
    handleCancel(formName) {
      this.editFormVisible = false;
    },
    //更新
    handleUpdate(forName) {
      //dialog页面数据写入到tableData页面上
      //this.$set(tableName,tableIndex,data)
      const _this = this
      this.$axios.put('http://localhost:8181/mesBom/updateBom', this.editForm).then(function (resp) {
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
      this.$axios.post('http://localhost:8181/mesBom/queryByList/' + current + "/" + limit, this.bomCondition).then(function (resp) {
        console.log(resp.data.data)
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
