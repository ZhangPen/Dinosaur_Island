<template>
  <div class="app-container">
    <userCard />
    <div v-if="currentRole == 'admin'">
      <el-card>
        <div slot="header">
          <span>服务数据</span>
        </div>
        <div id="userChart" :style="{ height:'300px',width:'100%'}" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
import resize from '@/utils/resize'
import userCard from './userCard'

export default {
  components: { userCard },
  mixins: [resize],
  data() {
    return {
      currentRole: 'admin',
      chart: null
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  created() {
    if (!this.userInfo.roles.includes('admin')) {
      this.currentRole = 'other'
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const dom = document.getElementById('userChart')
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
    }
  }
}
</script>
