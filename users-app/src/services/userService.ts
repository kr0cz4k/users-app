import { api } from '../api/axios'
import type { User } from '../types/user'

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users')

  return response.data
}

export const getUserById = async (
  id: string
): Promise<User> => {
  const response = await api.get(`/users/${id}`)

  return response.data
}
export const getUserPosts = async (userId: string) => {
  const response = await api.get(`/posts?userId=${userId}`)
  return response.data
}

export const getPostComments = async (postId: number) => {
  const response = await api.get(`/comments?postId=${postId}`)
  return response.data
}
