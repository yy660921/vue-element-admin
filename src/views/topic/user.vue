<template>
  <div class="topic-container">
    <el-row :gutter="32">
      <el-col :md="12" :lg="12">
        <el-card class="box-card">
          <div slot="header">
            <span>传播扩散图</span>
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
            <span>传播关键用户</span>
          </div>
          <el-row :gutter="32">
            <el-col :md="5" :lg="5">
              <el-avatar :size="150" :src="user_info.avatar" />
            </el-col>
            <el-col :md="9" :lg="9">
              <div>
                <div class="info_list">
                  <div class="info">
                    <h2>{{ user_info.name }}</h2>
                  </div>
                  <div class="info">
                    <el-row :gutter="8" class="info">
                      <el-col :md="8" :lg="8">
                        <span>关注数</span>
                      </el-col>
                      <el-col :md="16" :lg="16">
                        <span>{{ user_info.following }}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="info">
                    <el-row :gutter="8" class="info">
                      <el-col :md="8" :lg="8">
                        <span>粉丝数</span>
                      </el-col>
                      <el-col :md="16" :lg="16">
                        <span>{{ user_info.follower }}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="info">
                    <el-row :gutter="8" class="info">
                      <el-col :md="8" :lg="8">
                        <span>转发数</span>
                      </el-col>
                      <el-col :md="16" :lg="16">
                        <span>{{ user_info.repost_count }}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="info">
                    <el-row :gutter="8" class="info">
                      <el-col :md="8" :lg="8">
                        <span>转发时间</span>
                      </el-col>
                      <el-col :md="16" :lg="16">
                        <span>{{ user_info.repost_time }}</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :md="10" :lg="10">
              <el-row :gutter="8">
                <el-col :span="6">
                  转发内容
                </el-col>
                <el-col :span="18" class="repost_content" :title="user_info.repost_content">
                  {{ user_info.repost_content }}
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-divider />
          <el-row class="post_line">
            <el-steps :active="user_info.selected">
              <el-step v-for="user in user_info.post_line" :key="user" :title="user" />
            </el-steps>
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
            <span>紧密程度</span>
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
  name: 'User',
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
            zoom: 3
          }
        ]
      },
      user_info: {
        avatar: require('../../assets/imgs/tiacF_Yg_200x200.jpg'),
        name: 'BBC News 中文',
        following: '231',
        follower: '2,092,243',
        repost_time: '2020-07-21 14:01:09',
        repost_count: 48,
        repost_content: '一年前的7月21日，香港新界元朗晚间爆发冲突。一批身着白衣、戴口罩的人士用棍棒追打市民。中午至傍晚时份，则有示威者游行到中联办，向中国国徽投掷鸡蛋及油漆弹。其后在上环爆发警民冲突，警方共发射55枚催泪烟及催泪弹、5发橡胶子弹及24枚海绵弹驱散示威者。',
        selected: 2,
        post_line: ['反送中', 'BBC News 中文', 'youyou']
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
  .topic-container
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

  .post_line
    padding: 100px 20px
    height: 240px

  .repost_content
    max-height: 160px
    display: -webkit-box
    -webkit-line-clamp: 9
    -webkit-box-orient: vertical
    overflow: hidden

  .relation_line
    margin: 17px 0
    font-size: 18px
    vertical-align: center
</style>

