<template>
  <div class="topic-container">
    <el-row :gutter="32">
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <span>推荐策略</span>
          </div>
          <el-col :span="8">
            <el-form
              :model="formData"
              label-width="80px"
            >
              <el-form-item label="关键词">
                <el-input v-model="searchForm.keywords" placeholder="请输入检索关键词" />
              </el-form-item>
              <el-form-item label="策略类型">
                <el-checkbox-group v-model="searchForm.type">
                  <el-checkbox :label="'强化'">强化</el-checkbox>
                  <el-checkbox :label="'扩散'">扩散</el-checkbox>
                  <el-checkbox :label="'漫灌'">漫灌</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="针对对象">
                <el-radio-group v-model="searchForm.object">
                  <el-radio :label="'user'">用户</el-radio>
                  <el-radio :label="'content'">议题</el-radio>
                  <el-radio :label="'background'">社会背景</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="实施平台">
                <el-radio-group v-model="searchForm.platform">
                  <el-radio :label="'Twitter'">Twitter</el-radio>
                  <el-radio :label="'FaceBook'">FaceBook</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="实施时间">
                <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查  询</el-button>
                <el-button type="danger" style="margin-left: 150px" @click="onSubmit">重  置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                prop="id"
                label="选项"
                width="50"
              />
              <el-table-column
                prop="strategy"
                label="策略"
                width="60"
              />
              <el-table-column
                prop="nickname"
                label="昵称"
                width="180"
              />
              <el-table-column
                prop="platform"
                label="平台"
                width="120"
              />
              <el-table-column
                prop="altitude"
                label="立场"
                width="80"
              />
              <el-table-column
                prop="effect"
                label="受影响程度"
                width="100"
              />
              <el-table-column
                prop="post_time"
                label="转发（发布）时间点"
                width="180"
              />
              <el-table-column
                prop="repost_count"
                label="二次转发"
                width="100"
              />
              <el-table-column
                prop="operate_time"
                label="操作时间点"
                width="100"
              />
              <el-table-column
                prop="operation"
                label="具体操作"
                width="500"
              />
              <el-table-column
                prop="cost"
                label="成本"
                width="80"
              />
            </el-table>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Recommand',
  data() {
    return {
      searchForm: {
        keywords: '',
        type: [],
        object: 'user',
        platform: 'Twitter',
        time: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: [
        {
          id: 1,
          strategy: '强化',
          nickname: '凝聚观塘',
          platform: 'FaceBook',
          altitude: '积极',
          effect: '中',
          post_time: '2020-07-28 23:27:31',
          repost_count: 0,
          operate_time: '15:00-18:00',
          operation: '（用议题相关积极媒体信息进一步引导用户转发积极信息）“@”',
          cost: '低'
        },
        {
          id: 2,
          strategy: '强化',
          nickname: '中国驻美大使',
          platform: 'FaceBook',
          altitude: '积极',
          effect: '高',
          post_time: '2020-06-24 15:16:32',
          repost_count: 187,
          operate_time: '14:00-20:00',
          operation: '（水军）带类似tag转发',
          cost: '中'
        },
        {
          id: 3,
          strategy: '强化',
          nickname: '国防部发言人',
          platform: 'FaceBook',
          altitude: '积极',
          effect: '高',
          post_time: '2020-08-18 16:34:39',
          repost_count: 70,
          operate_time: '7:00-12:00',
          operation: '（用议题相关积极媒体信息进一步引导用户转发积极信息）“@”',
          cost: '中'
        },
        {
          id: 4,
          strategy: '强化',
          nickname: '华春莹',
          platform: 'Twitter',
          altitude: '积极',
          effect: '高',
          post_time: '2020-08-09 19:00:00',
          repost_count: 124,
          operate_time: '6:30-12:30 ',
          operation: '（水军）带类似tag转发',
          cost: '低'
        },
        {
          id: 5,
          strategy: '强化',
          nickname: 'Hu Xijin 胡锡进',
          platform: 'Twitter',
          altitude: '积极',
          effect: '高',
          post_time: '2020-08-10 01:03:15',
          repost_count: 187,
          operate_time: '1:00-8:00',
          operation: '（用议题相关积极媒体信息进一步引导用户转发积极信息）“@”',
          cost: '低'
        },
        {
          id: 6,
          strategy: '强化',
          nickname: 'Hu Xijin 胡锡进',
          platform: 'Twitter',
          altitude: '积极',
          effect: '高',
          post_time: '2020-08-12 14:19:56',
          repost_count: 128,
          operate_time: '19:00-24:00',
          operation: '（水军）带类似tag转发',
          cost: '中'
        },
        {
          id: 7,
          strategy: '强化',
          nickname: '纽约时报中文网',
          platform: 'Twitter',
          altitude: '积极',
          effect: '高',
          post_time: '2020-08-28 12:01:31',
          repost_count: 31,
          operate_time: '2:30-8:30',
          operation: '（用议题相关积极媒体信息进一步引导用户转发积极信息）“@”',
          cost: '高'
        },
        {
          id: 8,
          strategy: '强化',
          nickname: '赵立坚',
          platform: 'Twitter',
          altitude: '积极',
          effect: '高',
          post_time: '2020-09-08 18:32:50',
          repost_count: 79,
          operate_time: '12:30-18:30',
          operation: '（水军）带类似tag转发',
          cost: '中'
        },
        {
          id: 9,
          strategy: '强化',
          nickname: '汪文斌',
          platform: 'Twitter',
          altitude: '积极',
          effect: '高',
          post_time: '2020-10-08 18:32:50',
          repost_count: 37,
          operate_time: '9:30-15:30 ',
          operation: '（用议题相关积极媒体信息进一步引导用户转发积极信息）“@”',
          cost: '低'
        },
        {
          id: 10,
          strategy: '强化',
          nickname: '崔天凯',
          platform: 'Twitter',
          altitude: '积极',
          effect: '高',
          post_time: '2020-11-05 02:35:50',
          repost_count: 123,
          operate_time: '13:00-21:00',
          operation: '（水军）带类似tag转发',
          cost: '低'
        },
        {
          id: 11,
          strategy: '压制',
          nickname: '蔡英文',
          platform: 'Twitter',
          altitude: '消极',
          effect: '高',
          post_time: '2020-05-28 12:19:03',
          repost_count: 0,
          operate_time: '15:00-16:30',
          operation: '用户发表对立观点',
          cost: '中'
        },
        {
          id: 12,
          strategy: '压制',
          nickname: '罗冠聪 Nathan Law',
          platform: 'FaceBook',
          altitude: '消极',
          effect: '中',
          post_time: '2020-08-26 16:25:05',
          repost_count: 0,
          operate_time: '21:00-5:00',
          operation: '（水军）刷相反tag',
          cost: '高'
        },
        {
          id: 13,
          strategy: '压制',
          nickname: 'BBC News 中文',
          platform: 'Twitter',
          altitude: '消极',
          effect: '中',
          post_time: '2020-08-01 12:56:37',
          repost_count: 221,
          operate_time: '2:00-10:00',
          operation: '用户发表对立观点',
          cost: '中'
        },
        {
          id: 14,
          strategy: '压制',
          nickname: 'Joshua Wong 黄之锋',
          platform: 'Twitter',
          altitude: '消极',
          effect: '高',
          post_time: '2020-08-21 22:17:12',
          repost_count: 447,
          operate_time: '13:00-21:00',
          operation: '用户发表对立观点',
          cost: '高'
        },
        {
          id: 15,
          strategy: '压制',
          nickname: 'Twitter',
          platform: 'Twitter',
          altitude: '消极',
          effect: '高',
          post_time: '2020-09-08 18:32:50',
          repost_count: 19,
          operate_time: '2:00-10:00',
          operation: '（水军）刷相反tag',
          cost: '中'
        },
        {
          id: 16,
          strategy: '压制',
          nickname: '台湾青年民主协会 TYAD',
          platform: 'FaceBook',
          altitude: '消极',
          effect: '中',
          post_time: '2020-04-11 20:55:14',
          repost_count: 14,
          operate_time: '22:00-6:00',
          operation: '用户发表对立观点',
          cost: '高'
        },
        {
          id: 17,
          strategy: '压制',
          nickname: '台湾社',
          platform: 'FaceBook',
          altitude: '消极',
          effect: '低',
          post_time: '2020-03-18 22:54:43',
          repost_count: 0,
          operate_time: '12:00-20:00',
          operation: '（水军）刷相反tag',
          cost: '低'
        },
        {
          id: 18,
          strategy: '压制',
          nickname: '黄之锋 Joshua Wong',
          platform: 'FaceBook',
          altitude: '消极',
          effect: '高',
          post_time: '2020-08-08 09:59:51',
          repost_count: 252,
          operate_time: '22:00-6:00',
          operation: '用户发表对立观点',
          cost: '高'
        },
        {
          id: 19,
          strategy: '压制',
          nickname: 'BBC News 中文',
          platform: 'Twitter',
          altitude: '消极',
          effect: '高',
          post_time: '2020-07-11 14:03:27',
          repost_count: 92,
          operate_time: '5:00-9:30',
          operation: '（水军）刷相反tag',
          cost: '低'
        },
        {
          id: 20,
          strategy: '压制',
          nickname: 'BBC News中文',
          platform: 'Twitter',
          altitude: '消极',
          effect: '高',
          post_time: '2020-05-28 12:15:08',
          repost_count: 0,
          operate_time: '11:00-12:00',
          operation: '用户发表对立观点',
          cost: '中'
        },
        {
          id: 21,
          strategy: '压制',
          nickname: 'poon siu to潘小濤',
          platform: 'Twitter',
          altitude: '消极',
          effect: '中',
          post_time: '2020-06-29 20:11:25',
          repost_count: 37,
          operate_time: '19:30-1:30',
          operation: '（水军）刷相反tag',
          cost: '中'
        },
        {
          id: 22,
          strategy: '压制',
          nickname: 'Xinqi Su 蘇昕琪',
          platform: 'Twitter',
          altitude: '消极',
          effect: '高',
          post_time: '2020-06-29 21:58:47',
          repost_count: 157,
          operate_time: '23:30-5:30 ',
          operation: '用户发表对立观点',
          cost: '低'
        },
        {
          id: 23,
          strategy: '压制',
          nickname: 'Au Nok Hin 区诺轩',
          platform: 'Twitter',
          altitude: '消极',
          effect: '中',
          post_time: '2020-06-29 23:10:51',
          repost_count: 0,
          operate_time: '2:30-8:30',
          operation: '（水军）刷相反tag',
          cost: '高'
        },
        {
          id: 24,
          strategy: '漫灌',
          nickname: 'Hong Kong Watch',
          platform: 'Twitter',
          altitude: '中立',
          effect: '中',
          post_time: '2020-05-28 13:30:43',
          repost_count: 0,
          operate_time: '12:30-18:30',
          operation: 'KOL带关键词不带观点转发，水军刷屏',
          cost: '高'
        },
        {
          id: 25,
          strategy: '漫灌',
          nickname: '黄洋达',
          platform: 'FaceBook',
          altitude: '中立',
          effect: '中',
          post_time: '2020-06-24 15:16:32',
          repost_count: 21,
          operate_time: '9:30-15:30 ',
          operation: 'KOL带关键词不带观点转发，水军刷屏',
          cost: '低'
        },
        {
          id: 26,
          strategy: '漫灌',
          nickname: '纽约时报中文网',
          platform: 'Twitter',
          altitude: '中立',
          effect: '高',
          post_time: '2020-08-09 19:00:00',
          repost_count: 4,
          operate_time: '6:30-12:30 ',
          operation: 'KOL带关键词不带观点转发，水军刷屏',
          cost: '中'
        },
        {
          id: 27,
          strategy: '漫灌',
          nickname: 'Wong Ji Yuet 黃子悅',
          platform: 'Twitter',
          altitude: '中立',
          effect: '高',
          post_time: '2020-08-10 08:44:22',
          repost_count: 99,
          operate_time: '12:30-18:30',
          operation: 'KOL带关键词不带观点转发，水军刷屏',
          cost: '中'
        },
        {
          id: 28,
          strategy: '漫灌',
          nickname: 'Joey Siu 邵嵐',
          platform: 'Twitter',
          altitude: '中立',
          effect: '高',
          post_time: '2020-08-10 11:18:46',
          repost_count: 358,
          operate_time: '12:30-18:30',
          operation: 'KOL带关键词不带观点转发，水军刷屏',
          cost: '中'
        },
        {
          id: 29,
          strategy: '漫灌',
          nickname: '纽约时报中文网',
          platform: 'Twitter',
          altitude: '中立',
          effect: '高',
          post_time: '2020-09-05 19:00:00',
          repost_count: 12,
          operate_time: '12:30-18:30',
          operation: 'KOL带关键词不带观点转发，水军刷屏',
          cost: '高'
        },
        {
          id: 30,
          strategy: '漫灌',
          nickname: 'Chung-Tai Cheng 郑松泰',
          platform: 'FaceBook',
          altitude: '中立',
          effect: '中',
          post_time: '2020-10-13 11:01:04',
          repost_count: 51,
          operate_time: '6:30-12:30',
          operation: 'KOL带关键词不带观点转发，水军刷屏',
          cost: '高'
        },
        {
          id: 31,
          strategy: '漫灌',
          nickname: '黄洋达',
          platform: 'FaceBook',
          altitude: '中立',
          effect: '中',
          post_time: '2020-10-14 19:13:23',
          repost_count: 2,
          operate_time: '11:00-12:00',
          operation: 'KOL带关键词不带观点转发，水军刷屏',
          cost: '高'
        }
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
.topic-container
  padding: 32px
  background-color: rgb(240, 242, 245)
  position: relative
  min-height: 918px
</style>
