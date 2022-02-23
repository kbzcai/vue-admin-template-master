<template>
  <div>
    <el-form :inline="true" :model="stationCondition" class="demo-form-inline"
             style="margin-top:20px;margin-left: 25px;">
      <el-form-item label="工位名称">
        <el-autocomplete
          class="inline-input"
          v-model="stationCondition.stationName"
          :fetch-suggestions="querySearch1"
          placeholder="请输入工位名称查询"
          :trigger-on-focus="false"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="stationCondition.status" placeholder="状态">
          <el-option label="运行中" value="1"></el-option>
          <el-option label="等待中" value="0"></el-option>
          <el-option label="故障" value="-1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleInsert">新增工位</el-button>
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
        prop="stationName"
        label="工位名称"
        align="center"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        sortable
        :formatter="stateFormat"
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
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加工位信息"
               :visible.sync="insertFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="insertForm" label-width="80px" ref="insertForm">
        <el-form-item label="工位号" prop="stationNo">
          <el-input v-model="insertForm.stationNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工位名称" prop="stationName">
          <el-input v-model="insertForm.stationName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('insertForm')">取消</el-button>
        <el-button type="primary" @click.native="Insert('insertForm')">新增</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑工位信息"
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="工位号" prop="stationNo">
          <el-input v-model="editForm.stationNo" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="工位名称" prop="stationName">
          <el-input v-model="editForm.stationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="editForm.status" placeholder="选择状态">
            <el-option label="运行中" value="1"></el-option>
            <el-option label="等待中" value="0"></el-option>
            <el-option label="故障" value="-1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('editForm')">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
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
  mounted() {
    this.queryAllStationName()
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

      stationNameList: '',
      stationCondition: {
        stationName: '',
        status: ''
      },
      tableData: [{
        id: '',
        stationNo: '',
        stationName: '',
        status: ''
      }],
      insertForm: {
        stationNo: '',
        stationName: ''
      },
      editForm: {
        stationNo: '',
        equipmentNo: '',
        status: ''
      },
      editFormVisible: false,
      insertFormVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.fetchPageData(1, 10);
    },
    handleSelect(item) {
      console.log(item);
    },
    querySearch1(queryString, cb) {
      let stationNameList = this.stationNameList;
      let results = queryString ? stationNameList.filter(this.createFilter1(queryString)) : stationNameList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter1(queryString) {
      return (stationNameList) => {
        return (stationNameList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    queryAllStationName() {
      let list = []
      const _this = this
      this.$axios.get('http://localhost:8181/mesStation/queryAllStationName').then(function (resp) {
        list = resp.data.map(item => ({value: item}))
        console.log(list)
        _this.stationNameList = list
      })
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
      this.$axios.delete('http://localhost:8181/mesStation/deleteBySelectIds/' + this.delarr).then(function (resp) {
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
    handleInsert() {
      this.insertFormVisible = true;
    },
    handleEdit: function (index, row) {
      this.editFormVisible = true;//dialog对话窗口打开
      this.editForm = Object.assign({}, row);//将数据传入dialog页面
      this.editForm.index = index;//传递当前index
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
      this.$axios.post('http://localhost:8181/mesStation/addStation', this.insertForm).then(function (resp) {
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
      this.$axios.put('http://localhost:8181/mesStation/updateStation', this.editForm).then(function (resp) {
        console.log(resp.data)
        if (resp.data == "修改成功") {
          _this.$router.go(0);
        } else {
          alert("修改失败")
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
      this.$axios.post('http://localhost:8181/mesStation/queryByList/' + current + "/" + limit, this.stationCondition).then(function (resp) {
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
