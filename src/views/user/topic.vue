<template>
  <div>
    <div class="user-container">
      <el-row :gutter="32">
        <el-col :md="12" :lg="12">
          <el-card>
            <div slot="header">
              <span>相关议题</span>
            </div>
            <div class="container" :style="styles.topic_container">
              <div class="topic-list">
                <div v-for="(topic, index) in related_topic" :key="index" class="topic-item">
                  <h3 class="topic-titleline">
                    <span class="topic-index">{{ index + 1 }}</span>
                    <span class="topic-type">{{ topic.type }}</span>
                    <span class="topic-title" @click="getTopicInfo(topic.name)">{{ topic.name }}</span>
                  </h3>
                  <div class="topic-content">
                    <span :title="topic.introduction">{{ topic.introduction }}</span>
                  </div>
                  <div class="topic-attrs">
                    <div class="topic-attr" :style="styles.keywords">
                      <label>关键词：</label>
                      <span>{{ topic.keywords.join("，") }}</span>
                    </div>
                    <div class="topic-attr" :style="styles.participate">
                      <label>参与度：</label>
                      <span>{{ topic.participate }}</span>
                    </div>
                    <div class="topic-attr" :style="styles.heat">
                      <label>热度：</label>
                      <div class="topic-heat-bar" :style="styles.heatbar">
                        <el-progress
                          :percentage="topic.totalHeat/ max_heat * 100"
                          :format="format"
                          :stroke-width="14"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="topic-attrs">
                    <span class="topic-attr" :style="styles.startTime">
                      <label>开始时间：</label>
                      <span>{{ topic.startTime }}</span>
                    </span>
                    <span class="topic-attr" :style="styles.sensitive">
                      <label>敏感度：</label>
                      <span>{{ topic.sensitive }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :md="12" :lg="12">
          <el-row :gutter="16">
            <el-card class="box-card">
              <div slot="header">
                <span>意见领袖发帖</span>
              </div>
              <div class="container user-view-container" :style="styles.user_view">
                <el-row :gutter="8">
                  <el-timeline>
                    <el-timeline-item
                      v-for="post in leader_opinions"
                      :key="post.url"
                      :timestamp="post.time"
                    >
                      {{ post.content }}
                    </el-timeline-item>
                  </el-timeline>
                </el-row>
              </div>
            </el-card>
          </el-row>
          <el-row :gutter="16">
            <el-card>
              <div slot="header">
                <span>关键词云</span>
              </div>
              <div :style="styles.word_cloud_container">
                <v-chart :init-options="word_cloud_option" :options="word_cloud_option" :style="styles.word_cloud" theme="macarons" />
              </div>
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Echarts from 'vue-echarts/components/ECharts'
require('echarts/theme/macarons') // echarts theme
import 'echarts-wordcloud'
import { getUserTopicInfo, getUserTopicList } from '../../api/user/topic'
export default {
  name: 'Topic',
  components: { 'v-chart': Echarts },
  data() {
    return {
      styles: {
        topic_container: {
          height: '750px'
        },
        user_view: {
          height: '270px'
        },
        word_cloud_container: {
          paddingLeft: '100px',
          paddingRight: '100px'
        },
        word_cloud: {
          height: '270px'
        },
        keywords: {
          width: '270px'
        },
        participate: {
          width: '270px'
        },
        heat: {
          width: '270px'
        },
        heatbar: {
          width: '270px'
        },
        startTime: {
          width: '270px'
        },
        sensitive: {
          width: '270px'
        }
      },
      max_heat: 1,
      selected_topic: '',
      related_topic: [],
      leader_opinions: [],
      word_cloud_option: {
        title: {
          text: this.title,
          x: 'center'
        },
        backgroundColor: '#fff',
        series: [
          {
            type: 'wordCloud',
            gridSize: 10,
            sizeRange: [14, 60],
            rotationRange: [0, 0],
            textStyle: {
              normal: {
                color: function() {
                  return (
                    'rgb(' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ', ' +
                    Math.round(Math.random() * 255) +
                    ')'
                  )
                }
              }
            },
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '100%',
            height: '100%',
            data: []
          }
        ]
      }
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
    format(percentage) {
      return (percentage * this.max_heat / 100).toFixed(0)
    },
    getTopicList() {
      return Promise.resolve(getUserTopicList(this.person).then(response => {
        this.related_topic = response.data
        this.selected_topic = this.related_topic[0].name
        this.related_topic.forEach(topic => {
          if (topic.totalHeat > this.max_heat) {
            this.max_heat = topic.totalHeat
          }
        })
        return Promise.resolve(response.data[0].name)
      }))
    },
    getTopicInfo(topic) {
      getUserTopicInfo(this.person, topic).then(response => {
        this.leader_opinions = response.data.user_views
        this.word_cloud_option.series[0].data = response.data.user_keywords
      })
    },
    getHeight() {
      this.styles.topic_container.height = (window.innerHeight - 50 - 32 - 1 - 55 - 20 - 20 - 1 - 32) + 'px'
      this.styles.user_view.height = ((window.innerHeight - 50 - 32 - 25 - 32) * 0.6 - 1 - 55 - 20 - 20 - 1) + 'px'
      this.styles.word_cloud.height = ((window.innerHeight - 50 - 32 - 25 - 32) * 0.4 - 1 - 55 - 20 - 20 - 1) + 'px'

      this.styles.word_cloud_container.paddingLeft = (((window.innerWidth - 210 - 64) * 0.5 - 2 - 40 - 600) * 0.5) + 'px'
      this.styles.word_cloud_container.paddingRight = (((window.innerWidth - 210 - 64) * 0.5 - 2 - 40 - 600) * 0.5) + 'px'

      this.styles.keywords.width = ((window.innerWidth - 210 - 64) / 2 - 32 - 40 - 10 - 2 - 20) * 0.4 + 'px'
      this.styles.participate.width = ((window.innerWidth - 210 - 64) / 2 - 32 - 40 - 10 - 2 - 20) * 0.2 + 'px'
      this.styles.heat.width = ((window.innerWidth - 210 - 64) / 2 - 32 - 40 - 10 - 2 - 20) * 0.4 + 'px'
      this.styles.heatbar.width = ((window.innerWidth - 210 - 64) / 2 - 32 - 40 - 10 - 2 - 20) * 0.4 - 48 + 'px'
      this.styles.startTime.width = ((window.innerWidth - 210 - 64) / 2 - 32 - 40 - 10 - 2 - 20) * 0.4 + 'px'
      this.styles.sensitive.width = ((window.innerWidth - 210 - 64) / 2 - 32 - 40 - 10 - 2 - 20) * 0.6 + 'px'
      this.getTopicList().then(value => {
        this.getTopicInfo(value)
      })
    }
  }
}
</script>

<style scoped lang="sass">
.user-container
  padding: 32px
  background-color: rgb(240, 242, 245)
  position: relative

.container
  overflow-x: hidden
  overflow-y: scroll

.container::-webkit-scrollbar
  width : 10px
  height: 1px

.container::-webkit-scrollbar-thumb
  border-radius: 10px
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2)
  background   : rgba(83, 83, 83, 0.5)

.container::-webkit-scrollbar-track
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2)
  border-radius: 10px
  background   : #ededed

