import { Link } from 'react-router-dom'
import type { User } from '../types/user'

interface UserCardProps {
  user: User
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/users/${user.id}`}>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold">
          {user.name}
        </h2>

        <p>{user.email}</p>
      </div>
    </Link>
  )
}

export default UserCard