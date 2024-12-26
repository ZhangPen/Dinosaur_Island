<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-card>
        <div slot="header">
          <span>每日购买记录</span>
        </div>
        <div id="purchaseRecord" :style="{ height: '300px', width: '100%' }" />
      </el-card>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="6" :xs="24">
        <el-card>
          <div slot="header">
            <span>消费排名</span>
          </div>
          <div v-for="(item, inx) in rankingList" :key="inx" class="text_item" @click="showDetail(item)">
            <i v-if="inx == 0" class="el-icon-medal-1" size="medium" />
            {{ item.name }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div v-if="detailList.length">
            <div slot="header">
              <span>团队名：{{ detailName }}</span>
            </div>
            <el-divider />
            <el-table :data="detailList" stripe style="width: 100%">
              <el-table-column prop="date" label="日期" />
              <el-table-column prop="price" label="实际金额" />
              <el-table-column prop="vouchers" label="代金券" />
            </el-table>
            <el-pagination
              :current-page="requestNo.pageNo"
              :page-size="requestNo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="requestNo.total"
              :page-sizes="[10, 20, 50, 100]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <el-empty v-else description="点击左侧团队查看消费详情" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import resize from '@/utils/resize'
import echarts from 'echarts'
export default {
  name: 'TeamOfUsers',
  mixins: [resize],
  data() {
    return {
      chart: null,
      rankingList: [],
      detailName: '',
      detailList: [],
      requestNo:{
        pageNo:1,
        pageSize:10,
        total:0
      }
    }
  },
  mounted() {
    this.getRankingList()
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getRankingList() {
      this.rankingList = [
        { id: '1', name: '张三团队' },
        { id: '2', name: '李四团队' },
        { id: '3', name: '王五团队' },
        { id: '4', name: '赵六团队' },
        { id: '5', name: '谢七团队' },
        { id: '6', name: '朱八团队' }
      ]
    },
    initChart() {
      const dom = document.getElementById('purchaseRecord')
      this.chart = echarts.init(dom)

      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'bar',
            color: '#e4393c'
          },
          {
            data: [120, 1, 100, 20, 50, 77, 88],
            type: 'bar',
            color: '#91cc75'
          }
        ]
      })
    },
    showDetail(item) {
      this.detailName = item.name
      this.getTeamDetai()
    },
    getTeamDetai(){
      this.detailList = [
        { date: '2024-08-22', price: 1000, vouchers: 10001 },
        { date: '2024-08-23', price: 100, vouchers: 5 },
        { date: '2024-08-24', price: 50, vouchers: 2220 },
        { date: '2024-08-25', price: 7, vouchers: 202 }
      ]
      this.requestNo.total = this.detailList.length
    },
    handleSizeChange(val) {
      this.requestNo.pageSize = val;
      this.getTeamDetai();
    },
    handleCurrentChange(val) {
      this.requestNo.pageNo = val;
      this.getTeamDetai();
    },
  }
}
</script>

<style lang="scss" scoped>
.text_item {
    font-size: 14px;
    padding: 10px;

    &:hover {
        background-color: #1890ff;
        color: #fff;
    }
}
</style>
