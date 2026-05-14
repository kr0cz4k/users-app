import { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../services/userService'
import type { User } from '../types/user'
import { getUserPosts } from '../services/userService'
import type { Post } from '../types/post'
import { getPostComments } from '../services/userService'
import type { Comment } from '../types/comment'
import CommentList from '../components/CommentList'

const UserDetailsPage = () => {
  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [openPostId, setOpenPostId] = useState<number | null>(null)

  const handleOpenComments = async (postId: number) => {
    if (openPostId === postId) {
      setOpenPostId(null)
      return
    }

    setOpenPostId(postId)

    if (!comments[postId]) {
      const data = await getPostComments(postId)

      setComments((prev) => ({
        ...prev,
        [postId]: data,
      }))
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) return

        const data = await getUserById(id)

        setUser(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [id])

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            if (!id) return

            const data = await getUserPosts(id)
            setPosts(data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchPosts()
  }, [id])

  if (!user) {
    return (
      <div className="p-8 text-xl">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          {user.name}
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">
              Username:
            </span>{' '}
            {user.username}
          </p>

          <p>
            <span className="font-semibold">
              Email:
            </span>{' '}
            {user.email}
          </p>

          <p>
            <span className="font-semibold">
              Phone:
            </span>{' '}
            {user.phone}
          </p>

          <p>
            <span className="font-semibold">
              Website:
            </span>{' '}
            {user.website}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Address
          </h2>

          <p>{user.address.street}</p>
          <p>{user.address.suite}</p>
          <p>{user.address.city}</p>
          <p>{user.address.zipcode}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Company
          </h2>

          <p>{user.company.name}</p>
        </div>

        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
                Posts
            </h2>

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-50 p-4 rounded-xl border"
                >
                  <h3 className="font-semibold text-lg">
                    {post.title}
                  </h3>

                  <p className="text-gray-700 mt-2">
                    {post.body}
                  </p>

                  <button
                    onClick={() => handleOpenComments(post.id)}
                    className="mt-3 text-blue-600 text-sm"
                  >
                    {openPostId === post.id
                      ? 'Hide comments'
                      : 'Show comments'}
                  </button>

                  {openPostId === post.id && comments[post.id] && (
                    <CommentList comments={comments[post.id]} />
                  )}
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsPage