import request from '@/plugins/axios'

export const userLogin = (data) => {
  return request({
    method: 'POST',
    url: `/user/login`,
    data,
  })
}

export const getUserLogin = (params) => {
  return request({
    method: 'GET',
    url: `/user/current`,
    params,
  })
}

export const userLogout = (data) => {
  return request({
    method: 'POST',
    url: `/user/logout`,
    data,
  })
}

export const userRegister = (data) => {
  return request({
    method: 'POST',
    url: `/user/register`,
    data,
  })
}

export const updateUser = (data) => {
  return request({
    method: 'POST',
    url: `/user/update`,
    data,
  })
}

export const getByUserId = (id) => {
  return request({
    method: 'GET',
    url: `/user/get/${id}`,
  })
}

export const listUser = (params) => {
  return request({
    method: 'GET',
    url: `/user/list`,
    params,
  })
}

export const listUserByPage = (params) => {
  return request({
    method: 'GET',
    url: `/user/list/page`,
    params,
  })
}

export const deleteUser = (data) => {
  return request({
    method: 'POST',
    url: `/user/register`,
    data,
  })
}
