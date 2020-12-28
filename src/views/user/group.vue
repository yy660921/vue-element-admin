<template>
  <div class="user-container">
    <el-row :gutter="32">
      <el-col :md="12" :lg="12">
        <el-card class="box-card">
          <div slot="header">
            <span>群体关系图</span>
          </div>
          <v-chart :init-options="group_graph_option" :options="group_graph_option" :style="styles.group_graph_style" theme="macarons" @click="click" />
        </el-card>
      </el-col>
      <el-col :md="12" :lg="12">
        <el-card class="box-card">
          <div slot="header">
            <span>用户概要</span>
          </div>
          <div :style="styles.group_graph_style">
            <el-row :gutter="32">
              <el-col :md="6" :lg="6">
                <el-avatar v-if="user_info.avatar" :size="150" :src="user_info.avatar" />
                <el-avatar v-if="!user_info.avatar" :size="150" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              </el-col>
              <el-col :md="10" :lg="10">
                <div>
                  <div class="info_list">
                    <div class="info">
                      <h2>{{ user_info.name }}</h2>
                    </div>
                    <div class="info">
                      <el-row :gutter="8" class="info">
                        <el-col :md="8" :lg="8">
                          <span>真实姓名</span>
                        </el-col>
                        <el-col :md="16" :lg="16">
                          <span>{{ user_info.real_name }}</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="info">
                      <el-row :gutter="8" class="info">
                        <el-col :md="8" :lg="8">
                          <span>年龄</span>
                        </el-col>
                        <el-col :md="16" :lg="16">
                          <span>{{ user_info.age }}</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="info">
                      <el-row :gutter="8" class="info">
                        <el-col :md="8" :lg="8">
                          <span>地点</span>
                        </el-col>
                        <el-col :md="16" :lg="16">
                          <span>{{ user_info.area }}</span>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="info">
                      <el-row :gutter="8" class="info">
                        <el-col :md="8" :lg="8">
                          <span>关注内容</span>
                        </el-col>
                        <el-col :md="16" :lg="16">
                          <el-tag v-for="tag in user_info.tag" :key="tag" :hint="true" class="tag_item">{{ tag }}</el-tag>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :md="7" :lg="7">
                <div style="float: right">
                  在本次事件中共参与{{ user_info.content_list ? user_info.content_list.length : 0 }}次
                </div>
              </el-col>
            </el-row>
            <el-divider />
            <el-row class="timeline_list">
              <el-timeline>
                <el-timeline-item
                  v-for="activity in user_info.content_list"
                  :key="activity.format_time"
                  :timestamp="activity.format_time"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :md="12" :lg="12">
        <el-card>
          <div slot="header">
            <span>立场变化</span>
          </div>
          <v-chart :init-options="altitude_graph_option" :options="altitude_graph_option" :style="styles.altitude_graph_style" theme="macarons" />
        </el-card>
      </el-col>
      <el-col :md="12" :lg="12">
        <el-card>
          <div slot="header">
            <span>关联程度</span>
          </div>
          <div :style="styles.relation_style">
            <el-row v-for="relation in related_scale" :key="relation.id" :gutter="32" class="relation_line">
              <el-col :span="8">
                {{ relation.related }}
              </el-col>
              <el-col :span="16">
                <el-progress
                  :text-inside="true"
                  :stroke-width="24"
                  :percentage="relation.percent"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Echarts from 'vue-echarts/components/ECharts'
import { getGroupData, getUserBrief } from '../../api/user/group'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'Group',
  components: { 'v-chart': Echarts },
  data() {
    return {
      styles: {
        group_graph_style: {
          height: '750px',
          width: '100%'
        },
        altitude_graph_style: {
          height: '750px',
          width: '100%'
        },
        relation_style: {
          height: '270px'
        }
      },
      group_graph_option: {
        tooltip: {},
        legend: [{
          data: ['中心用户', '关键参与者', '一般用户']
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '群体关系',
            type: 'graph',
            layout: 'force',
            data: [],
            links: [],
            categories: [
              {
                name: '中心用户'
              },
              {
                name: '关键参与者'
              },
              {
                name: '一般用户'
              }
            ],
            roam: true,
            focusNodeAdjacency: true,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 5,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
            },
            zoom: 3
          }
        ]
      },
      user_info: {},
      altitude_graph_option: {
        grid: {
          x: 50,
          y: 10,
          x2: 0,
          y2: 20
        },
        legend: {
          data: []
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '反对',
          data: [],
          type: 'line',
          smooth: true
        },
        {
          name: '中立',
          data: [],
          type: 'line',
          smooth: true
        },
        {
          name: '支持',
          data: [],
          type: 'line',
          smooth: true
        }]
      },
      related_words: [
        '0.2~0.4', '0.4~0.8', '0.8~1.5', '1.5以上'
      ],
      related_scale: [
        {
          id: 1,
          related: '',
          percent: 82
        },
        {
          id: 2,
          related: '',
          percent: 12
        },
        {
          id: 3,
          related: '',
          percent: 4
        },
        {
          id: 4,
          related: '',
          percent: 2
        }
      ]
    }
  },
  computed: {
    person() {
      return this.$store.getters.person
    }
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  methods: {
    getHeight() {
      this.styles.group_graph_style.height = (window.innerHeight - 50 - 64 - 25) * 0.7 - 1 - 55 - 20 - 20 - 1 + 'px'
      this.styles.altitude_graph_style.height = (window.innerHeight - 50 - 64 - 25) * 0.3 - 1 - 55 - 20 - 20 - 1 + 'px'
      this.styles.relation_style.height = (window.innerHeight - 50 - 64 - 25) * 0.3 - 1 - 55 - 20 - 20 - 1 - 16 + 'px'
      this.getGroupData()
      this.getUserBrief(this.person)
    },
    getGroupData() {
      getGroupData(this.person).then(response => {
        this.group_graph_option.series[0].data = response.data['graph']['data']
        this.group_graph_option.series[0].links = response.data['graph']['links']
        this.altitude_graph_option.legend.data = response.data['stand']['legend']
        this.altitude_graph_option.xAxis.data = response.data['stand']['category']
        for (let i = 0; i < response.data['stand']['data'].length; i++) {
          this.altitude_graph_option.series[i].data = response.data['stand']['data'][i]
        }
        for (let i = 0; i < response.data['relation'].length; i++) {
          this.related_scale[i].related = this.related_words[i] + ' (' + response.data['relation'][i]['count'] + ')'
          this.related_scale[i].percent = parseInt((response.data['relation'][i]['percentage'] * 100).toFixed(0))
        }
      })
    },
    getUserBrief(user) {
      getUserBrief(this.person, user).then(response => {
        this.user_info = response.data
        this.user_info.name = user
      })
    },
    click(e) {
      this.getUserBrief(e.name)
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

.box-card
  margin-bottom: 25px

.info_list
  margin: 10px

  .info
    margin: 5px 0

    .tag_item
      margin-right: 5px

.timeline_list
  height: 230px
  padding: 5px 0
  overflow-y: scroll

.timeline_list::-webkit-scrollbar
  width : 10px
  height: 1px

.timeline_list::-webkit-scrollbar-thumb
  border-radius: 10px
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2)
  background   : rgba(83, 83, 83, 0.5)

.timeline_list::-webkit-scrollbar-track
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2)
  border-radius: 10px
  background   : #ededed

.relation_line
  margin: 16px 0
  font-size: 18px
  vertical-align: center
</style>
