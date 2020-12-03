import request from '@/utils/request'

export function getHierarchicalDiagram(center, type) {
  return request({
    url: '/home/getHierarchicalDiagram',
    method: 'get',
    params: { center, type }
  })
}

export function getSuggestUser() {
  return request({
    url: '/home/getSuggestUser',
    method: 'get'
  })
}

export function getSuggestTopic() {
  return request({
    url: '/home/getSuggestTopic',
    method: 'get'
  })
}
