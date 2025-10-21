interface Comment {
  user_name: string;
  comment: string;
  reply?: string;
}

export default function CommentBox({ comment }: { comment: Comment }) {
  return (
    <div className="border p-4 rounded shadow mb-4 bg-white">
      <p className="font-semibold text-blue-700">{comment.user_name}</p>
      <p className="text-gray-800 mt-1">{comment.comment}</p>
      {comment.reply && (
        <div className="mt-2 border-l-4 border-green-500 pl-3 text-green-700">
          <p className="text-sm font-medium">Balasan Owner:</p>
          <p>{comment.reply}</p>
        </div>
      )}
    </div>
  );
}