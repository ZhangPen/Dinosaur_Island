<!-- 购买记录 -->
<template>
  <div class="app-container">
    <!-- 表单查询 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchForm"
      @submit.native.prevent="
        searchForm.pageNo = 1;
        getRecordData();
      "
    >
      <el-form-item label="关键词">
        <el-form-item prop="keyWord" style="width: 100px;margin-right: 0;">
          <el-input v-model="searchForm.keyWord" placeholder="请输入关键词"/>
        </el-form-item>
      </el-form-item>
      <el-form-item label="日期区间">
        <el-form-item prop="keyWord" style="margin-right: 0;">
          <el-date-picker
            v-model="searchForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="recordSty">
      <el-table :data="recordList" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
    <el-divider />
    <el-pagination
      :current-page="searchForm.pageNo"
      :page-size="searchForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
      :total="searchForm.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

export default {
  name: 'purchaseRecord',
  data() {
    return {
      searchForm: {
        keyWord: '',
        date: [],
        pageNo: 1,
        pageSize: 10,
        total:0
      },
      recordList: []
    }
  },
  created() {
    this.getRecordData()
  },
  methods: {
    getRecordData() {
      // type:1//图片展示，2视频展示
      this.recordList = [
        // { id: 1, no: 1, name: '火焰之龙1', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' },
        // { id: 2, no: 2, name: '火焰之龙2', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 2, video: '', jf: '10000', price: '258' },
        // { id: 3, no: 3, name: '火焰之龙3', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' },
        // { id: 4, no: 4, name: '火焰之龙4', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 2, video: '', jf: '10000', price: '258' },
        // { id: 5, no: 5, name: '火焰之龙5', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' },
        // { id: 6, no: 6, name: '火焰之龙6', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' },
        // { id: 7, no: 7, name: '火焰之龙7', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' }
      ]
      this.searchForm.total = 100
    },
    resetForm() {
      this.$refs['searchForm'].resetFields()
      this.searchForm = {
        keyWord: '',
        date: [],
      }
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getRecordData();
    },
    handleCurrentChange(val) {
      this.searchForm.pageNo = val;
      this.getRecordData();
    },
  }
}
</script>

<style lang="scss" scoped>
.el-divider {
  margin: 12px 0;
}

.mallListSty {
  display: flex;
  flex-wrap: wrap;

  .liveSty {
    padding: 20px;
    width: calc(20% - 20px);
    margin-bottom: 2%;
    margin-right: 20px;
    border: 1px solid #DCDFE6;
    text-align: center;
    position: relative;
    border-radius: 8px;
  }

  .noSty {
    position: absolute;
    left: 0;
    top: 0;
    background: #409eff;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