.user-view-container
  padding: 2px

.image-container
  padding: 32px

.box-card
  margin-bottom: 25px

.info
  margin: 5px 0

  .count
    font-weight: 700

.index
  text-align: center
  position: relative

.topic-list .topic-item:first-child .topic-index
  background-color: #ff4655!important

.topic-list .topic-item:nth-child(2) .topic-index
  background-color: #ff975c!important

.topic-list .topic-item:nth-child(3) .topic-index
  background-color: #ffc15c!important

.topic-list

  .topic-item
    margin: 10px 0
    padding: 10px
    min-height: 65px
    border: 1px solid #e6ebf5
    border-radius: 4px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

    .topic-titleline
      margin-top: 0
      margin-bottom: 5px
      font-size: 1.6rem
      display: -ms-flexbox
      display: flex
      -ms-flex-align: center
      align-items: center
      max-width: 100%

    .topic-index
      display: inline-block
      min-width: 20px
      text-align: center
      font-size: 14px
      color: #fff
      border-radius: 3px
      padding: 2px 0
      white-space: nowrap
      background-color: #54c1fc
      margin-right: 8px
      text-shadow: 0 1px 0 rgba(7,17,27,.2)

    .topic-type
      flex: 0 0 auto
      max-width: 160px
      display: inline-block
      margin-right: 8px
      font-size: 14px
      color: #fff
      background-color: #ec971f
      border-radius: 3px
      padding: 3px 4px
      white-space: nowrap
      text-shadow: 0 1px 0 rgba(7,17,27,.15)

    .topic-title
      font-size: 18px
      font-weight: 700
      display: inline-block
      color: #2f353b
      transition: .3s
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      cursor: pointer

    .topic-title:hover
      color: #256bcc

    .topic-content
      overflow: hidden
      height: 36px
      margin-bottom: 5px

    .topic-attrs
      margin-bottom: 5px

      .topic-attr
        display: inline-block
        padding-right: 10px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis

    .topic-heat-bar
      display: inline-block

    .topic-hot
      position: relative
      width: 100%
      text-align: right

</style>
