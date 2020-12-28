module.exports = [
  // 谱系图数据
  {
    url: '/user/getGroupData',
    type: 'get',
    response: config => {
      const { user } = config.query
      const group_graph = require('./data/group_graph')
      const group_data = require('./data/group_datas')
      let data
      if (user === undefined) {
        data = {
          'graph': group_graph,
          'stand': group_data['stand'],
          'relation': group_data['relation']
        }
      } else {
        data = {
          'graph': group_graph,
          'stand': group_data['stand'],
          'relation': group_data['relation']
        }
      }
      return {
        code: 20000,
        data: data
      }
    }
  },

  {
    url: '/user/getUserBrief',
    type: 'get',
    response: config => {
      const { user, participate_user } = config.query
      const group_user_info = require('./data/group_info')
      let data
      if (user === undefined) {
        data = group_user_info[participate_user]
      } else {
        data = group_user_info[participate_user]
      }
      return {
        code: 20000,
        data: data
      }
    }
  }
]
