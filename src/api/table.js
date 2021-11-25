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

export function gradeScale(params) {
  return request({
    url: '/gradeScale',
    method: 'get',
    params
  })
}

export function deptGrades(params) {
  return request({
    url: '/deptGrades',
    method: 'get',
    params
  })
}

export function courseScale(params) {
  return request({
    url: '/courseScale',
    method: 'get',
    params
  })
}

export function updateCourse(params) {
  return request({
    url: '/updateCourse',
    method: 'get',
    params
  })
}
