import request from '@/utils/request'

export function getUserTopicList(user) {
  return request({
    url: '/user/getTopicList',
    method: 'get',
    params: { user }
  })
}

export function getUserTopicInfo(user, topic) {
  return request({
    url: '/user/getTopicInfo',
    method: 'get',
    params: { user, topic }
  })
}
