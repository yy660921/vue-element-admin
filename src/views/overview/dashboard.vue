<template>
  <div class="overview-container">
    <el-row :gutter="32">
      <el-col :span="18">
        <el-card>
          <div slot="header">
            <span>社会谱系</span>
          </div>
          <mix-chart :option="group_graph_option" height="750px" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>关联检索</span>
          </div>
          <el-form
            :inline="true"
            :model="searchForm"
          >
            <el-form-item label="关键词">
              <el-input v-model="searchForm.keywords" placeholder="请输入检索关键词" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查  询</el-button>
            </el-form-item>
          </el-form>
          <el-collapse :value="['1', '2']">
            <el-collapse-item title="推荐用户" name="1" class="suggestion_list">
              <div v-for="user in suggest_user" :key="user">
                <el-link type="primary" :href="'/SocialNetwork/#/dashboard?user=' + user" class="suggestion">{{ user }}</el-link>
              </div>
            </el-collapse-item>
            <el-collapse-item title="推荐议题" name="2" class="suggestion_list">
              <div v-for="topic in suggest_topic" :key="topic">
                <el-link type="primary" :href="'/SocialNetwork/#/dashboard?topic=' + topic" class="suggestion">{{ topic }}</el-link>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MixChart from '../../components/Charts/MixChart'
