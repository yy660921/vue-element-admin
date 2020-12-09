module.exports = [
  // 谱系图数据
  {
    url: '/home/getHierarchicalDiagram',
    type: 'get',
    response: config => {
      const { center } = config.query
      const hierarchical_diagram = require('./data/hierarchical_diagram')
      let data
      if (center === undefined) {
        data = hierarchical_diagram['反送中']
      } else {
        data = hierarchical_diagram['反送中']
      }
      return {
        code: 20000,
        data: data
      }
    }
  },

  {
    url: '/home/getSuggestUser',
    type: 'get',
    response: config => {
      const suggestUser = require('./data/suggestion')
      const data = suggestUser['User']
      return {
        code: 20000,
        data: data
      }
    }
  },

  {
    url: '/home/getSuggestTopic',
    type: 'get',
    response: config => {
      const suggestUser = require('./data/suggestion')
      const data = suggestUser['Topic']
      return {
        code: 20000,
        data: data
      }
    }
  }
]
