import { useEffect, useState } from 'react'
import { getUsers } from '../services/userService'
import type { User } from '../types/user'
import UserCard from '../components/UserCard'

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">
            Users
        </h1>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    </div>
  )
}

export default UsersPage