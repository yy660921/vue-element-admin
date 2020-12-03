<template>
  <div class="user-container">
    <el-row :gutter="32">
      <el-col :md="12" :lg="12">
        <el-card class="box-card">
          <div slot="header">
            <span>群体关系图</span>
          </div>
          <el-row :gutter="32">
            <el-col :md="24" :lg="24">
              <mix-chart :option="group_graph_option" height="450px" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :md="12" :lg="12">
        <el-card class="box-card">
          <div slot="header">
            <span>用户概要</span>
          </div>
          <el-row :gutter="32">
            <el-col :md="6" :lg="6">
              <el-avatar :size="150" :src="user_info.avatar" />
            </el-col>
            <el-col :md="8" :lg="8">
              <div>
                <div class="info_list">
                  <div class="info">
                    <h2>{{ user_info.name }}</h2>
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
                        <span>性别</span>
                      </el-col>
                      <el-col :md="16" :lg="16">
                        <span>{{ user_info.gender }}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="info">
                    <el-row :gutter="8" class="info">
                      <el-col :md="8" :lg="8">
                        <span>地点</span>
                      </el-col>
                      <el-col :md="16" :lg="16">
                        <span>{{ user_info.location }}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="info">
                    <el-row :gutter="8" class="info">
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
              <div style="float: right">
                在本次事件中共参与5次
              </div>
            </el-col>
          </el-row>
          <el-divider />
          <el-row class="timeline_list">
            <el-timeline>
              <el-timeline-item
                v-for="activity in user_info.hot_posts"
                :key="activity.time"
                :timestamp="activity.time"
              >
                {{ activity.activity }}
              </el-timeline-item>
            </el-timeline>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :md="12" :lg="12">
        <el-card>
          <div slot="header">
            <span>立场变化</span>
          </div>
          <el-row :gutter="32">
            <el-col :md="24" :lg="24">
              <mix-chart :option="altitude_graph_option" height="180px" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :md="5" :lg="5">
        <el-card>
          <div slot="header">
            <span>地域分布</span>
          </div>
          <el-row :gutter="32">
            <el-col :md="24" :lg="24">
              <mix-chart :option="location_graph_option" height="180px" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :md="7" :lg="7">
        <el-card>
          <div slot="header">
            <span>关联程度</span>
          </div>
          <el-row v-for="relation in related_scale" :key="relation.id" :gutter="32" class="relation_line">
            <el-col :span="6">
              {{ relation.related }}
            </el-col>
            <el-col :span="18">
              <el-progress
                :text-inside="true"
                :stroke-width="24"
                :percentage="relation.percent"
              />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MixChart from '../../components/Charts/MixChart'
