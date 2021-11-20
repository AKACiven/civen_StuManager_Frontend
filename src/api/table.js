import request from '@/utils/request'

export function getStudent(params) {
  return request({
    url: '/getStudent',
    method: 'get',
    params
  })
}

