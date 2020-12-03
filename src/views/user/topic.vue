<template>
  <div>
    <div class="user-container">
      <el-row :gutter="32">
        <el-col :md="12" :lg="12">
          <el-card class="box-card">
            <div slot="header">
              <span>相关议题</span>
            </div>
            <div class="container">
              <div class="topic-list">
                <div v-for="topic in Object.keys(page_data)" :key="topic" class="topic-item">
                  <div class="topic-lable">
                    <span>{{ page_data[topic].topic_type }}</span>
                  </div>
                  <div class="topic-title">
                    <span>{{ topic }}</span>
                  </div>
                  <div class="topic-content">
                    <span>{{ page_data[topic].topic }}</span>
                  </div>
                  <div class="topic-tags">
                    <el-tag v-for="keyword in page_data[topic].keywords" :key="keyword" :hint="true" class="tag_item">{{ keyword }}</el-tag>
                  </div>
                  <div class="topic-hot">
                    {{ page_data[topic].sensitive }}
                  </div>
                  <div class="topic-hot">
                    <el-tag type="danger">{{ page_data[topic].hot }}</el-tag>
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
              <el-row :gutter="8">
                <el-timeline>
                  <el-timeline-item
                    v-for="post in page_data[selected_topic].user_post"
                    :key="post.url"
                    :timestamp="post.time"
                  >
                    {{ post.content }}
                  </el-timeline-item>
                </el-timeline>
              </el-row>
            </el-card>
          </el-row>
          <el-row :gutter="8">
            <el-card>
              <div slot="header">
                <span>关键词云</span>
              </div>
              <word-cloud-chart
                id="topicCloud"
                :data="page_data[selected_topic].user_keywords"
                height="200px"
              />
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import WordCloudChart from '../../components/Charts/WordCloudChart'
export default {
  name: 'Topic',
  components: { WordCloudChart },
  data() {
    return {
      page_data: require('../../data/user_topic.json'),
      selected_topic: '',
      percentage: 57,
      related_topic: [
        {
          'id': 1,
          'content': '加入反送中运动，表明港府应明确撤回逃犯条例修订草案，并撤回将6月9日百万人大游行定性为暴动之错误',
          'hot': 128
        },
        {
          'id': 2,
          'content': '梁振英：今天你还相信香港暴乱没推手吗？',
          'hot': 75
        },
        {
          'id': 3,
          'content': '周庭黄之锋陈浩天等多位民主派人士因香港抗议被捕',
          'hot': 74
        },
        {
          'id': 4,
          'content': '香港黄之锋等多名民主人士被捕 831游行被禁',
          'hot': 62
        },
        {
          'id': 5,
          'content': '香港网民发起反修例示威 警方严阵以待',
          'hot': 53
        },
        {
          'id': 6,
          'content': '从反送中开始延续到今日，香港社会经历了剧烈的动荡。人们担心随着国安法的推进，一国两制的内涵还会剩下多少。',
          'hot': 42
        },
        {
          'id': 7,
          'content': '从《逃犯条例》修订到《国安法》，香港过去一年的得与失',
          'hot': 33
        },
        {
          'id': 8,
          'content': '香港经济陷入深度衰退 预计将现最大单季跌幅',
          'hot': 21
        },
        {
          'id': 9,
          'content': '香港的国民教育到底出了什么问题？',
          'hot': 10
        },
        {
          'id': 10,
          'content': '内地经济稳增长 香港发展后盾强——香港专家解读中央经济工作会议',
          'hot': 5
        }
      ],
      leader_opinions: [
        {
          id: 1,
          avatar: require('../../assets/imgs/60718250ly1fe7kog3jroj20f00f03zj.jpg'),
          name: '头条新闻',
          content: '【#黄之锋被捕#】据香港“星岛网”刚刚消息，乱港分子、“港独”组织前“香港众志”秘书长黄之锋今天（24日）中午到香港中区警署报到时再被拘捕，警方称黄之锋去年10月5日涉嫌参与未经批准集结及违反《禁止蒙面规例》。律师现正陪同录取口供。（环球网） ​',
          hot: '15.2K',
          time: '2020-10-16 21:04'
        },
        {
          id: 2,
          avatar: require('../../assets/imgs/6298156bly8g3fwy38yu7j20aa0aimxk.jpg'),
          name: '早报网',
          content: '【胡锡进：香港社会在如何走出困局问题上存在一些情绪】香港区议会选举结果今早陆续揭晓，《环球时报》总编辑胡锡进对此表示，投票结果反映了在如何走出当前困局的问题上，香港社会还存在一些情绪，影响了对这个重大问题的系统化思考。',
          hot: '15.2K',
          time: '2020-10-16 21:04'
        },
        {
          id: 3,
          avatar: require('../../assets/imgs/9ce4bf2fly1gdi8lnutcpj2050050q2y.jpg'),
          name: '香港文匯網',
          content: '【王毅:“一国两制”在香港行得通、办得到亦将得人心】国务委员兼外交部长王毅近日接受人民日报专访时表示，在香港问题上，我们坚定支持特区政府止暴制乱、恢复秩序、依法施政。时间将证明，“一国两制”在香港不仅行得通、办得到，也将得人心。但使龙城飞将在，不教胡马度阴山”，王毅表示，捍卫好国家的主权安全红线和正当发展权利，是中国外交以及外交战线全体人员肩负的使命，责任重大，不容有失。我们将在党中央的统一领导下，继续筑牢守护国家利益的坚固长城。',
          hot: '15.2K',
          time: '2020-10-16 21:04'
        },
        {
          id: 4,
          avatar: require('../../assets/imgs/a716fd45ly8gdijd1zmonj20sa0saaby.jpg'),
          name: '人民日报',
          content: '《人民锐评》发表评论文章指，香港的疫情控制好了，经济发展才有坚实基础。当务之急，是有效控制疫情，彻底清理本地个案。只要疫情控制住了，对通关的管制自然也没了。对于把内地正常管制措施说成是针对香港的举措，属于罔顾事实的无端指责，煽风点火，挑拨离间！',
          hot: '15.2K',
          time: '2020-10-16 21:04'
        }
      ],
      word: [
        {
          name: '香港',
          value: 0.7
        },
        {
          name: '外国干涉',
          value: 0.4
        },
        {
          name: '黄之锋',
          value: 0.1
        },
        {
          name: '林郑月娥',
          value: 0.05
        },
        {
          name: '反修例',
          value: 0.12
        },
        {
          name: '国民教育',
          value: 0.11
        },
        {
          name: '北京',
          value: 0.11
        },
        {
          name: '中央政府',
          value: 0.25
        },
        {
          name: '国安法',
          value: 0.2
        },
        {
          name: '非法破坏',
          value: 0.1
        },
        {
          name: '暴乱',
          value: 0.2
        },
        {
          name: '暴力',
          value: 0.03
        },
        {
          name: '经济',
          value: 0.04
        },
        {
          name: '房地产',
          value: 0.0001
        },
        {
          name: '美国政府',
          value: 0.04
        },
        {
          name: '冲突',
          value: 0.24
        },
        {
          name: '学民思潮',
          value: 0.12
        },
        {
          name: '雨伞运动',
          value: 0.01
        },
        {
          name: '蒙面规例',
          value: 0.001
        },
        {
          name: '黑紫荆',
          value: 0.0025
        },
        {
          name: '众志',
          value: 0.017
        },
        {
          name: '抗争',
          value: 0.2321
        }
      ]
    }
  },
  mounted() {
    this.selected_topic = Object.keys(this.page_data)[0]
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

.info
  margin: 5px 0

  .count
    font-weight: 700

.index
  text-align: center
  position: relative

.topic-list

  .topic-item
    margin: 10px 0
    padding: 5px
    min-height: 65px
    border: 1px solid #e6ebf5
    border-radius: 4px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

    .topic-title
      font-size: 20px
    .topic-hot
      position: relative
      width: 100%
      text-align: right

.option_item
  border: 1px solid #e6ebf5
  padding: 10px
  border-radius: 4px
  height: 150px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  overflow: hidden

  .option_name
    font-size: 18px
    font-weight: 700
    margin-bottom: 5px

  .option_content
    display: -webkit-box
    -webkit-line-clamp: 6
    -webkit-box-orient: vertical
    overflow: hidden
</style>
