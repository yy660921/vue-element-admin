import request from '@/utils/request'

export function getGroupData(user) {
  return request({
    url: '/user/getGroupData',
    method: 'get',
    params: { user }
  })
}

export function getUserBrief(user, participate_user) {
  return request({
    url: '/user/getUserBrief',
    method: 'get',
    params: { user, participate_user }
  })
}
