import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../services/userService'
import type { User } from '../types/user'

const UserDetailsPage = () => {
  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)

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
      </div>
    </div>
  )
}

export default UserDetailsPage