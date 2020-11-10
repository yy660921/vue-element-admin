<template>
  <div class="topic-container">
    <el-row :gutter="32">
      <el-card class="box-card">
        <div slot="header">
          <span>扩散传播指标</span>
        </div>
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
      </el-card>
    </el-row>
    <el-row :gutter="32">
      <el-card>
        <div slot="header">
          <span>事件传播趋势</span>
        </div>
        <el-col :span="24">
          <mix-chart :option="spread_trend_graph_option" height="470px" />
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import MixChart from '../../components/Charts/MixChart'
import CountTo from 'vue-count-to'
export default {
  name: 'Spread',
  components: { MixChart, CountTo },
  data() {
    return {
      spread_trend_graph_option: {
        xAxis: {
          type: 'category',
          data: ['2020/5/27', '2020/5/28', '2020/5/29', '2020/5/30', '2020/5/31', '2020/6/1', '2020/6/2', '2020/6/3', '2020/6/4', '2020/6/5', '2020/6/6', '2020/6/7', '2020/6/8', '2020/6/9', '2020/6/10', '2020/6/11', '2020/6/12', '2020/6/13', '2020/6/14', '2020/6/15', '2020/6/16', '2020/6/17', '2020/6/18', '2020/6/19', '2020/6/20', '2020/6/21', '2020/6/22', '2020/6/23', '2020/6/24', '2020/6/25', '2020/6/26', '2020/6/27', '2020/6/28', '2020/6/29', '2020/6/30', '2020/7/1', '2020/7/2', '2020/7/3', '2020/7/4', '2020/7/5', '2020/7/6', '2020/7/7', '2020/7/8', '2020/7/9', '2020/7/10', '2020/7/11', '2020/7/12', '2020/7/13', '2020/7/14', '2020/7/15', '2020/7/16', '2020/7/17', '2020/7/18', '2020/7/19', '2020/7/20', '2020/7/21', '2020/7/22', '2020/7/23', '2020/7/24', '2020/7/25', '2020/7/26', '2020/7/27', '2020/7/28', '2020/7/29', '2020/7/30', '2020/7/31', '2020/8/1', '2020/8/2', '2020/8/3', '2020/8/4', '2020/8/5', '2020/8/6', '2020/8/7', '2020/8/8', '2020/8/9', '2020/8/10', '2020/8/11', '2020/8/12', '2020/8/13', '2020/8/14', '2020/8/15', '2020/8/16', '2020/8/17', '2020/8/18', '2020/8/19', '2020/8/20', '2020/8/21', '2020/8/22', '2020/8/23', '2020/8/24', '2020/8/25', '2020/8/26', '2020/8/27', '2020/8/28', '2020/8/29', '2020/8/30', '2020/8/31', '2020/9/1', '2020/9/2', '2020/9/3', '2020/9/4', '2020/9/5', '2020/9/6', '2020/9/7', '2020/9/8', '2020/9/9', '2020/9/10', '2020/9/11', '2020/9/12']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 0, 0, 1, 0, 0, 0, 11, 2, 0, 0, 0, 0, 0, 0, 0, 168, 6, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 8, 1, 0, 0, 0, 0, 51, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 243, 54, 4, 0, 2, 1, 0, 0, 47, 2, 101, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0],
            type: 'line',
            smooth: true
          }
        ]
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
