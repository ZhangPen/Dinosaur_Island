<!-- 普通皮肤 -->
<template>
  <div class="app-container">
    <!-- 表单查询 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchForm"
      @submit.native.prevent="
        searchForm.pageNo = 1;
        getMallData();
      "
    >
      <el-form-item label="恐龙类型" style="margin-right: 30px;">
        <el-select v-model="searchForm.dinosaurTypes" clearable placeholder="恐龙类型">
          <el-option v-for="it in dinosaurList" :key="it.id" :label="it.name" :value="it.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="价格区间">
        <el-form-item prop="minPrice" style="width: 100px;margin-right: 0;">
          <el-input v-model="searchForm.minPrice" @blur="validateMin(1)" placeholder="请输入最小值"/>
        </el-form-item>
        ~
        <el-form-item prop="maxPrice" style="width: 100px;">
          <el-input v-model="searchForm.maxPrice" @blur="validateMax(1)" placeholder="请输入最大值"/>
        </el-form-item>
      </el-form-item>
      <el-form-item label="积分区间">
        <el-form-item prop="minIntegral" style="width: 100px;margin-right: 0;">
          <el-input v-model="searchForm.minIntegral" @blur="validateMin(2)" placeholder="请输入最小值"/>
        </el-form-item>
        ~
        <el-form-item prop="maxIntegral" style="width: 100px;">
          <el-input v-model="searchForm.maxIntegral" @blur="validateMax(2)" placeholder="请输入最大值"/>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="mallListSty">
      <div v-for="mall in mallList" v-if="mallList.length" class="liveSty">
        <template v-if="mall.type == 1">
          <el-image
            style="width: 100%; height: 150px;"
            :src="mall.image"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :initial-index="4"
            fit="cover"
          />
        </template>
        <template v-else>
          <video controls preload="auto" style="object-fit: fill;width: 100%;height: 150px;" :src="mall.video" />
        </template>
        <el-divider />
        <p>{{ mall.name }}</p>
        <el-divider />
        <p>价格：￥{{ mall.price }}</p>
        <p>积分：{{ mall.jf }}</p>
        <div>
          <el-button type="primary">积分购买</el-button>
          <el-button type="primary" plain>代金券购买</el-button>
        </div>
        <div class="noSty">{{ mall.no }}</div>
      </div>
      <div v-if="!mallList.length" style="position: absolute;left: 50%;top: 30%;">
        <el-empty description="暂无数据" />
      </div>
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
  name: 'ordinarySkin',
  data() {
    return {
      dinosaurList: [
        { id: 1, name: '霸王龙' },
        { id: 2, name: '翼龙' },
        { id: 3, name: '三角龙' }
      ],
      searchForm: {
        dinosaurTypes: '',
        minPrice: '',
        maxPrice: '',
        minIntegral: '',
        maxIntegral: '',
        pageNo: 1,
        pageSize: 10,
        total:0
      },
      mallList: []
    }
  },
  created() {
    this.getMallData()
  },
  methods: {
    getMallData() {
      // type:1//图片展示，2视频展示
      this.mallList = [
        { id: 1, no: 1, name: '火焰之龙1', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' },
        { id: 2, no: 2, name: '火焰之龙2', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 2, video: '', jf: '10000', price: '258' },
        { id: 3, no: 3, name: '火焰之龙3', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' },
        { id: 4, no: 4, name: '火焰之龙4', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 2, video: '', jf: '10000', price: '258' },
        { id: 5, no: 5, name: '火焰之龙5', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' },
        { id: 6, no: 6, name: '火焰之龙6', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' },
        { id: 7, no: 7, name: '火焰之龙7', image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', type: 1, video: '', jf: '10000', price: '258' }
      ]
      this.searchForm.total = 100
    },
    resetForm() {
      this.$refs['searchForm'].resetFields()
      this.searchForm = {
        dinosaurTypes: '',
        minPrice: '',
        maxPrice: '',
        minIntegral: '',
        maxIntegral: ''
      }
    },
    validateMin(type) {
      if (type == 1 && !this.searchForm.minPrice || type == 2 && !this.searchForm.minIntegral) {
        return
      }
      const positiveNumberRegex = /^\d*\.?\d+$/
      const op = type == 1 ? this.searchForm.minPrice : this.searchForm.minIntegral
      const mp = type == 1 ? this.searchForm.maxPrice : this.searchForm.maxIntegral
      const one = Number(op)
      const max = Number(mp)
      if (max && one > max || !positiveNumberRegex.test(op)) {
        this.$message({
          message: this.$t('输入值不得大于最大阈值 且 为正数'),
          type: 'error'
        })
        type == 1 ? this.searchForm.minPrice = '' : this.searchForm.minIntegral = ''
      }
    },
    validateMax(type) {
      if (type == 1 && !this.searchForm.maxPrice || type == 2 && !this.searchForm.maxIntegral) {
        return
      }
      const positiveNumberRegex = /^\d*\.?\d+$/
      const op = type == 1 ? this.searchForm.maxPrice : this.searchForm.maxIntegral
      const mp = type == 1 ? this.searchForm.minPrice : this.searchForm.minIntegral
      const one = Number(op)
      const min = Number(mp)
      if (min && one < min || !positiveNumberRegex.test(op)) {
        this.$message({
          message: this.$t('输入值不得小于最小阈值 且 为正数'),
          type: 'error'
        })
        type == 1 ? this.searchForm.maxPrice = '' : this.searchForm.maxIntegral = ''
      }
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getMallData();
    },
    handleCurrentChange(val) {
      this.searchForm.pageNo = val;
      this.getMallData();
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
