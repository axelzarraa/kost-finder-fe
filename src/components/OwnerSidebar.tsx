import CommentBox from '@/components/CommentBox';

const dummyComment = {
  user_name: 'Budi',
  comment: 'Kosnya nyaman banget!',
  reply: 'Terima kasih ya, Budi!',
};

export default function OwnerSidebar() {
  return (
    <div className="w-64 bg-white p-4 shadow h-screen">
      <h2 className="text-xl font-bold mb-4">Sidebar Owner</h2>
      <CommentBox comment={dummyComment} />
    </div>
  );
}