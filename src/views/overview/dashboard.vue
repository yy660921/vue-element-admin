<template>
  <div class="overview-container">
    <el-row :gutter="32">
      <el-col :span="18">
        <el-card>
          <div slot="header">
            <span>社会谱系</span>
          </div>
          <v-chart :init-options="group_graph_option" :options="group_graph_option" :style="styles.graph_style" theme="macarons" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>关联检索</span>
          </div>
          <el-form
            :inline="true"
            label-width="60px"
            :model="searchForm"
          >
            <el-form-item label="类别">
              <el-radio-group v-model="searchForm.type">
                <el-radio :label="'user'">用户</el-radio>
                <el-radio :label="'topic'">议题</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input v-model="searchForm.keywords" :style="styles.input_style" placeholder="请输入检索关键词" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查  询</el-button>
            </el-form-item>
          </el-form>
          <el-collapse :value="['1', '2']">
            <el-collapse-item title="推荐用户" name="1">
              <div class="suggestion_list" :style="styles.user_style">
                <div v-for="user in suggest_user" :key="user.name" class="suggestion_box">
                  <el-link type="primary" class="suggestion" @click="setPerson(user.name)">{{ user.name }}</el-link>
                  <div class="suggestion_hot">热度：{{ user.hot }}</div>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="推荐议题" name="2">
              <div class="suggestion_list" :style="styles.topic_style">
                <div v-for="topic in suggest_topic" :key="topic.name" class="suggestion_box">
                  <el-link type="primary" class="suggestion" @click="setTopic(topic.name)">{{ topic.name }}</el-link>
                  <div class="suggestion_hot">热度：{{ topic.hot }}</div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Echarts from 'vue-echarts/components/ECharts'
require('echarts/theme/macarons') // echarts theme
import { getHierarchicalDiagram, getSuggestTopic, getSuggestUser } from '../../api/overview/home'

export default {
  name: 'Dashboard',
  components: { 'v-chart': Echarts },
  data() {
    return {
      styles: {
        graph_style: {
          width: '100%',
          height: '750px'
        },
        user_style: {
          height: '270px'
        },
        topic_style: {
          height: '270px'
        },
        input_style: {
          width: ''
        }
      },
      group_graph_option: {
        tooltip: {},
        legend: [{
          data: []
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
            categories: [{
              name: '议题'
            },
            {
              name: '关键参与者'
            },
            {
              name: '一般用户'
            }],
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
            zoom: 5
          }
        ]
      },
      searchForm: {
        keywords: '',
        type: 'user'
      },
      suggest_user: [],
      suggest_topic: []
    }
  },
  computed: {
    person() {
      return this.$store.getters.person
    },
    topic() {
      return this.$store.getters.topic
    }
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  methods: {
    getHierarchicalDiagram(center, type) {
      getHierarchicalDiagram(center, type).then(response => {
        this.group_graph_option.series[0].data = response.data.data
        this.group_graph_option.series[0].links = response.data.links
        this.group_graph_option.series[0].categories = response.data.categories
        this.group_graph_option.legend[0].data = response.data.legend
      })
    },
    getSuggest() {
      getSuggestUser().then(response => {
        this.suggest_user = response.data
      })
      getSuggestTopic().then(response => {
        this.suggest_topic = response.data
      })
    },
    setPerson(person) {
      this.$store.dispatch('graphCenter/setPerson', person)
      this.getHierarchicalDiagram(person, 'person')
    },
    setTopic(topic) {
      this.$store.dispatch('graphCenter/setTopic', topic)
      this.getHierarchicalDiagram(topic, 'topic')
    },
    onSubmit() {
      this.getHierarchicalDiagram(this.searchForm.keywords, this.searchForm.type)
    },
    getHeight() {
      this.styles.graph_style.height = (window.innerHeight - 50 - 32 - 1 - 55 - 20 - 20 - 1 - 32) + 'px'
      this.styles.user_style.height = ((window.innerHeight - 50 - 32 - 1 - 55 - 20 - 116 - 20 - 1 - 32) / 2 - 50 - 25) + 'px'
      this.styles.topic_style.height = ((window.innerHeight - 50 - 32 - 1 - 55 - 20 - 116 - 20 - 1 - 32) / 2 - 50 - 25) + 'px'
      this.styles.input_style.width = (window.innerWidth - 210 - 32) / 4 - 32 - 2 - 40 - 74 - 60 - 30 + 'px'
      this.getHierarchicalDiagram(this.topic, 'topic')
      this.getSuggest()
    }
  }
}
</script>

<style lang="sass" scoped>
  .overview-container
    padding: 32px
    background-color: rgb(240, 242, 245)
    position: relative
    /*min-height: 918px*/

  .suggestion_list
    overflow-y: scroll

    .suggestion_box
      margin: 15px
      padding: 10px
      border: 1px solid #e6ebf5
      border-radius: 4px
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

      .suggestion_hot
        float: right

      .suggestion
        font-size: 17px

  .suggestion_list::-webkit-scrollbar
    width : 10px
    height: 1px

  .suggestion_list::-webkit-scrollbar-thumb
    border-radius: 10px
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2)
    background   : rgba(83, 83, 83, 0.5)

  .suggestion_list::-webkit-scrollbar-track
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2)
    border-radius: 10px
    background   : #ededed

</style>
