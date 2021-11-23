import request from '@/utils/request'

export function updateStudent(data) {
  return request({
    url: '/updateStudent',
    method: 'post',
    data
  })
}

export function addStudent(data) {
  return request({
    url: '/addStudent',
    method: 'post',
    data
  })
}
