import { axiosInstance } from './axios'

export const loginApi = async (email: string, password: string) => {
  const { data } = await axiosInstance().post('/users/login', {
    email,
    password
  })
  return data
}

export const registryApi = async (email: string, password: string) => {
  const { data } = await axiosInstance().post('/users/registry', {
    email,
    password
  })
  return data
}

export const getUsersInfoApi = async (token: string) => {
  const { data } = await axiosInstance().post('/users/info', {
    token
  })
  return data
}
