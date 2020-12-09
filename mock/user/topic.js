module.exports = [
  // 谱系图数据
  {
    url: '/user/getTopicList',
    type: 'get',
    response: config => {
      const { user } = config.query
      const topic_list = require('./data/topic_list')
      let data
      if (user === undefined) {
        data = topic_list
      } else {
        data = topic_list
      }
      return {
        code: 20000,
        data: data
      }
    }
  },

  {
    url: '/user/getTopicInfo',
    type: 'get',
    response: config => {
      const { user, topic } = config.query
      const topic_info = require('./data/topic_infos')
      let data
      if (user === undefined) {
        data = topic_info[topic]
      } else {
        data = topic_info[topic]
      }

      return {
        code: 20000,
        data: data
      }
    }
  }
]
