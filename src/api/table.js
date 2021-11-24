import request from '@/utils/request'

export function getStudent(params) {
  return request({
    url: '/getStudent',
    method: 'get',
    params
  })
}
export function checkStudent(params) {
  return request({
    url: '/checkStudent',
    method: 'get',
    params
  })
}

export function checkStuCourse(params) {
  return request({
    url: '/checkStuCourse',
    method: 'get',
    params
  })
}

export function editGrade(params) {
  return request({
    url: '/editGrade',
    method: 'get',
    params
  })
}
