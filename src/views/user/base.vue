<template>
  <div>
    <div class="user-container">
      <el-row :gutter="32">
        <el-col :md="24" :lg="24">
          <el-card class="box-card">
            <div slot="header">
              <span>用户基本信息</span>
            </div>
            <el-row :gutter="32">
              <el-col :md="4" :lg="4">
                <el-image
                  :src="user_info.avatar"
                  fit="contain"
                />
              </el-col>
              <el-col :md="4" :lg="4">
                <div>
                  <div class="info_list">
                    <div class="info">
                      <h1>{{ user_info.name }}</h1>
                    </div>
                    <div class="info">
                      <el-row gutter="8" class="info">
                        <el-col :md="8" :lg="8">
                          <span>年龄</span>
                        </el-col>
                        <el-col :md="16" :lg="16">
                          <span>{{ user_info.age }}</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="info">
                      <el-row gutter="8" class="info">
                        <el-col :md="8" :lg="8">
                          <span>性别</span>
                        </el-col>
                        <el-col :md="16" :lg="16">
                          <span>{{ user_info.gender }}</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="info">
                      <el-row gutter="8" class="info">
                        <el-col :md="8" :lg="8">
                          <span>地点</span>
                        </el-col>
                        <el-col :md="16" :lg="16">
                          <span>{{ user_info.location }}</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="info">
                      <el-row gutter="8" class="info">
                        <el-col :md="8" :lg="8">
                          <span>关注内容</span>
                        </el-col>
                        <el-col :md="16" :lg="16">
                          <el-tag v-for="tag in user_info.tags" :key="tag" :hint="true" class="tag_item">{{ tag }}</el-tag>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :md="8" :lg="8">
                <el-row gutter="8">
                  <div class="info_list">
                    <el-col :md="12" :lg="12">
                      <div class="index">
                        <div class="info">中心度</div>
                        <div class="info">
                          <count-to :start-val="0" :end-val="user_info.followed" :duration="2600" class="count" />
                        </div>
                        <div class="info">
                          <el-progress type="dashboard" :percentage="user_info.followed_trend" :color="colors" />
                        </div>
                      </div>
                    </el-col>
                    <el-col :md="12" :lg="12">
                      <div class="index">
                        <div class="info">煽动性</div>
                        <div class="info">
                          <count-to :start-val="0" :end-val="user_info.focus" :duration="2600" class="count" />
                        </div>
                        <div class="info">
                          <el-progress type="dashboard" :percentage="user_info.focus_trend" :color="colors" />
                        </div>
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </el-col>
              <el-col :md="8" :lg="8">
                <el-row gutter="8">
                  <div class="info_list">
                    <el-col :md="24" :lg="24">
                      <div class="index">
                        <el-divider content-position="left">敏感度</el-divider>
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="user_info.sensitive" :color="colors" />
                      </div>
                    </el-col>
                    <el-col :md="24" :lg="24">
                      <div class="index">
                        <el-divider content-position="left">活跃度</el-divider>
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="user_info.active" :color="colors" />
                      </div>
                    </el-col>
                    <el-col :md="24" :lg="24">
                      <div class="index">
                        <el-divider content-position="left">涉华度</el-divider>
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="user_info.about_china" :color="colors" />
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :md="16" :lg="16">
          <el-card class="box-card">
            <div slot="header">
              <span>影响力分析</span>
            </div>
            <el-row :gutter="40" class="panel-group">
              <el-col :md="6" :lg="6" class="card-panel-col">
                <div class="card-panel">
                  <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  </div>
                  <div class="card-panel-description">
                    <div class="card-panel-text">
                      周平均热度
                    </div>
                    <div class="card-panel-num">{{ user_info.avr_wk_hot }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :md="6" :lg="6" class="card-panel-col">
                <div class="card-panel">
                  <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  </div>
                  <div class="card-panel-description">
                    <div class="card-panel-text">
                      月平均热度
                    </div>
                    <div class="card-panel-num">{{ user_info.avr_month_hot }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :md="6" :lg="6" class="card-panel-col">
                <div class="card-panel">
                  <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  </div>
                  <div class="card-panel-description">
                    <div class="card-panel-text">
                      持续时间
                    </div>
                    <div class="card-panel-num">{{ user_info.continue }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :md="6" :lg="6" class="card-panel-col">
                <div class="card-panel">
                  <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                  </div>
                  <div class="card-panel-description">
                    <div class="card-panel-text">
                      被支持度
                    </div>
                    <div class="card-panel-num">{{ user_info.avr_support_scale }}</div>
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
import CountTo from 'vue-count-to'
export default {
  name: 'Base',
  components: { PieChart, CountTo },
  data() {
    return {
      user_info: {
        avatar: require('../../assets/imgs/thNH3H58_400x400.jpg'),
        name: '黄之锋',
        age: '23',
        gender: '男',
        location: '香港',
        tags: ['政治', '经济'],
        followed: 727569,
        followed_trend: 80,
        focus: 9877,
        focus_trend: 75,
        sensitive: 100,
        active: 72,
        about_china: 100,
        avr_wk_hot: 31.045,
        avr_month_hot: 7.245,
        continue: '1 月',
        avr_support_scale: 0.742
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
              { value: 350, name: 'Twitter' },
              { value: 150, name: 'Facebook' }
            ],
            animationDuration: 2600
          }
        ]
      },
      percentage: 76,
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
  margin-bottom: 25px

.info_list
  margin: 10px

  .info
    margin: 12px 0

    .tag_item
      margin-right: 5px

.index

  .count
    font-size: 20px
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
