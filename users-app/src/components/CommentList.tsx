import type { Comment } from '../types/comment'

interface Props {
  comments: Comment[]
}

const CommentList = ({ comments }: Props) => {
  return (
    <div className="mt-3 space-y-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white p-3 rounded-lg border"
        >
          <p className="font-semibold text-sm">
            {comment.name}
          </p>

          <p className="text-xs text-gray-500">
            {comment.email}
          </p>

          <p className="text-sm mt-1">
            {comment.body}
          </p>
        </div>
      ))}
    </div>
  )
}

export default CommentList