import request from '@/plugins/axios'

export const uploadFile = (data) => {
  return request({
    method: 'POST',
    url: `/file/upload`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}

export const getListFileByPage = (params) => {
  return request({
    method: 'GET',
    url: `/file/list/page`,
    params: params,
  })
}

export const addFile = (data) => {
  return request({
    method: 'POST',
    url: `/file/add`,
    data,
  })
}

export const updateFile = (data) => {
  return request({
    method: 'POST',
    url: `/file/update`,
    data,
  })
}

export const getByFileId = (id) => {
  return request({
    method: 'GET',
    url: `/file/get/${id}`,
  })
}

export const getListFile = (params) => {
  return request({
    method: 'GET',
    url: `/file/list`,
    params,
  })
}

export const deleteFile = (data) => {
  return request({
    method: 'POST',
    url: `/file/delete`,
    data,
  })
}
