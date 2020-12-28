module.exports = [
  // 谱系图数据
  {
    url: '/topic/getSpreadData',
    type: 'get',
    response: config => {
      const { topic } = config.query
      const spread_data = require('./data/spread_data')
      let data
      if (topic === undefined) {
        data = spread_data
      } else {
        data = spread_data
      }
      return {
        code: 20000,
        data: data
      }
    }
  }
]
