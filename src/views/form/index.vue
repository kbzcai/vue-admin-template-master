<template>
  <div>
    <el-form :inline="true" :model="productCondition" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="产品编号">
        <el-autocomplete
          class="inline-input"
          v-model="productCondition.productNo"
          :fetch-suggestions="querySearch1"
          placeholder="请输入产品编号查询"
          :trigger-on-focus="false"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"
                   icon="el-icon-search">查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteAll"
                   icon="el-icon-delete ">批量删除
        </el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-upload
          class="upload-demo"
          action="http://localhost:8181/mesBom/importBom"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :on-success="refresh"
          :limit="3"
          :on-exceed="handleExceed">
          <el-button type="primary"
                     icon="el-icon-upload2">导入BOM表
          </el-button>
        </el-upload>
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
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column align="center" label="序号" width="95" type="index" :index="typeIndex">
      </el-table-column>
      <el-table-column
        prop="productNo"
        label="产品编号"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            @click="handleEdit(scope.$index, scope.row)">编辑-->
          <!--          </el-button>-->
          <el-button
            size="mini"
            round
            icon="el-icon-view"
            @click="handleQuery(scope.$index, scope.row)">查看产品物料
          </el-button>
          <el-button
            size="mini"
            round
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="产品物料" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="productBomData">
        <el-table-column align="center" label="序号" width="95" type="index" :index="typeIndex">
        </el-table-column>
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
  mounted() {
    this.queryAllProductNo()
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

      productNoList: '',
      productCondition: {
        productNo: ''
      },
      tableData: [{
        id: '',
        productNo: ''
      }],
      productBomData: [{
        id: '',
        stationNo: '',
        materialNo: '',
        materialDesc: '',
        productNum: ''
      }],
      dialogTableVisible: false
    }
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
    querySearch1(queryString, cb) {
      let productNoList = this.productNoList;
      let results = queryString ? productNoList.filter(this.createFilter1(queryString)) : productNoList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter1(queryString) {
      return (productNoList) => {
        return (productNoList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    queryAllProductNo() {
      let list = []
      const _this = this
      this.$axios.get('http://localhost:8181/mesProduct/queryAllProductNo').then(function (resp) {
        list = resp.data.map(item => ({value: item}))
        console.log(list)
        _this.productNoList = list
      })
    },
    refresh(response, file, fileList) {
      this.reload()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // importBom() {
    //   const _this = this
    //   this.$axios.post('http://localhost:8181/mesBom/importBom').then(function (resp) {
    //     console.log(resp.data)
    //     if (resp.data == "删除成功") {
    //       _this.$router.go(0);
    //     } else {
    //       alert("删除失败")
    //     }
    //   })
    // },
    onSubmit() {
      this.fetchPageData(1, 10);
    },
    deleteRow() {
      const _this = this
      this.$axios.delete('http://localhost:8181/mesProduct/deleteBySelectIds/' + this.delarr).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "删除成功") {
          _this.reload()
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
    handleInsert() {
      this.insertFormVisible = true;
    },
    handleQuery: function (index, row) {
      this.dialogTableVisible = true;//dialog对话窗口打开
      const _this = this
      this.$axios.get('http://localhost:8181/mesBom/queryByProductNo/' + row.productNo).then(function (resp) {
        console.log(resp.data)
        _this.productBomData = resp.data
      })
    },
    //取消
    handleCancel(formName) {
      this.editFormVisible = false;
    },
    typeIndex(index) {
      let vm = this; //处理分页数据的 index
      return (vm.current - 1) * vm.limit + index + 1;
    },
    fetchPageData: function (current, limit) {
      const _this = this
      this.$axios.post('http://localhost:8181/mesProduct/queryByList/' + current + "/" + limit, this.productCondition).then(function (resp) {
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
  },
  inject:['reload']
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