export default {
  name: 'Dashboard',
  components: { MixChart },
  data() {
    return {
      group_graph_option: {
        tooltip: {},
        legend: [{
          data: ['议题', '关键参与者', '一般用户']
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '群体关系',
            type: 'graph',
            layout: 'force',
            data: [
              {
                id: 1,
                name: '反送中',
                category: 0,
                label: {
                  show: true
                }
              },
              {
                id: 2,
                name: 'BBC News 中文',
                category: 1,
                label: {
                  show: true
                }
              },
              {
                id: 3,
                name: '纽约时报中文网',
                category: 1,
                label: {
                  show: true
                }
              },
              {
                id: 4,
                name: '吳文遠 Avery Ng',
                category: 1,
                label: {
                  show: true
                }
              },
              {
                id: 5,
                name: 'ABC中文',
                category: 1,
                label: {
                  show: true
                }
              },
              {
                id: 6,
                name: 'poon siu to潘小濤',
                category: 1,
                label: {
                  show: true
                }
              },
              {
                id: 7,
                name: 'Wong Ji Yuet 黃子悅',
                category: 1,
                label: {
                  show: true
                }
              },
              {
                id: 8,
                name: 'Jason Chen',
                category: 2
              },
              {
                id: 9,
                name: '成忠',
                category: 2
              },
              {
                id: 10,
                name: 'kevin shen',
                category: 2
              },
              {
                id: 11,
                name: 'Houseless M.D.',
                category: 2
              },
              {
                id: 12,
                name: 'Kaka_hk',
                category: 2
              },
              {
                id: 13,
                name: 'Daniel Zhang',
                category: 2
              },
              {
                id: 14,
                name: 'Sheldon C.',
                category: 2
              },
              {
                id: 15,
                name: 'benleebenbenlee',
                category: 2
              },
              {
                id: 16,
                name: '人革联',
                category: 2
              },
              {
                id: 17,
                name: 'Qianyi Zhou',
                category: 2
              },
              {
                id: 18,
                name: 'Wu ZF 2',
                category: 2
              },
              {
                id: 19,
                name: 'David',
                category: 2
              },
              {
                id: 20,
                name: 'Davidmouse',
                category: 2
              },
              {
                id: 21,
                name: 'Martin路德金',
                category: 2
              },
              {
                id: 22,
                name: 'Autocx David 没票请上车',
                category: 2
              },
              {
                id: 23,
                name: '陆月雪',
                category: 2
              },
              {
                id: 24,
                name: 'youyou',
                category: 2
              },
              {
                id: 25,
                name: '你就是',
                category: 2
              },
              {
                id: 26,
                name: 'Xu Bochao',
                category: 2
              },
              {
                id: 27,
                name: '无F可说のOsiris',
                category: 2
              },
              {
                id: 28,
                name: 'lore derk',
                category: 2
              },
              {
                id: 29,
                name: '残墨ヾ断诗',
                category: 2
              },
              {
                id: 30,
                name: '响·硬糖书记（R.T.）',
                category: 2
              },
              {
                id: 31,
                name: 'Lei.G',
                category: 2
              },
              {
                id: 32,
                name: 'HawK Golden',
                category: 2
              },
              {
                id: 33,
                name: '紫露凝香',
                category: 2
              },
              {
                id: 34,
                name: 'LWGLA',
                category: 2
              },
              {
                id: 35,
                name: 'James Hsu',
                category: 2
              },
              {
                id: 36,
                name: 'Lucifer卍666',
                category: 2
              },
              {
                id: 37,
                name: '阿里妈妈',
                category: 2
              },
              {
                id: 38,
                name: 'Strafer',
                category: 2
              },
              {
                id: 39,
                name: 'Choi Chung Wai',
                category: 2
              },
              {
                id: 40,
                name: '自由不免费',
                category: 2
              },
              {
                id: 41,
                name: 'Luke',
                category: 2
              },
              {
                id: 42,
                name: '俺每天都要全身心地与不停冒头的兽性斗争。努力巩固人性基石。在这块土壤上生存，一不留神，就成了助纣为虐',
                category: 2
              }
            ],
            links: [
              {
                source: 0,
                target: 1
              },
              {
                source: 0,
                target: 2
              },
              {
                source: 0,
                target: 3
              },
              {
                source: 0,
                target: 4
              },
              {
                source: 0,
                target: 5
              },
              {
                source: 0,
                target: 6
              },
              {
                source: 1,
                target: 7
              },
              {
                source: 2,
                target: 8
              },
              {
                source: 2,
                target: 9
              },
              {
                source: 2,
                target: 10
              },
              {
                source: 2,
                target: 11
              },
              {
                source: 2,
                target: 12
              },
              {
                source: 4,
                target: 13
              },
              {
                source: 4,
                target: 14
              },
              {
                source: 2,
                target: 15
              },
              {
                source: 2,
                target: 16
              },
              {
                source: 4,
                target: 17
              },
              {
                source: 4,
                target: 18
              },
              {
                source: 4,
                target: 19
              },
              {
                source: 4,
                target: 20
              },
              {
                source: 4,
                target: 21
              },
              {
                source: 5,
                target: 22
              },
              {
                source: 1,
                target: 23
              },
              {
                source: 1,
                target: 24
              },
              {
                source: 1,
                target: 25
              },
              {
                source: 1,
                target: 26
              },
              {
                source: 1,
                target: 27
              },
              {
                source: 1,
                target: 28
              },
              {
                source: 1,
                target: 29
              },
              {
                source: 1,
                target: 30
              },
              {
                source: 1,
                target: 31
              },
              {
                source: 1,
                target: 32
              },
              {
                source: 1,
                target: 33
              },
              {
                source: 1,
                target: 34
              },
              {
                source: 1,
                target: 35
              },
              {
                source: 6,
                target: 36
              },
              {
                source: 6,
                target: 37
              },
              {
                source: 6,
                target: 38
              },
              {
                source: 6,
                target: 39
              },
              {
                source: 6,
                target: 41
              }
            ],
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
            emphasis: {
              lineStyle: {
                width: 10
              }
            },
            zoom: 5
          }
        ]
      },
      searchForm: {
        keywords: ''
      },
      suggest_user: [
        '黄之锋',
        '罗冠聪',
        '江颖怡',
        '吴文远',
        '潘嘉伟',
        '潘小涛',
        '纪宝莹',
        'Eric Cheung',
        '杨政贤'
      ],
      suggest_topic: [
        '反送中',
        '港区国安法',
        '佔中运动',
        '修例风波',
        '禁蒙面法',
        '立法会选举',
        '新冠肺炎',
        '总统大选',
        '对台军售'
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log()
    }
  }
}
</script>

<style lang="sass" scoped>
  .overview-container
    padding: 32px
    background-color: rgb(240, 242, 245)
    position: relative
    min-height: 918px

  .suggestion_list
    height: 345px
    overflow-y: hidden

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
