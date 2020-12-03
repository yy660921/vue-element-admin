<template>
  <div>
    <div class="user-container">
      <el-row :gutter="32">
        <el-col :md="16" :lg="16">
          <el-card class="box-card">
            <div slot="header">
              <span>议题基本信息</span>
            </div>
            <el-row :gutter="32">
              <el-col :md="11" :lg="11">
                <el-image
                  :src="topic_info.avatar"
                  fit="contain"
                />
              </el-col>
              <el-col :md="13" :lg="13">
                <div class="info_list">
                  <div class="info">
                    <el-row :gutter="8">
                      <el-col :md="24" :lg="24">
                        <h1>{{ topic_info.name }}</h1>
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="8" class="info">
                    <el-col :md="4" :lg="4">
                      <span>基本信息</span>
                    </el-col>
                    <el-col :md="20" :lg="20">
                      <span>{{ topic_info.basic_info }}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="8" class="info">
                    <el-col :md="4" :lg="4">
                      <span>开始时间</span>
                    </el-col>
                    <el-col :md="20" :lg="20">
                      <span>{{ topic_info.start_time }}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="8" class="info">
                    <el-col :md="4" :lg="4">
                      <span>结束时间</span>
                    </el-col>
                    <el-col :md="20" :lg="20">
                      <span>{{ topic_info.end_time }}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="8" class="info">
                    <el-col :md="4" :lg="4">
                      <span>热度</span>
                    </el-col>
                    <el-col :md="20" :lg="20">
                      <span>{{ topic_info.hot }}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="8" class="info">
                    <el-col :md="4" :lg="4">
                      <span>敏感度</span>
                    </el-col>
                    <el-col :md="20" :lg="20">
                      <el-progress :percentage="topic_info.is_sensitive" :color="colors" />
                    </el-col>
                  </el-row>
                  <el-row :gutter="8" class="info">
                    <el-col :md="4" :lg="4">
                      <span>相关用户</span>
                    </el-col>
                    <el-col :md="20" :lg="20">
                      <el-tag v-for="tag in topic_info.related_users" :key="tag" :hint="true" class="tag_item">{{ tag }}</el-tag>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :md="8" :lg="8">
          <el-card class="box-card">
            <div slot="header">
              <span>议题立场分布</span>
            </div>
            <el-row :gutter="32">
              <el-col :md="24" :lg="24">
                <mix-chart :option="altitude_bar_chart_option" height="310px" />
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :md="16" :lg="16">
          <el-card class="box-card">
            <div slot="header">
              <span>扩散度分析</span>
            </div>
            <el-row :gutter="40" class="panel-group">
              <el-col :md="8" :lg="8" class="card-panel-col">
                <div class="card-panel">
                  <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  </div>
                  <div class="card-panel-description">
                    <div class="card-panel-text">
                      相关用户数量
                    </div>
                    <div class="card-panel-num">{{ topic_info.related_users_num }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" class="card-panel-col">
                <div class="card-panel">
                  <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  </div>
                  <div class="card-panel-description">
                    <div class="card-panel-text">
                      传播速度
                    </div>
                    <div class="card-panel-num">{{ topic_info.spread_speed }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :md="8" :lg="8" class="card-panel-col">
                <div class="card-panel">
                  <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  </div>
                  <div class="card-panel-description">
                    <div class="card-panel-text">
                      持续度
                    </div>
                    <div class="card-panel-num">{{ topic_info.continuous_time }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :md="8" :lg="8">
          <el-card class="box-card">
            <div slot="header">
              <span>平台分布</span>
            </div>
            <pie-chart :option="platform_pie_chart_option" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PieChart from '../dashboard/admin/components/PieChart'
import MixChart from '../../components/Charts/MixChart'
export default {
  name: 'Base',
  components: { PieChart, MixChart },
  data() {
    return {
      topic_info: {
        avatar: require('../../assets/imgs/merlin_156332592_914488e2-229d-42af-8108-297f3ea16862-master1050.jpg'),
        name: '反送中',
        basic_info: '是指香港自2019年3月31日开始、6月9日大规模爆发的社会运动,向香港特别行政区政府抗议其提出《逃犯条例》修订草案.',
        related_users: ['黄之锋', '罗冠聪', '陈凯兴'],
        start_time: '2019年3月31日',
        end_time: '2020年9月6日',
        hot: '2300',
        is_sensitive: 100,
        related_users_num: 124,
        spread_speed: '124/ 日',
        continuous_time: '1.5 年'
      },
      altitude_bar_chart_option: {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          reverse: true,
          data: ['反对', '中立', '支持']
        },
        series: [{
          data: [600, 100, 400],
          type: 'bar'
        }]
      },
      platform_pie_chart_option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Twitter', 'Facebook']
        },
        series: [
          {
            name: '平台分布',
            type: 'pie',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 300, name: 'Twitter' },
              { value: 200, name: 'Facebook' }
            ],
            animationDuration: 2600
          }
        ]
      },
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    }
  }

}
</script>

<style scoped lang="sass">
.user-container
  padding: 32px
  background-color: rgb(240, 242, 245)
  position: relative
  min-height: 918px

.image-container
  padding: 32px

.box-card
  margin-bottom: 20px

.info_list
  margin: 10px

  .info
    margin: 12px 0

    .tag_item
      margin-right: 5px

  .count
    font-weight: 700

.index
  text-align: center
  position: relative

.panel-group
  margin-top: 18px

  .card-panel-col
    margin-bottom: 32px

  .card-panel
    height: 108px
    cursor: pointer
    font-size: 12px
    position: relative
    overflow: hidden
    color: #666
    background: #fff
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05)
    border-color: rgba(0, 0, 0, .05)

    &:hover
      .card-panel-icon-wrapper
        color: #fff

      .icon-people
        background: #40c9c6

      .icon-message
        background: #36a3f7

      .icon-money
        background: #f4516c

      .icon-shopping
        background: #34bfa3

    .icon-people
      color: #40c9c6

    .icon-message
      color: #36a3f7

    .icon-money
      color: #f4516c

    .icon-shopping
      color: #34bfa3

    .card-panel-icon-wrapper
      float: left
      margin: 14px 0 0 14px
      padding: 16px
      transition: all 0.38s ease-out
      border-radius: 6px

    .card-panel-icon
      float: left
      font-size: 48px

    .card-panel-description
      float: right
      font-weight: bold
      margin: 26px
      margin-left: 0

      .card-panel-text
        line-height: 18px
        color: rgba(0, 0, 0, 0.45)
        font-size: 16px
        margin-bottom: 12px

      .card-panel-num
        font-size: 20px
</style>