export default {
  name: 'Group',
  components: { MixChart },
  data() {
    return {
      group_graph_option: {
        tooltip: {},
        legend: [{
          data: ['关键参与者', '一般用户']
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
                name: 'BBC News 中文',
                category: 0,
                value: 20,
                label: {
                  show: true
                }
              },
              {
                name: '纽约时报中文网',
                category: 0,
                value: 20,
                label: {
                  show: true
                }
              },
              {
                name: '吳文遠 Avery Ng',
                category: 0,
                value: 20,
                label: {
                  show: true
                }
              },
              {
                name: 'ABC中文',
                category: 0,
                value: 20,
                label: {
                  show: true
                }
              },
              {
                name: 'poon siu to潘小濤',
                category: 0,
                value: 20,
                label: {
                  show: true
                }
              },
              {
                name: 'Wong Ji Yuet 黃子悅',
                category: 0,
                value: 20,
                label: {
                  show: true
                }
              },
              {
                name: 'Jason Chen',
                category: 1,
                value: 20
              },
              {
                name: '成忠',
                category: 1,
                value: 20
              },
              {
                name: 'kevin shen',
                category: 1,
                value: 20
              },
              {
                name: 'Houseless M.D.',
                category: 1,
                value: 20
              },
              {
                name: 'Kaka_hk',
                category: 1,
                value: 20
              },
              {
                name: 'Daniel Zhang',
                category: 1,
                value: 20
              },
              {
                name: 'Sheldon C.',
                category: 1,
                value: 20
              },
              {
                name: 'benleebenbenlee',
                category: 1,
                value: 20
              },
              {
                name: '人革联',
                category: 1,
                value: 20
              },
              {
                name: 'Qianyi Zhou',
                category: 1,
                value: 20
              },
              {
                name: 'Wu ZF 2',
                category: 1,
                value: 20
              },
              {
                name: 'David',
                category: 1,
                value: 20
              },
              {
                name: 'Davidmouse',
                category: 1,
                value: 20
              },
              {
                name: 'Martin路德金',
                category: 1,
                value: 20
              },
              {
                name: 'Autocx David 没票请上车',
                category: 1,
                value: 20
              },
              {
                name: '陆月雪',
                category: 1,
                value: 20
              },
              {
                name: 'youyou',
                category: 1,
                value: 20
              },
              {
                name: '你就是',
                category: 1,
                value: 20
              },
              {
                name: 'Xu Bochao',
                category: 1,
                value: 20
              },
              {
                name: '无F可说のOsiris',
                category: 1,
                value: 20
              },
              {
                name: 'lore derk',
                category: 1,
                value: 20
              },
              {
                name: '残墨ヾ断诗',
                category: 1,
                value: 20
              },
              {
                name: '响·硬糖书记（R.T.）',
                category: 1,
                value: 20
              },
              {
                name: 'Lei.G',
                category: 1,
                value: 20
              },
              {
                name: 'HawK Golden',
                category: 1,
                value: 20
              },
              {
                name: '紫露凝香',
                category: 1,
                value: 20
              },
              {
                name: 'LWGLA',
                category: 1,
                value: 20
              },
              {
                name: 'James Hsu',
                category: 1,
                value: 20
              },
              {
                name: 'Lucifer卍666',
                category: 1,
                value: 20
              },
              {
                name: '阿里妈妈',
                category: 1,
                value: 20
              },
              {
                name: 'Strafer',
                category: 1,
                value: 20
              },
              {
                name: 'Choi Chung Wai',
                category: 1,
                value: 20
              },
              {
                name: '自由不免费',
                category: 1,
                value: 20
              },
              {
                name: 'Luke',
                category: 1,
                value: 20
              },
              {
                name: '俺每天都要全身心地与不停冒头的兽性斗争。努力巩固人性基石。在这块土壤上生存，一不留神，就成了助纣为虐',
                category: 1,
                value: 20
              }
            ],
            links: [
              {
                source: 'BBC News 中文',
                target: 'Jason Chen',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: '成忠',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'kevin shen',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'Houseless M.D.',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'Kaka_hk',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'Daniel Zhang',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'Sheldon C.',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'benleebenbenlee',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: '人革联',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'Qianyi Zhou',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'Wu ZF 2',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'David',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'Davidmouse',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'Martin路德金',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'Autocx David 没票请上车',
                value: 20
              },
              {
                source: 'poon siu to潘小濤',
                target: '陆月雪',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'youyou',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: '你就是',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'Xu Bochao',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: '无F可说のOsiris',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'lore derk',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: '残墨ヾ断诗',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: '响·硬糖书记（R.T.）',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'Lei.G',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'HawK Golden',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: '紫露凝香',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'LWGLA',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'James Hsu',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'Lucifer卍666',
                value: 20
              },
              {
                source: 'Wong Ji Yuet 黃子悅',
                target: '阿里妈妈',
                value: 20
              },
              {
                source: 'Wong Ji Yuet 黃子悅',
                target: 'Strafer',
                value: 20
              },
              {
                source: 'Wong Ji Yuet 黃子悅',
                target: 'Choi Chung Wai',
                value: 20
              },
              {
                source: 'Wong Ji Yuet 黃子悅',
                target: '自由不免费',
                value: 20
              },
              {
                source: 'Wong Ji Yuet 黃子悅',
                target: 'Luke',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: '纽约时报中文网',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: '吳文遠 Avery Ng',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'ABC中文',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'poon siu to潘小濤',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'Wong Ji Yuet 黃子悅',
                value: 20
              },
              {
                source: 'BBC News 中文',
                target: 'Jason Chen',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: '吳文遠 Avery Ng',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'ABC中文',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'poon siu to潘小濤',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'Wong Ji Yuet 黃子悅',
                value: 20
              },
              {
                source: '纽约时报中文网',
                target: 'Jason Chen',
                value: 20
              },
              {
                source: '吳文遠 Avery Ng',
                target: 'ABC中文',
                value: 20
              },
              {
                source: '吳文遠 Avery Ng',
                target: 'poon siu to潘小濤',
                value: 20
              },
              {
                source: '吳文遠 Avery Ng',
                target: 'Wong Ji Yuet 黃子悅',
                value: 20
              },
              {
                source: '吳文遠 Avery Ng',
                target: 'Jason Chen',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'poon siu to潘小濤',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'Wong Ji Yuet 黃子悅',
                value: 20
              },
              {
                source: 'ABC中文',
                target: 'Jason Chen',
                value: 20
              },
              {
                source: 'poon siu to潘小濤',
                target: 'Wong Ji Yuet 黃子悅',
                value: 20
              },
              {
                source: 'poon siu to潘小濤',
                target: 'Jason Chen',
                value: 20
              },
              {
                source: 'Wong Ji Yuet 黃子悅',
                target: 'Jason Chen',
                value: 20
              }
            ],
            categories: [
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
      user_info: {
        avatar: require('../../assets/imgs/thNH3H58_400x400.jpg'),
        name: '黄之锋',
        age: '23',
        gender: '男',
        location: '香港',
        tags: ['政治', '经济'],
        hot_posts: [
          {
            activity: '香港“反送中”抗议期间，记者与警察的关系每况愈下。记者多次指控在示威现场遭遇警员辱骂和暴力对待，而警察则指记者常常逗留在示威者与警察中间，阻碍他们执行公务。',
            time: '2020/5/28 7:01'
          },
          {
            activity: '香港“反送中”抗议持续一年后，台湾陆委会日前宣布新的香港援助方案，将设立台港服务交流办公室，为来台湾的港人， 包括寻求庇护反政府示威者提供服务。台湾对港人有哪些援助措施？未来台湾能成为香港示威者的庇护所吗？',
            time: '2020/6/26 10:01'
          },
          {
            activity: '香港民众反对《逃犯条例》修订案的“反送中”示威满一年，有民意调查显示，香港新闻自由评分再创新低，受访公众与新闻从业员均认为前线记者遭遇暴力袭击问题严重。',
            time: '2020/7/16 13:31'
          },
          {
            activity: '周小龙今年6月在店内摆放民主女神像引起关注。他曾被归类为开明建制派，2014年批评香港“占领中环”运动，责怪示威者阻碍他做生意。但时隔5年，“反送中”运动令周小龙觉得中国和香港政府不听从民意，无视警察暴力事件，香港距离民主自由越来越远，他不得不越走越前。',
            time: '2020/8/6 11:01'
          },
          {
            activity: '香港爆发反送中运动时，《花木兰》的主角刘亦菲因声援香港警方，引发中国大陆以外的网民抵制。如今这部迪士尼重头戏经历一波三折后，获安排在其网上串流平台上播放。',
            time: '2020/8/6 20:00'
          },
          {
            activity: '香港“反送中”运动爆发至今超过一年，超过九千人被捕，部分人选择流亡，也有人坚持留下。BBC旗舰新闻节目《Newsnight》访问了他们。',
            time: '2020/8/14 20:00'
          },
          {
            activity: '香港“反送中”运动爆发至今超过一年，最近生效的香港《国安法》令民主派支持者对于香港的前途更加担忧。一些人选择远走他方，但还有一些示威者决定留守家园，他们将何去何从？',
            time: '2020/8/16 20:00'
          },
          {
            activity: '15岁女学生陈彦霖之死成为香港“反送中”示威的一大争论焦点，11天的死因研讯最终未能解开多个谜团。',
            time: '2020/9/11 19:30'
          }
        ]
      },
      altitude_graph_option: {
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 20
        },
        legend: {
          data: ['支持', '中立', '反对']
        },
        xAxis: {
          type: 'category',
          data: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05', '2020/06', '2020/07', '2020/08', '2020/09']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '反对',
          data: [820, 932, 901, 934, 1290, 1330, 1320, 1520, 1640],
          type: 'line',
          smooth: true
        },
        {
          name: '中立',
          data: [934, 1290, 1330, 1320, 1030, 948, 781, 862, 529],
          type: 'line',
          smooth: true
        },
        {
          name: '支持',
          data: [471, 523, 511, 325, 378, 265, 291, 187, 127],
          type: 'line',
          smooth: true
        }]
      },
      location_graph_option: {
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 20
        },
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
            radius: [0, 70],
            center: ['50%', '50%'],
            data: [
              { value: 350, name: '境内' },
              { value: 150, name: '香港' },
              { value: 150, name: '台湾' }
            ],
            animationDuration: 2600
          }
        ]
      },
      related_scale: [
        {
          id: 1,
          related: '0.2~0.4',
          percent: 82
        },
        {
          id: 2,
          related: '0.4~0.8',
          percent: 12
        },
        {
          id: 3,
          related: '0.8~1.5',
          percent: 4
        },
        {
          id: 4,
          related: '1.5以上',
          percent: 2
        }
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
  margin: 17px 0
  font-size: 18px
  vertical-align: center
</style>
