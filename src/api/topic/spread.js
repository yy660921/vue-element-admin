import request from '@/utils/request'

export function getSpreadData(topic) {
  return request({
    url: '/topic/getSpreadData',
    method: 'get',
    params: { topic }
  })
}
