import { MessageCircle, Reply } from 'lucide-react';

export interface Comment {
  user_name: string;
  comment: string;
  reply?: string;
}

interface Props {
  comment: Comment;
}

export default function CommentBox({ comment }: Props) {
  const avatarLetter = comment.user_name.charAt(0).toUpperCase();

  return (
    <div className="border border-gray-200 p-4 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-200">
      {/* Header user */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
          {avatarLetter}
        </div>
        <p className="font-semibold text-gray-800">{comment.user_name}</p>
      </div>

      {/* Komentar */}
      <div className="flex items-start gap-2 text-gray-700">
        <MessageCircle className="w-4 h-4 text-blue-500 mt-1" />
        <p>{comment.comment}</p>
      </div>

      {/* Balasan Owner */}
      {comment.reply && (
        <div className="mt-3 ml-5 pl-4 border-l-4 border-green-400 bg-green-50 rounded-md py-2">
          <div className="flex items-center gap-2 mb-1 text-green-700 font-medium text-sm">
            <Reply className="w-4 h-4" />
            <span>Balasan Owner</span>
          </div>
          <p className="text-green-700 text-sm">{comment.reply}</p>
        </div>
      )}
    </div>
  );
}
