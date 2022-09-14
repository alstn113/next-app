import { Comment } from '@/lib/types';

interface Props {
  subComments: Comment[];
}

const SubCommentList = ({ subComments }: Props) => {
  return <div>SubCommentList</div>;
};

export default SubCommentList;
