<template>
  <div class="topic-container">
    <el-row :gutter="0">
      <el-card class="box-card">
        <div slot="header">
          <span>扩散传播指标</span>
        </div>
        <div :style="styles.index_style">
          <el-col :span="6" class="index">
            <h3>当前事件热度</h3>
            <el-progress :percentage="event_spread_info.hot" type="dashboard" :color="colors" />
          </el-col>
          <el-col :span="6" class="index">
            <h3>过去24小时平均传播速度</h3>
            <div class="info">
              <count-to :start-val="0" :end-val="event_spread_info.speed" class="info_count" />
              条/小时
            </div>
          </el-col>
          <el-col :span="6" class="index">
            <h3>峰值传播速度</h3>
            <div class="info">
              <count-to :start-val="0" :end-val="event_spread_info.top" class="info_count" />
              条/小时
            </div>
          </el-col>
          <el-col :span="6" class="index">
            <h3>事件持续时间</h3>
            <div class="info">
              <count-to :start-val="0" :end-val="event_spread_info.continuous_time / 24" class="info_count" />
              天
              <count-to :start-val="0" :end-val="event_spread_info.continuous_time % 24" class="info_count" />
              小时
            </div>
          </el-col>
        </div>
      </el-card>
    </el-row>
    <el-row :gutter="0">
      <el-card>
        <div slot="header">
          <span>事件传播趋势</span>
        </div>
        <v-chart :init-options="spread_trend_graph_option" :options="spread_trend_graph_option" :style="styles.trend_style" theme="macarons" />
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Echarts from 'vue-echarts/components/ECharts'
import { getSpreadData } from '../../api/topic/spread'
require('echarts/theme/macarons') // echarts theme
import CountTo from 'vue-count-to'
export default {
  name: 'Spread',
  components: {
    'v-chart': Echarts,
    CountTo
  },
  data() {
    return {
      styles: {
        index_style: {
          height: '750px',
          width: '100%'
        },
        trend_style: {
          height: '750px',
          width: '100%'
        },
        relation_style: {
          height: '270px'
        }
      },
      spread_trend_graph_option: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      },
      event_spread_info: {
        hot: 98,
        speed: 79,
        top: 1729,
        continuous_time: 12591
      },
      colors: [
        { color: '#6f7ad3', percentage: 20 },
        { color: '#1989fa', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#e6a23c', percentage: 80 },
        { color: '#f56c6c', percentage: 100 }
      ]
    }
  },
  computed: {
    topic() {
      return this.$store.getters.topic
    }
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  methods: {
    getHeight() {
      this.styles.index_style.height = (window.innerHeight - 50 - 64 - 25) * 0.35 - 1 - 55 - 20 - 20 - 1 + 'px'
      this.styles.trend_style.height = (window.innerHeight - 50 - 64 - 25) * 0.65 - 1 - 55 - 20 - 20 - 1 + 'px'
      this.getSpreadData()
    },
    getSpreadData() {
      getSpreadData(this.topic).then(response => {
        this.spread_trend_graph_option.xAxis.data = response.data['spread_graph']['legend']
        this.spread_trend_graph_option.series = []
        for (let i = 0; i < response.data['spread_graph']['series'].length; i++) {
          this.spread_trend_graph_option.series.push({
            data: response.data['spread_graph']['series'][i],
            type: 'line',
            smooth: true
          })
        }
        console.log(this.spread_trend_graph_option)
        this.event_spread_info = response.data['event_spread_info']
      })
    }
  }
}
</script>

<style scoped lang="sass">
  .topic-container
    padding: 32px
    background-color: rgb(240, 242, 245)
    position: relative
    min-height: 918px

    .box-card
      margin-bottom: 25px

  .index
    text-align: center
    margin-bottom: 15px

    .info
      margin: 50px 0
      font-size: 30px
      font-weight: 700
      font-family: "Microsoft YaHei"

    .info_count
      font-size: 36px
      font-family: Consolas
      color: #3b91b6
</style>
